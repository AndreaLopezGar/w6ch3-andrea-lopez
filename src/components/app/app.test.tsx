import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { App } from './app';

describe('Given...', () => {
  describe('When we instantiate', () => {
    render(
      <Provider store={store}>
        <App></App>
      </Provider>
    );

    test('It should be in the document', () => {
      const element = screen.getByRole('list');
      expect(element).toBeInTheDocument();
    });
  });
});
