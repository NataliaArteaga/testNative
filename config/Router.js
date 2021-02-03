import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../Pages/containers/Home';
import FormProduct from '../Pages/containers/FormProduct';
import ListApiHome from '../Pages/containers/ListApiHome';
import ListApiSelected from '../Pages/containers/ListApiSelected';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'React native', //Set Header Title
            headerStyle: {
              backgroundColor: '#4150b5', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        
        <Stack.Screen
          name="FormProduct"
          component={FormProduct}
          options={{
            title: 'New product', //Set Header Title
            headerStyle: {
              backgroundColor: '#4150b5', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="ListApiHome"
          component={ListApiHome}
          options={{
            title: 'List items', //Set Header Title
            headerStyle: {
              backgroundColor: '#4150b5', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="ListApiSelected"
          component={ListApiSelected}
          options={{
            title: 'List items selected', //Set Header Title
            headerStyle: {
              backgroundColor: '#4150b5', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;