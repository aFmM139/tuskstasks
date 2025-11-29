import "@/global.css";
import { NotebookText } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface HeaderProps {
  pendingCount: number;
}

export default function Header({ pendingCount }: HeaderProps) {
  return (
    <View className="bg-[#C4A784] px-5 pt-12 pb-8">
      <Text className="text-3xl font-bold text-white mb-1">
      <NotebookText color={"white"}/>
       Lista de Tareas
      </Text>
      <Text className="text-sm text-white opacity-90">
        {pendingCount} pendientes
      </Text>
    </View>
  );
}