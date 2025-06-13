import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/Auth/Login';
import HomeScreen from './src/screens/Home';
import Invoices from './src/screens/Invoices';
import DispatchScreen from './src/screens/Dispatch';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => {
    console.log('login');
    setIsLoggedIn(true);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Dispatch"
              component={DispatchScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <Stack.Screen name="Login" options={{headerShown: false}}>
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={() => login()} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
