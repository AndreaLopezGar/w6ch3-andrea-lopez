import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List } from './list';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Given...', () => {
  describe('When we instantiate', () => {
    render(
      <Provider store={store}>
        <List></List>
      </Provider>
    );
    test('It should be...', () => {
      const element = screen.getByRole('list');
      expect(element).toBeInTheDocument();
    });
  });
});
