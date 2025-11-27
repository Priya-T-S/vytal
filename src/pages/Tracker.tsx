import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Flame, Trophy, Check, Plus, Pill, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

const Tracker = () => {
  const { toast } = useToast();
  const [streak, setStreak] = useState(7);
  const [points, setPoints] = useState(420);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedMed, setSelectedMed] = useState<string | null>(null);

  const [medications, setMedications] = useState<Medication[]>([
    { id: "1", name: "Vitamin D", dosage: "1000 IU", time: "8:00 AM", taken: true },
    { id: "2", name: "Omega-3", dosage: "500mg", time: "8:00 AM", taken: true },
    { id: "3", name: "Multivitamin", dosage: "1 tablet", time: "12:00 PM", taken: false },
    { id: "4", name: "Magnesium", dosage: "400mg", time: "9:00 PM", taken: false },
  ]);

  const handleTakeMedicine = (medId: string) => {
    setSelectedMed(medId);
    setShowCamera(true);
  };

  const handlePhotoCapture = () => {
    if (selectedMed) {
      setMedications((prev) =>
        prev.map((med) =>
          med.id === selectedMed ? { ...med, taken: true } : med
        )
      );
      setPoints((p) => p + 10);
      
      // Check if all medications are taken
      const allTaken = medications.filter((m) => m.id !== selectedMed).every((m) => m.taken);
      if (allTaken) {
        setStreak((s) => s + 1);
        toast({
          title: "🔥 Streak Extended!",
          description: `Amazing! You've maintained a ${streak + 1}-day streak!`,
        });
      } else {
        toast({
          title: "✅ Medication Logged!",
          description: "+10 points earned for staying on track!",
        });
      }
    }
    setShowCamera(false);
    setSelectedMed(null);
  };

  const completedCount = medications.filter((m) => m.taken).length;
  const progress = (completedCount / medications.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-vytal-amber to-orange-500 text-primary-foreground border-0">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                  <Flame className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Current Streak</p>
                  <p className="text-3xl font-bold">{streak} days</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-vytal-emerald to-emerald-600 text-primary-foreground border-0">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Total Points</p>
                  <p className="text-3xl font-bold">{points}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-card">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Today's Progress</p>
                  <p className="text-3xl font-bold text-foreground">{completedCount}/{medications.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Daily Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full gradient-vytal rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Medication List */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Today's Medications</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Medicine
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {medications.map((med) => (
                <div
                  key={med.id}
                  className={`p-4 rounded-xl border transition-all ${
                    med.taken
                      ? "bg-vytal-emerald-light border-vytal-emerald/30"
                      : "bg-card border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          med.taken
                            ? "bg-vytal-emerald text-primary-foreground"
                            : "bg-accent text-primary"
                        }`}
                      >
                        {med.taken ? <Check className="w-6 h-6" /> : <Pill className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{med.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {med.dosage} • {med.time}
                        </p>
                      </div>
                    </div>
                    {!med.taken && (
                      <Button
                        variant="streak"
                        size="sm"
                        onClick={() => handleTakeMedicine(med.id)}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    )}
                    {med.taken && (
                      <span className="text-sm font-medium text-vytal-emerald">+10 pts</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Camera Modal */}
          {showCamera && (
            <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle className="text-center">Take a Photo of Your Medication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-square bg-secondary rounded-xl flex items-center justify-center">
                    <Camera className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Position your medication in the frame and take a photo to verify
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowCamera(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="success"
                      className="flex-1"
                      onClick={handlePhotoCapture}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Capture
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Tracker;
