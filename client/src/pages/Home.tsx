import { useState } from "react";
import { useCountries } from "@/hooks/use-countries";
import { WorldMap } from "@/components/WorldMap";
import { CensusCard } from "@/components/CensusCard";
import { StatsCard } from "@/components/StatsCard";
import { Globe, Users, FileText, Activity } from "lucide-react";
import type { CountryResponse } from "@shared/routes";

export default function Home() {
  const { data: countries = [], isLoading } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<CountryResponse | null>(null);

  // Fallback data for stats if needed, or derived from real data
  const totalPopulation = "3.8B+"; // Approx sum of top 5
  const activeSurveys = "5";
  const dataPoints = "150+";

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 blur-[100px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 blur-[120px] opacity-20" />
      </div>

      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white max-w-4xl mx-auto">
            World <span className="text-gradient-accent">Census Data</span> Explorer
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Interactive insights into the demographics of the world's most populous nations. 
            Click on highlighted regions to explore key survey questions and population statistics.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatsCard 
            title="Covered Population" 
            value={totalPopulation} 
            icon={<Users className="w-6 h-6" />}
            delay={100}
          />
          <StatsCard 
            title="Active Regions" 
            value={activeSurveys} 
            icon={<Globe className="w-6 h-6" />}
            delay={200}
          />
          <StatsCard 
            title="Data Points Collected" 
            value={dataPoints} 
            icon={<FileText className="w-6 h-6" />}
            delay={300}
          />
        </div>

        {/* Main Content Area */}
        <div className="mb-20">
          {/* Map Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Activity className="w-6 h-6 text-accent" />
                Global Overview
              </h2>
            </div>
            
            <WorldMap 
              countries={countries} 
              onSelectCountry={setSelectedCountry} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/20">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p className="text-sm">© {new Date().getFullYear()} World Census Explorer. Data visualized for educational purposes.</p>
        </div>
      </footer>

      {/* Interactive Dialog */}
      <CensusCard 
        country={selectedCountry} 
        isOpen={!!selectedCountry} 
        onClose={() => setSelectedCountry(null)} 
      />
    </div>
  );
}
