import { Image } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#EA1463' }}>
      <Tabs.Screen
        name="home"
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          headerTitle: () => (
          <Image
              source={require('../assets/logo.png')}
              style={{ width: 120, height: 40 }}
          />
          ),
        }}
      />
      <Tabs.Screen
        name="agendar"
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Agendar',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />,
          headerTitle: () => (
          <Image
              source={require('../assets/logo.png')}
              style={{ width: 120, height: 40 }}
          />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Minha conta',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={24} color={color} />,
          headerTitle: () => (
          <Image
              source={require('../assets/logo.png')}
              style={{ width: 120, height: 40 }}
          />
          ),
        }}
      />
    </Tabs>
  );
}
