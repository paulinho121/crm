'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { reminders } from '@/lib/data';
import { BellRing, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

export function RemindersList() {
  const pendingReminders = reminders.filter((r) => r.status === 'pending');
  const completedReminders = reminders.filter((r) => r.status === 'completed');

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Pending Reminders</CardTitle>
          <CardDescription>
            Tasks you need to complete.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center gap-4 p-3 rounded-lg border bg-card"
            >
              <BellRing className="h-5 w-5 text-primary" />
              <div className="grid gap-1">
                <p className="font-medium">{reminder.title}</p>
                <p className="text-sm text-muted-foreground">
                  {reminder.clientName}
                </p>
              </div>
              <div className="ml-auto">
                <Badge>
                  {format(new Date(reminder.date), 'MMM dd, yyyy')}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Completed Reminders</CardTitle>
          <CardDescription>
            Tasks that you have already finished.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {completedReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center gap-4 p-3 rounded-lg border bg-card opacity-60"
            >
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              <div className="grid gap-1">
                <p className="font-medium line-through">{reminder.title}</p>
                <p className="text-sm text-muted-foreground">
                  {reminder.clientName}
                </p>
              </div>
               <div className="ml-auto">
                <Badge variant="secondary">
                  {format(new Date(reminder.date), 'MMM dd, yyyy')}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
