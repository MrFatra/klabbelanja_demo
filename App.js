import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, LoginScreen, RegisterScreen, SplashScreen } from './src/pages/'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAccessToken } from './src/api/storage';
import AuthContext from './src/context/AuthContext';

const ParentStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
  </AuthStack.Navigator>
)

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name='Dashboard' component={HomeScreen} />
  </HomeStack.Navigator>
)

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getUserToken = async () => {
    setIsLoading(true)
    return await getAccessToken().then(result => {
      return result
    }).catch(err => {
      console.error(err);
      return null
    })
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

  }, [])


  useEffect(() => {
    getUserToken().then(result => {
      if (result != null) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])

  const authContextValue = {
    isLoggedIn,
    setIsLoggedIn
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthContext.Provider value={authContextValue}>
        <NavigationContainer>
          <ParentStack.Navigator>
            {
              isLoading
                ?
                <ParentStack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
                : isLoggedIn
                  ?
                  <ParentStack.Screen
                    name="Home"
                    component={HomeStackScreen}
                    options={{ headerShown: false }}
                  />
                  :
                  <ParentStack.Screen
                    name="Auth"
                    component={AuthStackScreen}
                    options={{ headerShown: false }}
                  />
            }
          </ParentStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaView>
  );
};

export default App;
