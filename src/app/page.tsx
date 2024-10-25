'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { getAllTasks } from '@/services/tasks';

export default function Home() {
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getAllTasks(),
  });

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate',
    },
  ];

  /*
      NOTE: (alopez) Potential Improvement
      https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
    */
  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <main className="flex flex-col gap-10 p-10">
      <DataTable columns={columns} data={tasks} />{' '}
      {/*       
        NOTE: (alopez) Potential Improvement
        UX Options:
          (1)
          Implement a drawer (i.e. slideout) component to provide a simple workflow experience.
          It does not require the user to navigate between routes.
          The user will be able to create new tasks from the task list dashboard.
          (2)
          Implement a footer, at the bottom of the task list table, to provide a more intuitive, inline
          experience for adding a new task.
      */}
      <Link href="/add">
        <Button>Add New Task</Button>
      </Link>
    </main>
  );
}
