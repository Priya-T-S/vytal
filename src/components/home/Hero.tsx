import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Shield, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-vytal opacity-5" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/40 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-8 animate-float">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Health Companion</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Health Journey,{" "}
            <span className="text-gradient-vytal">Gamified</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Track medications with streaks, chat with AI about your health, upload scans for instant analysis, 
            and find the best hospitals near you—all in one beautiful app.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/chat">
              <Button variant="hero" size="xl">
                Start Chatting with AI
              </Button>
            </Link>
            <Link to="/tracker">
              <Button variant="outline" size="xl">
                Track Your Medicine
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <FeatureCard
              icon={<Heart className="w-6 h-6" />}
              title="AI Health Chat"
              description="Get instant answers to your health questions"
              color="primary"
            />
            <FeatureCard
              icon={<Trophy className="w-6 h-6" />}
              title="Streak Rewards"
              description="Earn points by tracking your medications"
              color="amber"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Scan Analysis"
              description="Upload reports for AI-powered insights"
              color="emerald"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "amber" | "emerald";
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const colorClasses = {
    primary: "bg-accent text-primary",
    amber: "bg-vytal-amber-light text-vytal-amber",
    emerald: "bg-vytal-emerald-light text-vytal-emerald",
  };

  return (
    <div className="p-6 rounded-2xl bg-card shadow-card border border-border hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4 mx-auto`}>
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
