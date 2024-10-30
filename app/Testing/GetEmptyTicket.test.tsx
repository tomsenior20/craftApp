import { act } from 'react';
import { ApiCalls } from '../components/api';
import react from 'react';

jest.mock('../components/api', () => ({
  ApiCalls: jest.fn(() => ({
    GetTicket: jest.fn().mockReturnValue([])
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
      // Expect result to be an empty array
      expect(result).toEqual([]);
    });
  });
});
