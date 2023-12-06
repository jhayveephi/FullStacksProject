// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and parse JSON requests
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://jhayeephi:jerome1985@cluster0.cofezco.mongodb.net/CurrencyAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the Currency model in MongoDB
const Currency = mongoose.model('Currency', {
  name: String,
  rate: Number
});

// Function to fetch exchange rates from the database
async function fetchExchangeRates() {
  try {
    const currencies = await Currency.find();
    return currencies;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return [];
  }
}

// Define a route to get all currencies
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

// Route to add a new currency
app.post('/api/currencies', async (req, res) => {
  try {
    const { name, rate } = req.body;
    console.log('Received data:', { name, rate });

    // Check if the currency with the same name already exists
    const existingCurrency = await Currency.findOne({ name });
    if (existingCurrency) {
      return res.status(400).json({ error: 'Currency with this name already exists' });
    }

    // Create a new currency and save it to the database
    const newCurrency = new Currency({ name, rate });
    await newCurrency.save();

    // Fetch updated list of currencies
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

    // Update the rate of the specified currency
    await Currency.findOneAndUpdate({ name }, { rate });

    // Fetch updated list of currencies
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

    // Delete the specified currency
    await Currency.findOneAndDelete({ name });

    // Fetch updated list of currencies
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

// Start the server and log the port
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await fetchExchangeRates();
});
