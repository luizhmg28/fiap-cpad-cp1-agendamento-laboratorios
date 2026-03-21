import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#EA1463' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Meus Agendamentos',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="agendar"
        options={{
          title: 'Reservar Laboratórios',
          tabBarLabel: 'Agendar',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Editar Perfil',
          tabBarLabel: 'Minha conta',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
