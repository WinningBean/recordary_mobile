import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import Store from './Store';

import {Provider} from 'react-redux';

import Navigator from './Navigator';

const App = () => {
  return (
    <Provider store={Store}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <Navigator />
    </Provider>
  );
};

export default App;
