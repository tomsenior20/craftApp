import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Nav from '../components/nav';
import { ApiCalls } from '../components/api';

// Mock the ApiCalls function
jest.mock('../components/api', () => ({
  ApiCalls: jest.fn().mockReturnValue({
    FetchBrandName: jest.fn().mockResolvedValue([{ BrandName: 'MyBrand' }]),
  }),
}));

describe('Nav Component', () => {
  it('should render brand name', async () => {
    render(<Nav />);

    // Wait for the brand name to load
    await waitFor(() => screen.getByLabelText('navNameText'));

    // Assert that the brand name is displayed
    expect(screen.getByLabelText('navNameText')).toHaveTextContent('MyBrand');
  });

  it('should render the navigation links', async () => {
    render(<Nav />);

    // Wait for the brand name to load
    await waitFor(() => screen.getByLabelText('navNameText'));

    // Assert that the links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
});
