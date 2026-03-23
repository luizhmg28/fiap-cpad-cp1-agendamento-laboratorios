import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarUser();
    }, []);

    const carregarUser = async () => {
        const userGuardado = await AsyncStorage.getItem('user');
        if (userGuardado) setUser(JSON.parse(userGuardado));
        setCarregando(false);
    };

    const login = async (data) => {
        await AsyncStorage.setItem('user', JSON.stringify(data))
        setUser(data);
    }

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, carregando }}>
            {children}
        </AuthContext.Provider>
    );
}
