import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import OnboardingScreen from '../screens/onboarding/OnBoardingScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardingScreen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;