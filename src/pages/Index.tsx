import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { StarsBackground } from '@/components/StarsBackground';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';
import { DashboardView } from '@/components/DashboardView';
import { HistoryView } from '@/components/HistoryView';
import { AdminPanel } from '@/components/AdminPanel';
import { toast } from 'sonner';

type PageType = 'chat' | 'history' | 'dashboard' | 'admin';

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

export default function Index() {
  const { user, loading: authLoading, session, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState<PageType>('chat');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Server-side validated navigation - prevent non-admins from accessing admin page
  const handleNavigate = useCallback((page: PageType) => {
    if (page === 'admin' && !isAdmin) {
      toast.error('Unauthorized: Admin access required');
      return;
    }
    setCurrentPage(page);
  }, [isAdmin]);

  // Also guard against direct manipulation of currentPage state
  useEffect(() => {
    if (currentPage === 'admin' && !isAdmin && !authLoading) {
      setCurrentPage('chat');
      toast.error('Unauthorized: Admin access required');
    }
  }, [currentPage, isAdmin, authLoading]);

  useEffect(() => {
    if (user) fetchSessions();
  }, [user]);

  useEffect(() => {
    if (activeSessionId) fetchMessages(activeSessionId);
  }, [activeSessionId]);

  const fetchSessions = async () => {
    const { data } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setSessions(data as ChatSession[]);
  };

  const fetchMessages = async (sessionId: string) => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    if (data) setMessages(data as Message[]);
  };

  const createNewSession = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({ user_id: user.id, title: 'New Chat' })
      .select()
      .single();
    
    if (data && !error) {
      setSessions((prev) => [data as ChatSession, ...prev]);
      setActiveSessionId(data.id);
      setMessages([]);
      setCurrentPage('chat');
    }
  };

  const handleNewChat = async () => {
    await createNewSession();
  };

  const handleSelectSession = (id: string) => {
    setActiveSessionId(id);
    setCurrentPage('chat');
  };

  const handleDeleteSession = async (id: string) => {
    const { error } = await supabase.from('chat_sessions').delete().eq('id', id);
    if (!error) {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (activeSessionId === id) {
        setActiveSessionId(null);
        setMessages([]);
      }
      toast.success('Chat deleted');
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!session) return;
    
    let sessionId = activeSessionId;
    if (!sessionId) {
      const { data } = await supabase
        .from('chat_sessions')
        .insert({ user_id: user!.id, title: content.slice(0, 50) })
        .select()
        .single();
      if (data) {
        sessionId = data.id;
        setSessions((prev) => [data as ChatSession, ...prev]);
        setActiveSessionId(sessionId);
      }
    }
    
    if (!sessionId) return;
    
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      content,
      role: 'user',
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { message: content, sessionId, chatHistory: messages },
      });

      if (error) throw error;

      await fetchMessages(sessionId);
      await fetchSessions();
    } catch (error) {
      toast.error('Failed to get AI response');
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMsg.id));
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StarsBackground />
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const totalMessages = sessions.length * 4; // Estimate

  return (
    <div className="min-h-screen flex relative">
      <StarsBackground />
      
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <main className="flex-1 flex flex-col min-h-screen lg:ml-0 relative z-10">
        {currentPage === 'chat' && (
          <ChatArea
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
        )}
        {currentPage === 'dashboard' && (
          <DashboardView totalSessions={sessions.length} totalMessages={totalMessages} />
        )}
        {currentPage === 'history' && (
          <HistoryView
            sessions={sessions}
            onSelectSession={handleSelectSession}
            onDeleteSession={handleDeleteSession}
          />
        )}
        {currentPage === 'admin' && <AdminPanel />}
      </main>
    </div>
  );
}
