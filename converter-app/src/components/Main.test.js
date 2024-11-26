import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';

test('Main renders with a title, description, and button', () => {
  render(<Main />);
  expect(screen.getByText(/Чіп Чендж/i)).toBeInTheDocument();
  expect(screen.getByText(/Обмінник валют - навчальний/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /Конвертер валют/i })
  ).toBeInTheDocument();
});
