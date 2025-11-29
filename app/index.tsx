import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';

// Importar tipos
import { Task } from '@/lib/types';
import { FileSliders,CirclePlus } from 'lucide-react-native';

// Importar funciones de API
import {
  getTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  toggleTaskCompleted,
  deleteTask as apiDeleteTask
} from '@/lib/api';

// Importar componentes
import Header from '@/components/Header';
import EmptyState from '@/components/EmptyState';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import ServerInfoModal from '@/components/ServerInfoModal';
import TaskDetailModal from '@/components/TaskDetailModal';

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [serverInfoVisible, setServerInfoVisible] = useState(false);
  const [taskDetailVisible, setTaskDetailVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Cargar tareas al inicio
  useEffect(() => {
    console.log('🚀 App iniciada');
    loadTasks();
  }, []);

  // Cargar tareas al inicio
  useEffect(() => {
    console.log('🚀 App iniciada');
    loadTasks();
  }, []);

  // Función para cargar tareas
  const loadTasks = async () => {
    setLoading(true);
    const data = await getTasks();
    setTasks(data);
    setLoading(false);
  };

  // Crear tarea
  const handleCreateTask = async () => {
    const success = await apiCreateTask(title, description);
    if (success) {
      setTitle('');
      setDescription('');
      setModalVisible(false);
      loadTasks();
    }
  };

  // Actualizar tarea
  const handleUpdateTask = async () => {
    if (!editingTask) return;
    
    const success = await apiUpdateTask(editingTask, title, description);
    if (success) {
      setTitle('');
      setDescription('');
      setEditingTask(null);
      setModalVisible(false);
      loadTasks();
    }
  };

  // Alternar estado completado
  const handleToggleCompleted = async (task: Task) => {
    await toggleTaskCompleted(task);
    loadTasks();
  };

  // Eliminar tarea
  const handleDeleteTask = (id: string) => {
    apiDeleteTask(id, loadTasks);
  };

  // Ver detalles de la tarea
  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setTaskDetailVisible(true);
  };

  // Abrir modal para editar
  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setModalVisible(true);
  };

  // Abrir modal para crear
  const openCreateModal = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setModalVisible(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalVisible(false);
    setTitle('');
    setDescription('');
    setEditingTask(null);
  };

  // Contar tareas pendientes
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <View className="flex-1 bg-gray-800">
      {/* Header */}
      <Header pendingCount={pendingCount} />

      {/* Botón para ver info del servidor */}
      <View className="px-4 pt-3 pb-2">
        <TouchableOpacity
          className="bg-black p-3 rounded-lg flex-row items-center justify-center gap-2"
          onPress={() => setServerInfoVisible(true)}
        >
          <Text className="text-xl">
          <FileSliders color={"white"} />
          </Text>
          <Text className="text-white font-semibold text-base">
            Ver Información del Servidor
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tareas */}
      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" className="mt-12" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={handleToggleCompleted}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
              onViewDetails={handleViewDetails}
            />
          )}
          contentContainerStyle={{ padding: 15, paddingBottom: 80 }}
          ListEmptyComponent={<EmptyState />}
        />
      )}

      {/* Botón flotante para agregar */}
      <TouchableOpacity 
        className="absolute bottom-9 right-9 w-15 h-15 rounded-full bg-[#C4A784] items-center justify-center shadow-lg "
        onPress={openCreateModal}
      >
        <Text className="text-4xl text-white font-light">
        <CirclePlus size={"35"}/>
        </Text>
      </TouchableOpacity>

      {/* Modal para crear/editar */}
      <TaskModal
        visible={modalVisible}
        isEditing={!!editingTask}
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onCancel={closeModal}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
      />

      {/* Modal de información del servidor */}
      <ServerInfoModal
        visible={serverInfoVisible}
        tasks={tasks}
        onClose={() => setServerInfoVisible(false)}
      />

      {/* Modal de detalles de tarea */}
      <TaskDetailModal
        visible={taskDetailVisible}
        task={selectedTask}
        onClose={() => {
          setTaskDetailVisible(false);
          setSelectedTask(null);
        }}
      />
    </View>
  );
}