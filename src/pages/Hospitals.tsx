import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Star, Search, Navigation, Building2 } from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  phone: string;
  hours: string;
  specialties: string[];
  emergency: boolean;
}

const hospitals: Hospital[] = [
  {
    id: "1",
    name: "City General Hospital",
    type: "Multi-Specialty Hospital",
    address: "123 Healthcare Ave, Medical District",
    distance: "1.2 km",
    rating: 4.8,
    reviews: 2453,
    phone: "+1 (555) 123-4567",
    hours: "24/7 Emergency",
    specialties: ["Cardiology", "Neurology", "Orthopedics"],
    emergency: true,
  },
  {
    id: "2",
    name: "Sunrise Medical Center",
    type: "Private Hospital",
    address: "456 Wellness Blvd, Health Park",
    distance: "2.5 km",
    rating: 4.6,
    reviews: 1876,
    phone: "+1 (555) 234-5678",
    hours: "6:00 AM - 10:00 PM",
    specialties: ["Dermatology", "Pediatrics", "ENT"],
    emergency: false,
  },
  {
    id: "3",
    name: "Metro Heart Institute",
    type: "Specialty Hospital",
    address: "789 Cardiac Lane, Downtown",
    distance: "3.1 km",
    rating: 4.9,
    reviews: 3102,
    phone: "+1 (555) 345-6789",
    hours: "24/7",
    specialties: ["Cardiology", "Cardiac Surgery", "Vascular Medicine"],
    emergency: true,
  },
  {
    id: "4",
    name: "Green Valley Clinic",
    type: "Primary Care Clinic",
    address: "321 Healing Street, Suburb Area",
    distance: "4.7 km",
    rating: 4.5,
    reviews: 892,
    phone: "+1 (555) 456-7890",
    hours: "8:00 AM - 8:00 PM",
    specialties: ["General Medicine", "Family Care", "Vaccinations"],
    emergency: false,
  },
  {
    id: "5",
    name: "Advanced Diagnostics Center",
    type: "Diagnostic Center",
    address: "567 Scan Avenue, Tech Park",
    distance: "5.2 km",
    rating: 4.7,
    reviews: 1245,
    phone: "+1 (555) 567-8901",
    hours: "7:00 AM - 9:00 PM",
    specialties: ["MRI", "CT Scan", "Lab Tests"],
    emergency: false,
  },
];

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = !selectedType || h.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = [...new Set(hospitals.map((h) => h.type))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl gradient-vytal flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Find Hospitals Near You</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover top-rated hospitals, clinics, and diagnostic centers in your area with verified reviews and contact information.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospitals or specialties..."
                className="pl-12 h-12"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                onClick={() => setSelectedType(null)}
              >
                All
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Hospital List */}
          <div className="space-y-4">
            {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Hospital Icon */}
                    <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <Building2 className="w-8 h-8 text-primary" />
                    </div>

                    {/* Hospital Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {hospital.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{hospital.type}</p>
                        </div>
                        {hospital.emergency && (
                          <span className="px-3 py-1 rounded-full bg-vytal-rose-light text-vytal-rose text-xs font-medium">
                            24/7 Emergency
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-vytal-amber text-vytal-amber" />
                          <span className="font-medium">{hospital.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({hospital.reviews.toLocaleString()} reviews)
                        </span>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Navigation className="w-4 h-4" />
                          <span>{hospital.distance} away</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{hospital.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{hospital.hours}</span>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-3 py-1 rounded-full bg-secondary text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col gap-2 shrink-0">
                      <Button variant="hero" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredHospitals.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hospitals found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hospitals;
