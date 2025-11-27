import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FolderOpen,
  Plus,
  Search,
  FileText,
  Calendar,
  Download,
  Trash2,
  Eye,
  Activity,
  Pill,
  Syringe,
  TestTube,
} from "lucide-react";

interface HealthRecord {
  id: string;
  title: string;
  type: "lab" | "prescription" | "scan" | "vaccination" | "visit";
  date: string;
  doctor?: string;
  facility?: string;
  notes?: string;
}

const recordIcons = {
  lab: TestTube,
  prescription: Pill,
  scan: Activity,
  vaccination: Syringe,
  visit: FileText,
};

const recordColors = {
  lab: "bg-vytal-emerald-light text-vytal-emerald",
  prescription: "bg-accent text-primary",
  scan: "bg-vytal-amber-light text-vytal-amber",
  vaccination: "bg-vytal-rose-light text-vytal-rose",
  visit: "bg-secondary text-secondary-foreground",
};

const mockRecords: HealthRecord[] = [
  {
    id: "1",
    title: "Complete Blood Count (CBC)",
    type: "lab",
    date: "2024-01-15",
    doctor: "Dr. Sarah Johnson",
    facility: "City General Hospital",
    notes: "All values within normal range",
  },
  {
    id: "2",
    title: "Vitamin D Supplement",
    type: "prescription",
    date: "2024-01-10",
    doctor: "Dr. Michael Chen",
    facility: "Sunrise Medical Center",
    notes: "1000 IU daily for 3 months",
  },
  {
    id: "3",
    title: "Chest X-Ray",
    type: "scan",
    date: "2024-01-05",
    doctor: "Dr. Emily Williams",
    facility: "Advanced Diagnostics Center",
    notes: "No abnormalities detected",
  },
  {
    id: "4",
    title: "Flu Vaccination",
    type: "vaccination",
    date: "2023-12-20",
    doctor: "Dr. Robert Brown",
    facility: "Green Valley Clinic",
    notes: "Annual flu shot - 2023-2024 season",
  },
  {
    id: "5",
    title: "Annual Physical Examination",
    type: "visit",
    date: "2023-12-15",
    doctor: "Dr. Lisa Anderson",
    facility: "City General Hospital",
    notes: "Overall health: Excellent",
  },
];

const Records = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [records] = useState<HealthRecord[]>(mockRecords);

  const filteredRecords = records.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || r.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = [
    { key: "lab", label: "Lab Tests" },
    { key: "prescription", label: "Prescriptions" },
    { key: "scan", label: "Scans" },
    { key: "vaccination", label: "Vaccinations" },
    { key: "visit", label: "Visits" },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Health Records</h1>
              <p className="text-muted-foreground">
                All your medical records in one secure place
              </p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {types.map(({ key, label }) => {
              const Icon = recordIcons[key as keyof typeof recordIcons];
              const count = records.filter((r) => r.type === key).length;
              return (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all ${
                    selectedType === key ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedType(selectedType === key ? null : key)}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-10 h-10 rounded-lg ${
                        recordColors[key as keyof typeof recordColors]
                      } flex items-center justify-center mx-auto mb-2`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records..."
              className="pl-12 h-12"
            />
          </div>

          {/* Records List */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-primary" />
                Your Records
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredRecords.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredRecords.length > 0 ? (
                <div className="space-y-3">
                  {filteredRecords.map((record) => {
                    const Icon = recordIcons[record.type];
                    return (
                      <div
                        key={record.id}
                        className="p-4 rounded-xl border border-border hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl ${
                              recordColors[record.type]
                            } flex items-center justify-center shrink-0`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate">
                              {record.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(record.date)}
                              </span>
                              {record.doctor && <span>{record.doctor}</span>}
                              {record.facility && (
                                <span className="hidden sm:inline">{record.facility}</span>
                              )}
                            </div>
                            {record.notes && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                                {record.notes}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No records found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Records;
