import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Card } from './card';
import { AnyCharacter } from '../../models/character';

describe('Given...', () => {
  describe('When we instantiate', () => {
    const character = { name: 'polludo' };
    render(
      <Provider store={store}>
        <Card character={character as unknown as AnyCharacter}></Card>
      </Provider>
    );

    test('It should be in the document', () => {
      const element = screen.getByText('polludo');
      expect(element).toBeInTheDocument();
    });
  });
});
