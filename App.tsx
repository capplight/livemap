import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {isReadyRef, navigationRef} from './App/Navigation/RootNavigationRef';
import {store} from './App/Config/AppStore';
import {AppNavigation} from './App/Navigation/AppNavigation';
import {StatusBar} from 'react-native';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden={false} backgroundColor="transparent" />
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
