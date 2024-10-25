import { eq } from 'drizzle-orm';

import { db, tasks } from '@/db';

import { Task } from '@/types/task';

export default class TaskRepository {
  constructor() {}

  create(task: Task) {
    return db
      .insert(tasks)
      .values({
        title: task.title,
        description: task.description,
        dueDate: task.due_date,
        isCompleted: false,
      })
      .returning();
  }

  getAll() {
    return db.select().from(tasks);
  }

  getById(id: number) {
    return db.select().from(tasks).where(eq(tasks.id, id));
  }

  update(id: number, task: Task) {
    return db
      .update(tasks)
      .set({
        title: task.title,
        description: task.description,
        dueDate: task.due_date,
        isCompleted: task.isCompleted,
      })
      .where(eq(tasks.id, id));
  }

  delete(id: number) {
    return db.delete(tasks).where(eq(tasks.id, id));
  }
}
