import React from 'react';
import { ApiCalls } from '../components/api';

// Mock React useState
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

// Mock window properties
beforeEach(() => {
    const storage = new Map<string, string>();
    const localStorageMock: Storage = {
        length: storage.size,
        clear: () => storage.clear(),
        getItem: (key: string) => storage.get(key) || null,
        key: (index: number) => Array.from(storage.keys())[index] || null,
        removeItem: (key: string) => storage.delete(key),
        setItem: (key: string, value: string) => storage.set(key, value),
    };

    global.localStorage = localStorageMock;

    localStorage.setItem("setDeletedTicket", "0");
});

describe('GetTickets API Integration Test', () => {
    test('Ensure GetDeletedTickets function is called', async () => {
        // Mock useState to return the desired state and setter
        const mockSetState = jest.fn();
        (React.useState as jest.Mock).mockImplementation(() => [[], mockSetState]);

        // Mock ApiCalls to return a mock result
        const { GetTicket } = ApiCalls();
        // Call the function and assert results
        const result = await GetTicket();

        // Print the result to the test output
        console.log("Result tickets:", result);

        // You can add assertions here based on your expectations
    });
});
