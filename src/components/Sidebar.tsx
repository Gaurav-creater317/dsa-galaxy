import { useState } from 'react';
import { Plus, MessageSquare, History, LayoutDashboard, LogOut, Menu, X, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onNavigate: (page: 'chat' | 'history' | 'dashboard' | 'admin') => void;
  currentPage: 'chat' | 'history' | 'dashboard' | 'admin';
}

export function Sidebar({
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onNavigate,
  currentPage,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, profile, isAdmin } = useAuth();

  const navItems: Array<{ id: string; icon: typeof Plus; label: string; action: () => void }> = [
    { id: 'chat', icon: Plus, label: 'New Chat', action: onNewChat },
    { id: 'history', icon: History, label: 'History', action: () => onNavigate('history') },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', action: () => onNavigate('dashboard') },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', icon: Shield, label: 'Admin Panel', action: () => onNavigate('admin') });
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300 lg:translate-x-0 lg:static',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-gradient">DSA Galaxy</h1>
            <p className="text-xs text-muted-foreground mt-1">AI-Powered Learning</p>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-3 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent',
                  currentPage === item.id && 'bg-sidebar-accent text-sidebar-accent-foreground'
                )}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Chat History */}
          <div className="flex-1 overflow-hidden flex flex-col px-3">
            <p className="text-xs font-medium text-muted-foreground px-3 py-2">
              Recent Chats
            </p>
            <ScrollArea className="flex-1">
              <div className="space-y-1 pr-3">
                {sessions.slice(0, 10).map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      'group flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors',
                      activeSessionId === session.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                    onClick={() => {
                      onSelectSession(session.id);
                      setIsOpen(false);
                    }}
                  >
                    <MessageSquare className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate flex-1">{session.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* User section */}
          <div className="p-3 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {profile?.full_name?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground">
                  {profile?.full_name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {profile?.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
