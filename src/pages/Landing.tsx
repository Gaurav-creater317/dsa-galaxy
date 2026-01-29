import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bot, Sparkles, Code, Brain, Rocket, ChevronRight, Users, BookOpen, Award, Menu, X, Github, Twitter, Linkedin, MessageSquare, Zap, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarsBackground } from '@/components/StarsBackground';

const stats = [
  { icon: Users, value: '10K+', label: 'Active Learners' },
  { icon: BookOpen, value: '50+', label: 'DSA Topics' },
  { icon: Award, value: '100%', label: 'AI Powered' },
];

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Explanations',
    description: 'Get personalized, step-by-step explanations for any DSA problem. Our AI adapts to your learning style.',
  },
  {
    icon: Code,
    title: 'Interactive Code Practice',
    description: 'Write and test code directly in your browser with instant feedback and optimization suggestions.',
  },
  {
    icon: Target,
    title: 'Topic-wise Learning',
    description: 'Master DSA systematically - from Arrays to Dynamic Programming, all organized for efficient learning.',
  },
  {
    icon: Zap,
    title: 'Instant Problem Solving',
    description: 'Stuck on a problem? Ask our AI instructor and get detailed solutions with multiple approaches.',
  },
  {
    icon: TrendingUp,
    title: 'Track Your Progress',
    description: 'Monitor your learning journey with detailed analytics, streaks, and achievement badges.',
  },
  {
    icon: MessageSquare,
    title: 'Chat History',
    description: 'All your conversations saved. Revisit previous explanations and solutions anytime.',
  },
];

const codeLines = [
  { num: '01', code: '#include <iostream>', color: 'text-purple-400' },
  { num: '02', code: 'using namespace std;', color: 'text-purple-400' },
  { num: '03', code: '', color: '' },
  { num: '04', code: 'int binarySearch(int arr[], int n, int target) {', color: 'text-blue-400' },
  { num: '05', code: '    int left = 0, right = n - 1;', color: 'text-foreground' },
  { num: '06', code: '    while (left <= right) {', color: 'text-yellow-400' },
  { num: '07', code: '        int mid = left + (right - left) / 2;', color: 'text-foreground' },
  { num: '08', code: '        if (arr[mid] == target) return mid;', color: 'text-green-400' },
  { num: '09', code: '        else if (arr[mid] < target)', color: 'text-foreground' },
  { num: '10', code: '            left = mid + 1;', color: 'text-foreground' },
  { num: '11', code: '        else right = mid - 1;', color: 'text-foreground' },
  { num: '12', code: '    }', color: 'text-yellow-400' },
  { num: '13', code: '    return -1;', color: 'text-red-400' },
  { num: '14', code: '}', color: 'text-blue-400' },
];

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => (prev < codeLines.length ? prev + 1 : prev));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarsBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20 bg-background/80 backdrop-blur-lg border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">DSA Galaxy</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Login
            </Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button className="cosmic-glow">
              Sign Up
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-background/95 backdrop-blur-lg pt-20 px-6">
          <div className="flex flex-col gap-6 text-lg">
            <a href="#home" className="text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#features" className="text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#about" className="text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#contact" className="text-foreground py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <hr className="border-border" />
            <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Login</Button>
            </Link>
            <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full cosmic-glow">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative z-10 px-6 pt-24 pb-16 md:pt-32 md:pb-24 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-card border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Your AI-powered DSA Instructor</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master DSA with
              <br />
              <span className="text-gradient">AI Guidance!</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mb-8 mx-auto lg:mx-0">
              Your personal AI instructor for Data Structures & Algorithms. Get instant explanations, 
              solve problems step-by-step, and ace your coding interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button size="lg" className="cosmic-glow text-lg px-8 py-6 w-full sm:w-auto">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-card border-border/50 w-full sm:w-auto">
                  Explore Features
                </Button>
              </a>
            </div>
          </div>

          {/* Right Content - Code Editor Animation */}
          <div className="relative hidden lg:block">
            <div className="glass-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-card/80 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-muted-foreground font-mono">binary_search.cpp</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400">Live Coding</span>
                </div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 font-mono text-sm bg-card/50 min-h-[350px]">
                {codeLines.slice(0, visibleLines).map((line, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-muted-foreground/50 select-none w-6">{line.num}</span>
                    <span className={line.color}>{line.code}</span>
                  </div>
                ))}
                {visibleLines < codeLines.length && (
                  <div className="flex gap-4">
                    <span className="text-muted-foreground/50 select-none w-6">{codeLines[visibleLines]?.num}</span>
                    <span className="w-2 h-5 bg-primary animate-pulse" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">DSA Galaxy?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes learning Data Structures & Algorithms intuitive, interactive, and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-primary/30">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <span className="text-gradient">DSA Galaxy</span>
              </h2>
              <p className="text-muted-foreground mb-4">
                DSA Galaxy is an AI-powered learning platform designed to help developers master Data Structures 
                and Algorithms. Whether you're preparing for coding interviews or want to strengthen your 
                problem-solving skills, our AI instructor is here to guide you.
              </p>
              <p className="text-muted-foreground mb-6">
                With personalized explanations, interactive practice sessions, and a vast library of DSA topics, 
                we make complex concepts crystal clear.
              </p>
              <Link to="/auth">
                <Button className="cosmic-glow">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join DSA Galaxy
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  <Bot className="w-24 h-24 md:w-32 md:h-32 text-primary" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/20 blur-xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-accent/20 blur-xl animate-pulse delay-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 px-6 py-20 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="text-gradient">Level Up?</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start your DSA journey today. Join thousands of developers who are mastering algorithms with AI guidance.
          </p>
          <Link to="/auth">
            <Button size="lg" className="cosmic-glow text-lg px-10 py-6">
              <Rocket className="w-5 h-5 mr-2" />
              Get Started Now - It's Free!
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-border/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-gradient">DSA Galaxy</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                Your AI-powered companion for mastering Data Structures and Algorithms. 
                Learn smarter, not harder.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#home" className="hover:text-foreground transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
                <li><Link to="/auth" className="hover:text-foreground transition-colors">Get Started</Link></li>
              </ul>
            </div>
            
            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://github.com/Gaurav-creater317" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://x.com/Gaurav27Spark" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/gaurav-mehra-a41220299" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 DSA Galaxy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
