import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

test('Header renders with navigation links and logo', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByText(/Чіп Чендж/i)).toBeInTheDocument();
  expect(screen.getByText(/Послуги/i)).toBeInTheDocument();
  expect(screen.getByText(/Конвертер валют/i)).toBeInTheDocument();
  expect(screen.getByText(/Контакти/i)).toBeInTheDocument();
  expect(screen.getByText(/Особистий кабінет/i)).toBeInTheDocument();
});
