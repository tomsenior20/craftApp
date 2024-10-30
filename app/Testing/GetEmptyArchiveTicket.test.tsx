import { act } from 'react';
import { ApiCalls } from '../components/api';
import react from 'react';

// Mock the ApiCalls module
jest.mock('../components/api', () => ({
  ApiCalls: jest.fn(() => ({
    GetArchiveTickets: jest.fn().mockResolvedValue([])
  }))
}));

describe('Get Archived Tickets, API Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should return empty array for archived tickets', async () => {
    const { GetArchiveTickets } = ApiCalls();

    await act(async () => {
      const result = await GetArchiveTickets();
      // Expect it to return a result
      expect(result).toBeDefined();
      // check length of result
      expect(result.length).toEqual(0);
    });
  });
});
