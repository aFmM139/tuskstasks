import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import { Task } from '@/lib/types';
import { Check,NotebookText,X } from 'lucide-react-native';


interface TaskDetailModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
}

export default function TaskDetailModal({ visible, task, onClose }: TaskDetailModalProps) {
  if (!task) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-5">
        <View className="bg-white rounded-2xl w-full max-w-lg max-h-4/5">
          {/* Header */}
          <View className={`p-5 rounded-t-2xl flex-row items-center justify-between ${task.completed ? 'bg-green-500' : 'bg-[#C4A784]'}`}>
            <Text className="text-2xl font-bold text-white">
              {task.completed ? <Check color={"black"}/>  : <NotebookText color={"white"}/>}
              Detalles de la Tarea
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="bg-white/20 w-8 h-8 rounded-full items-center justify-center"
            >
              <Text className="text-white text-xl font-bold">
                <X color={"white"}/>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contenido scrolleable */}
          <ScrollView className="p-5">
            {/* Título */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-500 mb-1">
                TÍTULO
              </Text>
              <Text className="text-xl font-bold text-gray-800">
                {task.title}
              </Text>
            </View>

            {/* Descripción */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-500 mb-1">
                DESCRIPCIÓN
              </Text>
              <Text className="text-base text-gray-700 leading-6">
                {task.description || 'Sin descripción'}
              </Text>
            </View>

            {/* Estado */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-500 mb-2">
                ESTADO
              </Text>
              <View className={`px-4 py-3 rounded-lg ${task.completed ? 'bg-green-100' : 'bg-orange-100'}`}>
                <Text className={`text-base font-bold ${task.completed ? 'text-green-700' : 'text-orange-700'}`}>
                  {task.completed ? 'Completada' : 'Pendiente'}
                </Text>
              </View>
            </View>

            {/* Información técnica */}
            <View className="bg-gray-50 rounded-lg p-4 mb-4">
              <Text className="text-sm font-semibold text-gray-500 mb-3">
                INFORMACIÓN TÉCNICA
              </Text>

              <View className="mb-2">
                <Text className="text-xs text-gray-500">Fecha de creación</Text>
                <Text className="text-sm text-gray-800">
                  {new Date(task.createdAt).toLocaleString('es-ES', {
                    dateStyle: 'full',
                    timeStyle: 'short'
                  })}
                </Text>
              </View>

              {task.updatedAt && (
                <View>
                  <Text className="text-xs text-gray-500">Última actualización</Text>
                  <Text className="text-sm text-gray-800">
                    {new Date(task.updatedAt).toLocaleString('es-ES', {
                      dateStyle: 'full',
                      timeStyle: 'short'
                    })}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Botón cerrar */}
          <View className="p-5 border-t border-gray-200">
            <TouchableOpacity
              className={`p-4 rounded-lg items-center ${task.completed ? 'bg-green-500' : 'bg-[#C4A784]'}`}
              onPress={onClose}
            >
              <Text className="text-white text-base font-semibold">
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}