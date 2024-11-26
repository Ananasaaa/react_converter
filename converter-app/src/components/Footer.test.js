import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

test('Footer renders with links and contact information', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  expect(screen.getByText(/Чіп Чендж/i)).toBeInTheDocument();
  expect(
    screen.getByText(/04128, м. Київ, вул. Хрещатик, 19/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Ліцензія НБУ №115/i)).toBeInTheDocument();
  expect(screen.getByText(/Послуги/i)).toBeInTheDocument();
  expect(screen.getByText(/Конвертер валют/i)).toBeInTheDocument();
});
