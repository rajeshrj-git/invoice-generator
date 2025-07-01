// src/components/Greet.test.js
import { render, screen } from '@testing-library/react';
import Greet from './Greet';

test('renders with provided name', () => {
  render(<Greet name="Rajesh" />);
  const greeting = screen.getByText(/Hello, Rajesh!/i);
  expect(greeting).toBeInTheDocument();
});

test('renders default name when no name is given', () => {
  render(<Greet />);
  const greeting = screen.getByText(/Hello, Guest!/i);
  expect(greeting).toBeInTheDocument();
});
