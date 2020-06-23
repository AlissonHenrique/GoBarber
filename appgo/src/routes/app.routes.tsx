import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';
import AppointmentCreate from '../pages/AppointmentCreate';
import CreateAppointment from '../pages/CreateAppointment';
import Profile from '../pages/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#312e38'},
    }}>
    ' <App.Screen name="SignIn" component={Dashboard} />'
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="AppointmentCreate" component={AppointmentCreate} />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;
