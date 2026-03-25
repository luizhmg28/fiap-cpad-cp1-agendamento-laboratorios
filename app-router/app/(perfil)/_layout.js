import { Stack } from "expo-router";
import { LogoTitle } from '../../utils/headerLogo';

export default function PerfilLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitle: () => <LogoTitle />,
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen 
                name="trocarSenha"
                options={{
                    headerBackTitle: 'Voltar' // Texto para iOS
                }}
            />
        </Stack>
    )
}
