import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';
import { DetailProduct, DetailVendor, HomeScreen, LoginScreen, RegisterScreen, SplashScreen, ViewAllProducts, ViewAllVendors } from './src/pages/'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAccessToken } from './src/api/storage';
import AuthContext from './src/context/AuthContext';
import { logout } from './src/api/logout'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { TouchableWithoutFeedback, Text, View, TouchableOpacity } from 'react-native';

const ParentStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const DrawerStack = createDrawerNavigator()

const DrawerToogle = () => {
  const navigation = useNavigation()
  return (
    <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
      <IonIcon name={'menu-outline'} size={30} color={'black'} style={{ marginLeft: 15 }} />
    </TouchableWithoutFeedback>
  )
}

const Drawer = () => {
  const navigation = useNavigation()
  const { setIsLoggedIn } = useContext(AuthContext)

  const handleLogout = async () => {
    await logout().then(_ => {
      setIsLoggedIn(false)
    })
  }

  return (
    <DrawerContentScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ backgroundColor: '#00000009', paddingVertical: 15, marginHorizontal: 5, borderRadius: 10, marginVertical: 5, borderWidth: 0.7, borderColor: '#0000002A'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, }}>
          <IonIcon name="home-outline" size={24} color={'black'} style={{ marginRight: 20 }} />
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: '#00000009', paddingVertical: 15, marginHorizontal: 5, borderRadius: 10, borderWidth: 0.7, borderColor: '#0000002A' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
          <IonIcon name="log-out-outline" size={24} color={'black'} style={{ marginRight: 20 }} />
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Logout</Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView >
  )
}

const DrawerScreen = () => (
  <DrawerStack.Navigator drawerContent={() => <Drawer />}>
    <DrawerStack.Screen name='Drawer' component={HomeStackScreen} options={{ headerShown: false }} />
  </DrawerStack.Navigator>
)

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
  </AuthStack.Navigator>
)

const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName='Dashboard'>
    <HomeStack.Screen name='Dashboard' component={HomeScreen} options={{
      headerLeft: () => <DrawerToogle />,
      headerShadowVisible: true, headerStyle: {
        elevation: 20,
        shadowColor: '#333',
      }
    }} />
    <HomeStack.Screen name='Semua Produk' component={ViewAllProducts} />
    <HomeStack.Screen name='Semua Merchant' component={ViewAllVendors} />
    <HomeStack.Screen name='Detail Merchant' component={DetailVendor} />
    <HomeStack.Screen name='Detail Produk' component={DetailProduct} />
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
                    component={DrawerScreen}
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
