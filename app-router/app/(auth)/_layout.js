import { Image } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#EA1463' }}>
      <Tabs.Screen
        name="login"
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Login',
          tabBarIcon: ({ color }) => <Ionicons name="log-in" size={24} color={color} />,
          headerTitle: () => (
          <Image
              source={require('../../assets/logo.png')}
              style={{ width: 120, height: 40 }}
          />
          ),
        }}
      />
    </Tabs>
  );
}
