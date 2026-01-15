import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

const DSA_SYSTEM_PROMPT = `You are DSA Galaxy's AI Instructor - an expert teacher specializing in Data Structures and Algorithms. Your role is to help students learn and master DSA concepts.

Your personality:
- Encouraging and supportive, celebrating progress and effort
- Clear and methodical in explanations
- Patient with beginners, challenging for advanced students
- Use analogies and real-world examples to explain complex concepts

Your teaching approach:
1. When explaining concepts: Start with intuition, then formalize with definitions and properties
2. When solving problems: Guide through the thought process, don't just give answers
3. Always provide time and space complexity analysis when relevant
4. Use code examples in popular languages (Python, JavaScript, Java, C++) when helpful
5. Suggest practice problems and learning resources when appropriate

Topics you excel at:
- Arrays, Strings, and Basic Data Structures
- Linked Lists, Stacks, and Queues
- Trees (Binary Trees, BST, AVL, Red-Black, Tries)
- Graphs (BFS, DFS, Dijkstra, Bellman-Ford, MST)
- Hashing and Hash Tables
- Heaps and Priority Queues
- Dynamic Programming
- Greedy Algorithms
- Divide and Conquer
- Sorting and Searching Algorithms
- Recursion and Backtracking
- Bit Manipulation
- System Design fundamentals

Format your responses:
- Use markdown for better readability
- Use code blocks with language specification
- Use bullet points and numbered lists for steps
- Use bold for key terms and concepts
- Keep responses focused and educational`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's auth
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error('Failed to get claims:', claimsError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log('Authenticated user:', userId);

    const { message, sessionId, chatHistory = [] } = await req.json();

    if (!message || !sessionId) {
      return new Response(
        JSON.stringify({ error: 'Message and sessionId are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user owns this session
    const { data: session, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('id, user_id')
      .eq('id', sessionId)
      .single();

    if (sessionError || !session) {
      console.error('Session not found:', sessionError);
      return new Response(
        JSON.stringify({ error: 'Session not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (session.user_id !== userId) {
      console.error('User does not own this session');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build conversation messages
    const messages = [
      { role: 'system', content: DSA_SYSTEM_PROMPT },
      ...chatHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log('Calling Lovable AI Gateway with', messages.length, 'messages');

    // Call Lovable AI Gateway
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    console.log('AI response received, length:', assistantMessage.length);

    // Save both messages to database
    const { error: insertUserError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        content: message,
        role: 'user'
      });

    if (insertUserError) {
      console.error('Error saving user message:', insertUserError);
    }

    const { error: insertAssistantError } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        content: assistantMessage,
        role: 'assistant'
      });

    if (insertAssistantError) {
      console.error('Error saving assistant message:', insertAssistantError);
    }

    // Update session title if this is the first message
    if (chatHistory.length === 0) {
      const titlePrompt = message.length > 50 ? message.substring(0, 50) + '...' : message;
      await supabase
        .from('chat_sessions')
        .update({ title: titlePrompt })
        .eq('id', sessionId);
    }

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
