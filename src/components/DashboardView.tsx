import { BookOpen, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardViewProps {
  totalSessions: number;
  totalMessages: number;
}

export function DashboardView({ totalSessions, totalMessages }: DashboardViewProps) {
  const stats = [
    {
      title: 'Total Sessions',
      value: totalSessions,
      icon: MessageSquare,
      description: 'Chat conversations',
    },
    {
      title: 'Messages Exchanged',
      value: totalMessages,
      icon: TrendingUp,
      description: 'Questions & answers',
    },
    {
      title: 'Topics Explored',
      value: Math.floor(totalMessages / 3) || 0,
      icon: BookOpen,
      description: 'Estimated topics',
    },
    {
      title: 'Learning Time',
      value: `${Math.floor(totalMessages * 0.5)}m`,
      icon: Clock,
      description: 'Estimated time spent',
    },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Track your DSA learning progress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>DSA Learning Topics</CardTitle>
          <CardDescription>Common topics to explore with your AI instructor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Arrays & Strings',
              'Linked Lists',
              'Stacks & Queues',
              'Trees & Graphs',
              'Dynamic Programming',
              'Sorting Algorithms',
              'Searching Algorithms',
              'Hash Tables',
              'Recursion',
              'Greedy Algorithms',
              'Divide & Conquer',
              'Bit Manipulation',
            ].map((topic) => (
              <div
                key={topic}
                className="p-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground"
              >
                {topic}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
