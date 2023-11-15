import { screen, render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useEffect } from 'react';
import { ApiRepo } from '../services/api.repo';
import { useCharacters } from '../hooks/useCharacters';
import { AnyCharacter } from '../models/character';
import { userEvent } from '@testing-library/user-event';
import { store } from '../store/store';
import { Provider } from 'react-redux';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useReducer: jest.fn().mockReturnValue([{}, jest.fn()]),
}));

describe('Given the useTask hook', () => {
  ApiRepo.prototype.getCharacters = jest
    .fn()
    .mockResolvedValue([{ id: 34 } as unknown as AnyCharacter]);

  describe('When we run the hook inside a component', () => {
    beforeEach(async () => {
      const TestComponent = () => {
        const { loadCharacters, updateCharacter } = useCharacters();

        useEffect(() => {
          loadCharacters();
        }, [loadCharacters]);

        return (
          <>
            <h1>Test Component</h1>
            <button onClick={() => updateCharacter(1, { name: 'enano' })}>
              Update
            </button>
          </>
        );
      };

      await act(async () => {
        render(
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        );
      });
    });

    test('Then it should be in the document', async () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });

    test('Test of loading characters public api', async () => {
      const loadbutton = screen.getByText('Update');
      await userEvent.click(loadbutton);
      expect(ApiRepo.prototype.getCharacters).toHaveBeenCalled();
    });
  });
});
