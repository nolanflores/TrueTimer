import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Home from "./screens/home.js";
import Tasks from "./screens/tasks.js";
import End from "./screens/end.js";
import CreateNav from "./screens/createNav.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style="light"/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Tasks" component={Tasks}/>
        <Stack.Screen name="End" component={End}/>
        <Stack.Screen name="CreateNav" component={CreateNav}/>
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}