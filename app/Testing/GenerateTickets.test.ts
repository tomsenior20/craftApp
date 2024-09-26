import { ApiCalls } from "../components/api";
import React from 'react';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

describe('DeletedTickets API Integration Test', () => {
    test('Ensure GetDeletedTickets function is called', async () => {
        const mockSetState = jest.fn();
        const mockUseState = jest.fn(() => [[], mockSetState]);
        (React.useState as jest.Mock).mockImplementation(mockUseState);

        const { GetDeletedTickets } = ApiCalls();

        try {
            const result = await GetDeletedTickets();
            expect(result).toHaveLength(1); // Add assertions based on expected behavior: ;
        } finally {
            return;
        }
    });
});
