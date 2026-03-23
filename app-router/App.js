import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './app/(auth)/login'
import Home from './app/(tabs)/home'

const Stack = createNativeStackNavigator();

export default function App() {
    const [isLogged, setIsLogged] = useState(null);

    useEffect(() => {
        verificarLogin();
    }, []);

    const verificarLogin = async () => {
        const user = await AsyncStorage.getItem('user');
        setIsLogged(!!user);
    }

    if (isLogged === null) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLogged ? (
                    <Stack.Screen name="home">
                        {(props) => <Home {...props} setIsLogged={setIsLogged} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="login">
                        {(props) => <Login {...props} setIsLogged={setIsLogged} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
