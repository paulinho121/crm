import { BellRing, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { reminders } from '@/lib/data';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';

export function RemindersOverview() {
  const pendingReminders = reminders.filter((r) => r.status === 'pending');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Pending Reminders</CardTitle>
          <CardDescription>
            You have {pendingReminders.length} upcoming tasks.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/reminders">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingReminders.slice(0, 3).map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary"
            >
              <div className="p-2 bg-secondary rounded-full">
                <BellRing className="h-5 w-5 text-primary" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {reminder.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  For {reminder.clientName}
                </p>
              </div>
              <div className="ml-auto font-medium">
                <Badge variant="outline">
                  {format(new Date(reminder.date), 'MMM dd')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
