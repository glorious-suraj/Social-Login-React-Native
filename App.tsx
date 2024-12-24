import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;