'use server';

import TaskRepository from '../repositories/tasks';

import { Task } from '@/types/task';

class TaskService {
  taskRepository: TaskRepository;
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async create(task: Task) {
    return this.taskRepository.create(task);
  }

  async getAll() {
    return this.taskRepository.getAll();
  }

  async getById(id: number) {
    return this.taskRepository.getById(id);
  }

  async update(id: number, task: Task) {
    return this.taskRepository.update(id, task);
  }

  async delete(id: number) {
    return this.taskRepository.delete(id);
  }
}

export async function createTask(task: Task) {
  const taskService = new TaskService();
  return taskService.create(task);
}

export async function getAllTasks() {
  const taskService = new TaskService();
  return taskService.getAll();
}

export async function getTaskById(id: number) {
  const taskService = new TaskService();
  return taskService.getById(id);
}

export async function updateTaskById(id: number, task: Task) {
  const taskService = new TaskService();
  return taskService.update(id, task);
}

export async function deleteTaskById(id: number) {
  const taskService = new TaskService();
  return taskService.delete(id);
}
