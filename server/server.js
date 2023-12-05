const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Currency = mongoose.model('Currency', {
  name: String,
  rate: Number
});

async function fetchExchangeRates() {
  try {
    const currencies = await Currency.find();
    return currencies;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return [];
  }
}

app.get('/api/currencies', async (req, res) => {
  try {
    const currencies = await fetchExchangeRates();
    res.json(currencies);
  } catch (error) {
    console.error('Error handling GET request for currencies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Additional routes for individual currencies, creation, update, and deletion

app.post('/api/currencies', async (req, res) => {
  try {
    const { name, rate } = req.body;
    console.log('Received data:', { name, rate });

    // Check if the currency with the same name already exists
    const existingCurrency = await Currency.findOne({ name });
    if (existingCurrency) {
      return res.status(400).json({ error: 'Currency with this name already exists' });
    }

    const newCurrency = new Currency({ name, rate });
    await newCurrency.save();

    const currencies = await fetchExchangeRates();
    res.json(currencies);
  } catch (error) {
    console.error('Error adding currency:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch a single currency by name
app.get('/api/currencies/name/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const currency = await Currency.findOne({ name });

    if (currency) {
      res.json([currency]); // Return an array with the currency if it exists
    } else {
      res.json([]); // Return an empty array if currency does not exist
    }
  } catch (error) {
    console.error('Error fetching currency by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to update a currency by name
app.put('/api/currencies/updateByName/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const { rate } = req.body;

    await Currency.findOneAndUpdate({ name }, { rate });

    const currencies = await fetchExchangeRates();
    res.json(currencies);
  } catch (error) {
    console.error('Error updating currency by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a currency by name
app.delete('/api/currencies/deleteByName/:name', async (req, res) => {
  try {
    const { name } = req.params;
    await Currency.findOneAndDelete({ name });

    const currencies = await fetchExchangeRates();
    res.json(currencies);
  } catch (error) {
    console.error('Error deleting currency by name:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Define a route for currency conversion
app.post('/api/convert', async (req, res) => {
  try {
    const { fromCurrency, toCurrency, amount } = req.body;

    // Fetch currencies from the database
    const currencies = await fetchExchangeRates();

    // Find the conversion rates
    const fromRate = currencies.find(currency => currency.name === fromCurrency)?.rate || 1;
    const toRate = currencies.find(currency => currency.name === toCurrency)?.rate || 1;

    // Perform currency conversion
    const convertedAmount = (parseFloat(amount) * toRate) / fromRate;

    res.json({ result: convertedAmount.toFixed(2) });
  } catch (error) {
    console.error('Error converting currency:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await fetchExchangeRates();
});
