import { act } from 'react';
import { ApiCalls } from '../components/api';
import react from 'react';

jest.mock('../components/api', () => ({
  ApiCalls: jest.fn(() => ({
    GetTicket: jest.fn().mockReturnValue([
      {
        id: 1,
        Name: 'Tom Senior',
        ContactNumber: '9990090',
        Comment: 'Test'
      }
    ])
  }))
}));

describe('Fetch One Record', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should fetch one record', async () => {
    const { GetTicket } = ApiCalls();

    await act(async () => {
      const result = await GetTicket();
      // Expects Clear result
      expect(result).toBeDefined();
      // Expect it to pick up mock record
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
