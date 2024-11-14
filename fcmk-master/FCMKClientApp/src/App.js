import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { Provider } from 'react-redux';
import store from './redux/store';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import AppNavigation from './components/AppNavigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as mapping } from './config/mapping.json';




function App() {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
        <AppNavigation />
      </ApplicationProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
});

export default App;
