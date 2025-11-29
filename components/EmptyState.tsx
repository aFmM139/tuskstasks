import React from 'react';
import { View, Text } from 'react-native';
import { ClipboardList } from 'lucide-react-native';

export default function EmptyState() {
  return (
    <View className="items-center justify-center pt-32">
      <ClipboardList size={80} color="#C4A784" />
      <Text className="text-2xl font-semibold text-gray-400 mt-6 mb-2">
        No hay tareas
      </Text>
      <Text className="text-base text-gray-500">
        Presiona el botón + para crear una
      </Text>
    </View>
  );
}