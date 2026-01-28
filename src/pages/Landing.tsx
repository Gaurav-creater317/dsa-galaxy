import { Link } from 'react-router-dom';
import { Bot, Sparkles, Code, Brain, Rocket, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarsBackground } from '@/components/StarsBackground';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Get personalized explanations and step-by-step solutions for any DSA problem.',
  },
  {
    icon: Code,
    title: 'Interactive Practice',
    description: 'Master algorithms through hands-on coding challenges with instant feedback.',
  },
  {
    icon: Rocket,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed analytics and achievements.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarsBackground />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">DSA Galaxy</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="cosmic-glow">
              Get Started
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-24 md:pt-24 md:pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass-card border border-primary/30">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Your AI-powered DSA companion</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl leading-tight">
          <span className="text-gradient">Master Data Structures</span>
          <br />
          <span className="text-foreground">& Algorithms</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          Learn DSA the smart way with AI-guided explanations, interactive visualizations, 
          and personalized practice sessions. Your journey to coding mastery starts here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/auth">
            <Button size="lg" className="cosmic-glow text-lg px-8 py-6">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Learning Free
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-card border-border/50">
            Watch Demo
          </Button>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-primary/10 blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-accent/10 blur-xl animate-pulse delay-1000" />
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-gradient">Why Choose DSA Galaxy?</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Our AI instructor adapts to your learning style, making complex concepts crystal clear.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border border-primary/30">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="text-gradient">Level Up?</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of developers who are mastering DSA with our AI-powered platform.
          </p>
          <Link to="/auth">
            <Button size="lg" className="cosmic-glow text-lg px-10 py-6">
              <Rocket className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-border/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">© 2026 DSA Galaxy. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
