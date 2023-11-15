import { AnyCharacter, ApiRepo } from './api.repo';

describe('Given ApiRepo class', () => {
  describe('When we instantiate it and response is ok', () => {
    let jsonMock: jest.Mock;
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('Then method getCharacters should be used', async () => {
      const repo = new ApiRepo();
      const expected: AnyCharacter[] = [];
      const result = await repo.getCharacters();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
  });

  describe('When calling the update method', () => {
    test('Then it should fecth data from the API and return the response', async () => {
      const mockId = 1;
      const privateData = { id: 1 } as unknown as Partial<AnyCharacter>;
      const expectedUrl = 'http://localhost:3000/characters/1';
      const repo = new ApiRepo();

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(privateData),
      });

      const response = await repo.updateCharacter(mockId, privateData);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'PATCH',
        body: JSON.stringify(privateData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(response).toEqual(privateData);
    });

    describe('When we instantiate it and response is bad', () => {
      beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: false,
        });
      });

      test('Then method getCharacters should not be used', async () => {
        const repo = new ApiRepo();
        expect(repo.getCharacters()).rejects.toThrow();
      });
    });
  });
});
