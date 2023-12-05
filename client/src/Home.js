// src/Home.js
import React from 'react';


const Home = () => (
  <div className="home">
    <h1>Currency Exchange App</h1>
    
    <p style={{ textAlign: 'left' }}>
      Greetings and a warm welcome to FullStacks Currency Exchange, your go-to platform for hassle-free currency conversion! Our dedicated team of enthusiastic beginners has pooled their skills and passion to craft an exceptional user-friendly experience just for you.
    </p>

    <h2>About Us</h2>
    <p>
       We understand the importance of simplicity and efficiency when it comes to currency exchange. Whether you're a seasoned traveler, a global entrepreneur, or simply someone looking to stay updated with the latest exchange rates, our platform has been designed with you in mind.
    </p>

    <h2>Our Mission</h2>
    <p>
      Our mission is clear - to provide a seamless and intuitive platform for users of all levels. We strive to make currency conversion an effortless process, ensuring that you can focus on what matters most to you. Whether you're managing personal finances or working on a global project, FullStacks Currency Exchange is here to simplify your currency transactions.
    </p>

    <h2>Key Features</h2>
    <ul>
      <li><strong>Real-Time Exchange Rates:</strong> Stay updated with the latest currency values. Our platform fetches real-time data to ensure accuracy in every conversion.</li>
      <li><strong>User-Friendly Interface:</strong> Our intuitive interface is designed for users of all levels. No more navigating through complex menus - enjoy a straightforward and enjoyable experience.</li>
      <li><strong>Diverse Currency Options:</strong> With a comprehensive list of currencies, you can convert between a wide range of options, tailored to your needs.</li>
    </ul>

    <h4>Follow us on our social media platforms</h4>
    
    <div className="socials mt-20">
      <a href="#"><i className="fab fa-facebook fa-4x"></i></a>
      <a href="#" style={{ marginLeft: '50px' }}><i className="fab fa-twitter fa-4x"></i></a>
      <a href="#" style={{ marginLeft: '50px' }}><i className="fab fa-google-plus fa-4x"></i></a>
      <a href="#" style={{ marginLeft: '50px' }}><i className="fa fa-envelope fa-4x"></i></a>
    </div>
  </div>
);

export default Home;
