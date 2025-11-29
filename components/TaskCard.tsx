import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '@/lib/types';
import { Trash,PencilLine,ScanEye,Check } from 'lucide-react-native';

interface TaskCardProps {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onViewDetails: (task: Task) => void;
}

export default function TaskCard({ task, onToggle, onEdit, onDelete, onViewDetails }: TaskCardProps) {
  return (
    <View className="bg-black rounded-xl p-4 mb-3 flex-row items-center shadow-sm">
      <TouchableOpacity 
        className="flex-1 flex-row items-center"
        onPress={() => onToggle(task)}
      >
        <View className="w-6 h-6 rounded-full border-2 border-[#C4A784] mr-3 items-center justify-center">
          {task.completed && (
            <Text className="text-white text-base font-bold">
              <Check color={"white"}/>
            </Text>
          )}
        </View>
        
        <View className="flex-1">
          <Text className={`text-base font-semibold text-white mb-1 ${task.completed ? 'line-through opacity-50' : ''}`}>
            {task.title}
          </Text>
          {task.description ? (
            <Text className={`text-sm text-gray-400 ${task.completed ? 'line-through opacity-50' : ''}`}>
              {task.description}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>

      <View className="flex-row gap-2">
        <TouchableOpacity 
          className="w-9 h-9 rounded-full items-center justify-center"
          onPress={() => onViewDetails(task)}
        >
          <Text className="text-base">
            <ScanEye color={"#EDEDE1"}/>
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="w-9 h-9 items-center justify-center"
          onPress={() => onEdit(task)}
        >
          <Text className="text-base">
          <PencilLine color={"#EDEDE1"}/>
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="w-9 h-9 items-center justify-center"
          onPress={() => {
            console.log('🟡 Botón presionado, ID de la tarea:', task.id);
            onDelete(task.id);
          }}
        >
          <Text className="text-base">
          <Trash color={'red'}/>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}