import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import { LoginScreen, MovieBookingScreen, SearchScreen, SeatBookingScreen, RegisterScreen, ForgotPassword, SplashScreen, TrailerScreen, CastDetailsScreen, CinemaPlace } from './src/screens';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { FavoritesProvider } from './src/FavoritesContext/FavoritesContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={LoginScreen} options={{ animation: "slide_from_right" }} />
          <Stack.Screen name='Register' component={RegisterScreen} options={{ animation: "slide_from_right" }} />
          <Stack.Screen name='ForgetPassword' component={ForgotPassword} options={{ animation: "slide_from_right" }} />
          <Stack.Screen name="Tab" component={TabNavigator} options={{ animation: "fade" }} />
          <Stack.Screen name="MovieDetails" component={MovieBookingScreen} options={{ animation: "slide_from_right" }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ animation: "slide_from_bottom" }} />
          <Stack.Screen name='SeatBooking' component={SeatBookingScreen} options={{ animation: "slide_from_right" }} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ animation: "slide_from_bottom" }} />
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ animation: "slide_from_right" }} />
          <Stack.Screen name='Trailer' component={TrailerScreen} options={{ animation: "none" }} />
          <Stack.Screen name='CastDetails' component={CastDetailsScreen} />
          <Stack.Screen name='CinemaPlace' component={CinemaPlace} options={{ animation: "fade" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

export default App;