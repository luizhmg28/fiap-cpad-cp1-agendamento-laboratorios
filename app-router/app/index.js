import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
    const { user, carregando } = useContext(AuthContext);

    if (carregando) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    
    return <Redirect href={user ? "/home" : "/login"} />
}
