import { Bot, Camera, FileSearch, MapPin, Activity, Bell } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Health Chatbot",
    description: "Chat with our intelligent AI assistant about symptoms, medications, and general health queries. Get reliable information 24/7.",
    color: "primary" as const,
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Medicine Photo Verification",
    description: "Snap a photo of your tablets to verify you've taken them. Build streaks and earn points for consistency!",
    color: "amber" as const,
  },
  {
    icon: <FileSearch className="w-6 h-6" />,
    title: "Scan & Report Analysis",
    description: "Upload medical scans and reports. Our AI will help you understand the results and suggest questions for your doctor.",
    color: "emerald" as const,
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Hospital Finder",
    description: "Find top-rated hospitals and clinics near you with contact details, specialties, and patient reviews.",
    color: "rose" as const,
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Health Records",
    description: "Keep all your medical records organized in one secure place. Access them anytime, anywhere.",
    color: "primary" as const,
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Smart Reminders",
    description: "Never miss a dose with intelligent medication reminders tailored to your schedule.",
    color: "amber" as const,
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need for{" "}
            <span className="text-gradient-vytal">Better Health</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vytal combines powerful AI with gamification to make health management engaging and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "amber" | "emerald" | "rose";
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const colorClasses = {
    primary: "bg-accent text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    amber: "bg-vytal-amber-light text-vytal-amber group-hover:bg-vytal-amber group-hover:text-primary-foreground",
    emerald: "bg-vytal-emerald-light text-vytal-emerald group-hover:bg-vytal-emerald group-hover:text-primary-foreground",
    rose: "bg-vytal-rose-light text-vytal-rose group-hover:bg-vytal-rose group-hover:text-primary-foreground",
  };

  return (
    <div className="group p-8 rounded-2xl bg-card shadow-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className={`w-14 h-14 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-6 transition-colors duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};
