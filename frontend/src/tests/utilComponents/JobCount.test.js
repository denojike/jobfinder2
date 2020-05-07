import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JobCount from '../../components/utilComponents/JobCount';

test('It renders Job Count correctly', () => {
  const jobs = [1, 3, 4];
  render(<JobCount jobs={jobs} />);
  expect(screen.getByText('3 Jobs found')).toBeInTheDocument();
});

test('It renders One or Zero Job Count correctly', () => {
  const jobs = [1];
  render(<JobCount jobs={jobs} />);
  expect(screen.getByText(/1 job found/i)).toBeInTheDocument();
});
