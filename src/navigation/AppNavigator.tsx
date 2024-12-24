import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp';
import NameInput from '../screens/NameInput';
import AgeSelection from '../screens/AgeSelection';
import IdentitySelection from '../screens/IdentitySelection';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="NameInput" component={NameInput} />
            <Stack.Screen name="AgeSelection" component={AgeSelection} />
            <Stack.Screen name="IdentitySelection" component={IdentitySelection} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
}