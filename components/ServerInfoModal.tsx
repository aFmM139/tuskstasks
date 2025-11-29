import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import { Task } from '@/lib/types';
import { ChartBarBig,Check,Hourglass } from 'lucide-react-native';


interface ServerInfoModalProps {
  visible: boolean;
  tasks: Task[];
  onClose: () => void;
}

export default function ServerInfoModal({ visible, tasks, onClose }: ServerInfoModalProps) {
  // Estadísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white rounded-2xl w-full max-w-lg" style={{ maxHeight: '85%' }}>
          {/* Header */}
          <View className="bg-[#C4A784] p-4 rounded-t-2xl flex-row items-center justify-between">
            <Text className="text-xl font-bold text-white">
                <ChartBarBig color={"white"}/>
                Información del Servidor
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="bg-white/20 w-7 h-7 rounded-full items-center justify-center"
            >
              <Text className="text-white text-lg font-bold">×</Text>
            </TouchableOpacity>
          </View>

          {/* Contenido scrolleable */}
          <ScrollView className="p-4">
            {/* Estadísticas */}
            <View className="mb-4">
              <Text className="text-base font-bold text-gray-800 mb-2">
                Estadísticas
              </Text>
              
              <View className="bg-gray-50 rounded-lg p-3 mb-2">
                <Text className="text-gray-600 text-xs">Total de tareas</Text>
                <Text className="text-xl font-bold text-gray-800">{totalTasks}</Text>
              </View>

              <View className="flex-row gap-2">
                <View className="flex-1 bg-green-50 rounded-lg p-3">
                  <Text className="text-gray-600 text-xs">Completadas</Text>
                  <Text className="text-lg font-bold text-green-600">{completedTasks}</Text>
                </View>

                <View className="flex-1 bg-orange-50 rounded-lg p-3">
                  <Text className="text-gray-600 text-xs">Pendientes</Text>
                  <Text className="text-lg font-bold text-orange-600">{pendingTasks}</Text>
                </View>
              </View>
            </View>

            {/* Lista de tareas */}
            <View>
              <Text className="text-base font-bold text-gray-800 mb-2">
                Lista de Tareas
              </Text>
              {tasks.length === 0 ? (
                <Text className="text-gray-500 text-center py-3 text-sm">
                  No hay tareas en el servidor
                </Text>
              ) : (
                tasks.map((task, index) => (
                  <View 
                    key={task.id} 
                    className="bg-gray-50 rounded-lg p-3 mb-2 border-l-4 border-gray-500"
                  >
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="font-bold text-gray-800 flex-1 text-sm">
                        {index + 1}. {task.title}
                      </Text>
                      <View className={`px-2 py-1 rounded ${task.completed ? 'bg-green-100' : 'bg-orange-100'}`}>
                        <Text className={`text-xs font-bold ${task.completed ? 'text-green-700' : 'text-orange-700'}`}>
                          {task.completed ?  <Check color={"green"}/> : <Hourglass />}
                        </Text>
                      </View>
                    </View>
                    {task.description && (
                      <Text className="text-gray-600 text-xs" numberOfLines={2}>
                        {task.description}
                      </Text>
                    )}
                  </View>
                ))
              )}
            </View>
          </ScrollView>

          {/* Botón cerrar */}
          <View >
            <TouchableOpacity
              className="bg-[#C4A784] p-3 rounded-lg items-center"
              onPress={onClose}
            >
              <Text className="text-white text-sm font-semibold">
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}