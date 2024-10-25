'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

import { deleteTaskById, getTaskById } from '@/services/tasks';

const Page = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const number = pathname.split('/')[1];

  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ['task'], queryFn: () => getTaskById(Number(number)) });

  const handleDelete = async () => {
    try {
      await deleteTaskById(Number(number));
    } catch {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem deleting the task.',
      });
    }
  };

  if (isLoading) {
    return <p>Loading task...</p>;
  }

  if (isError) {
    return <p>Error loading task: {error.message}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{task?.[0].title}</CardTitle>
        <CardDescription>{task?.[0].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">id: {task?.[0].id}</p>
        <p className="text-sm text-muted-foreground">due date:{task?.[0].dueDate}</p>
        <p className="text-sm text-muted-foreground">
          is completed: {task?.[0]?.isCompleted ? 'true' : 'false'}
        </p>
        <p className="text-sm text-muted-foreground">{task?.[0].createdAt}</p>
        <p className="text-sm text-muted-foreground">{task?.[0].updatedAt}</p>
      </CardContent>
      <CardFooter className="space-x-2">
        <Link href={`/${task?.[0].id}/edit`}>
          <Button>Edit</Button>
        </Link>
        <Link href="/">
          <Button onClick={() => handleDelete()}>Delete</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Page;
