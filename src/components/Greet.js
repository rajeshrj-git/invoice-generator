// src/components/Greet.js
import React from 'react';

const Greet = ({ name }) => {
  return <h1>Hello, {name || "Guest"}!</h1>;
};

export default Greet;
