import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';
import Routes from './routes/auth.routes';
import {NavigationContainer} from '@react-navigation/native';
import AppProvider from './hooks';
const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" translucent />
    <AppProvider>
      <View style={{flex: 1, backgroundColor: '#312e38'}}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
