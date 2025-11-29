import { Alert } from 'react-native';
import axios from 'axios';
import { Task } from './types';
import { API_URL } from './constants';

// Configurar axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// GET - Obtener todas las tareas
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    if (axios.isAxiosError(error)) {
      Alert.alert('Error', `No se pudieron cargar las tareas: ${error.message}`);
    } else {
      Alert.alert('Error', 'No se pudieron cargar las tareas.');
    }
    return [];
  }
};

// POST - Crear nueva tarea
export const createTask = async (title: string, description: string): Promise<boolean> => {
  if (!title.trim()) {
    Alert.alert('Atención', 'El título es obligatorio');
    return false;
  }

  console.log('🔵 Intentando crear tarea...');

  try {
    const response = await api.post('', {
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    });

    console.log('🟢 Response status:', response.status);
    console.log('✅ Tarea creada:', response.data);
    Alert.alert('¡Éxito!', 'Tarea creada correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error al crear tarea:', error);
    if (axios.isAxiosError(error)) {
      Alert.alert('Error', `Código: ${error.response?.status || 'Desconocido'}`);
    } else {
      Alert.alert('Error', 'No se pudo crear la tarea.');
    }
    return false;
  }
};

// PUT - Actualizar tarea completa
export const updateTask = async (
  task: Task,
  title: string,
  description: string
): Promise<boolean> => {
  if (!title.trim()) {
    Alert.alert('Atención', 'El título es obligatorio');
    return false;
  }

  try {
    const response = await api.put(`/${task.id}`, {
      id: task.id,
      title: title.trim(),
      description: description.trim(),
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: new Date().toISOString()
    });

    console.log('✅ Tarea actualizada:', response.data);
    Alert.alert('¡Éxito!', 'Tarea actualizada correctamente');
    return true;
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    if (axios.isAxiosError(error)) {
      Alert.alert('Error', `No se pudo actualizar: ${error.message}`);
    } else {
      Alert.alert('Error', 'No se pudo actualizar la tarea');
    }
    return false;
  }
};

// PATCH - Cambiar estado de completada
export const toggleTaskCompleted = async (task: Task): Promise<boolean> => {
  try {
    await api.patch(`/${task.id}`, {
      completed: !task.completed
    });
    return true;
  } catch (error) {
    console.error('Error al cambiar estado:', error);
    if (axios.isAxiosError(error)) {
      Alert.alert('Error', `No se pudo actualizar el estado: ${error.message}`);
    } else {
      Alert.alert('Error', 'No se pudo actualizar el estado');
    }
    return false;
  }
};

// DELETE - Eliminar tarea
export const deleteTask = async (id: string, onSuccess: () => void): Promise<void> => {
  console.log('🔴 Iniciando eliminación de tarea ID:', id);

  Alert.alert(
    '¿Eliminar tarea?',
    'Esta acción no se puede deshacer',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => console.log('❌ Eliminación cancelada')
      },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            console.log('🔴 Eliminando tarea...');

            const response = await api.delete(`/${id}`);

            console.log('🔴 Response status:', response.status);
            console.log('✅ Tarea eliminada correctamente');
            onSuccess();
          } catch (error) {
            console.error('❌ Error de red:', error);
            if (axios.isAxiosError(error)) {
              Alert.alert('Error', `Código: ${error.response?.status || 'Desconocido'}`);
            } else {
              Alert.alert('Error', 'No se pudo eliminar la tarea');
            }
          }
        }
      }
    ]
  );
};