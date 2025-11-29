import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import "@/global.css";

interface TaskModalProps {
  visible: boolean;
  isEditing: boolean;
  title: string;
  description: string;
  onTitleChange: (text: string) => void;
  onDescriptionChange: (text: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function TaskModal({
  visible,
  isEditing,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onCancel,
  onSave
}: TaskModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-black/50 justify-end"
      >
        <View className="bg-gray-700 rounded-t-3xl p-5 pb-10">
          <Text className="text-2xl font-bold text-white mb-5">
            {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
          </Text>

          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4 bg-gray-50"
            placeholder="Título de la tarea"
            value={title}
            onChangeText={onTitleChange}
            placeholderTextColor="#999"
          />

          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4 bg-gray-50 h-24"
            placeholder="Descripción (opcional)"
            value={description}
            onChangeText={onDescriptionChange}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
            textAlignVertical="top"
          />

          <View className="flex-row gap-3 mt-2">
            <TouchableOpacity
              className="flex-1 p-4 rounded-lg bg-gray-200 items-center"
              onPress={onCancel}
            >
              <Text className="text-gray-700 text-base font-semibold">
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 p-4 rounded-lg bg-[#C4A784] items-center"
              onPress={onSave}
            >
              <Text className="text-white text-base font-semibold">
                {isEditing ? 'Actualizar' : 'Crear'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}