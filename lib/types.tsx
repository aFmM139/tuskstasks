// Interfaz para definir el tipo de una tarea
export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string;
  }