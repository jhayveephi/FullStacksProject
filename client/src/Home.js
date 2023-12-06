import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome styles

// Home component representing the landing page of the Currency Exchange App
const Home = () => (
  <div className="home">
    <h1>Welcome to the Currency Exchange App</h1>

    <p style={{ textAlign: 'left' }}>
      {/* Introduction and welcome message */}
      Hello and a warm welcome to our Currency Exchange App! We're a team of enthusiastic beginners on an exciting journey to simplify currency conversion for you. Our project is a labor of love, fueled by our passion for learning and creating something valuable for users like you.
    </p>

    <h2>About Us</h2>
    <p>
      {/* Brief description about the team */}
      Meet the faces behind the code! We're a diverse group of individuals with a shared goal - to make currency exchange easy and accessible. Whether you're a frequent traveler, a budding entrepreneur, or someone curious about exchange rates, our platform is designed with simplicity and user-friendliness in mind.
    </p>

    <h2>Our Mission</h2>
    <p>
      {/* Overview of the project's mission */}
      Our mission is simple yet ambitious - to provide a seamless and intuitive platform for users of all levels. As beginners, we're eager to learn and improve our skills while making currency conversion effortless for you. Whether you're managing your personal finances or working on a small project, the Currency Exchange App is here to simplify your currency transactions.
    </p>

    <h2>Key Features</h2>
    <ul>
      {/* List of key features with brief descriptions */}
      <li><strong>Real-Time Exchange Rates:</strong> Stay informed with the latest currency values. Our platform fetches real-time data to ensure accurate and up-to-date conversions.</li>
      <li><strong>User-Friendly Interface:</strong> Navigate our platform with ease. We've designed an intuitive interface for users of all levels, eliminating the need for complicated menus and ensuring a straightforward and enjoyable experience.</li>
      <li><strong>Diverse Currency Options:</strong> Choose from a wide range of currencies tailored to your needs. Our comprehensive list ensures flexibility in your currency conversions.</li>
    </ul>

    <h4>Connect with us on social media</h4>

    <div className="socials mt-20">
      {/* Social media links with Font Awesome icons */}
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook fa-4x"></i></a>
      <a href="https://www.twitter.com" style={{ marginLeft: '50px' }} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter fa-4x"></i></a>
      <a href="https://www.google.com" style={{ marginLeft: '50px' }} target="_blank" rel="noopener noreferrer"><i className="fab fa-google-plus fa-4x"></i></a>
      <a href="mailto:example@example.com" style={{ marginLeft: '50px' }} target="_blank" rel="noopener noreferrer"><i className="fas fa-envelope fa-4x"></i></a>
      {/* Note: Changed "fa" to "fas" for the envelope icon (solid style) */}
    </div>
  </div>
);

export default Home;
