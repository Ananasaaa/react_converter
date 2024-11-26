import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

test('Home renders with a button', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(screen.getByText(/Конвертер валют/i)).toBeInTheDocument();
  const button = screen.getByRole('button', { name: /Конвертувати валюту/i });
  expect(button).toBeInTheDocument();
});
