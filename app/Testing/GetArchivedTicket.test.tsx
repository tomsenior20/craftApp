import { act } from 'react';
import { ApiCalls } from '../components/api';
import react from 'react';

// Mock the ApiCalls module
jest.mock('../components/api', () => ({
  ApiCalls: jest.fn(() => ({
    GetArchiveTickets: jest.fn().mockResolvedValue([
      {
        id: 1,
        Name: 'John Doe',
        ContactNumber: 1234567890,
        Comment: 'First archived ticket',
        Asignee: 'Alice'
      }
    ])
  }))
}));

describe('Get Archived Tickets, API Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should retrieve mocked archived tickets', async () => {
    const { GetArchiveTickets } = ApiCalls();

    await act(async () => {
      const result = await GetArchiveTickets();
      // Expect it to return a result
      expect(result).toBeDefined();
      // check length of result
      expect(result.length).toBeGreaterThan(0);

      expect(result).toEqual([
        {
          id: 1,
          Name: 'John Doe',
          ContactNumber: 1234567890,
          Comment: 'First archived ticket',
          Asignee: 'Alice'
        }
      ]);
    });
  });
});
