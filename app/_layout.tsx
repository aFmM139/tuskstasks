import { Tabs } from "expo-router";
import { ListTodo, Cog } from 'lucide-react-native';

export default function RootLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#C4A784',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#1A252F',
          borderTopColor: '#374151',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color }) => <ListTodo size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ScreenConfiguration"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color }) => <Cog size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}