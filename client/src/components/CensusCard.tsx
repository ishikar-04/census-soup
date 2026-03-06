import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, ClipboardList, Info } from "lucide-react";
import type { CountryResponse } from "@shared/routes";
import { motion } from "framer-motion";

interface CensusCardProps {
  country: CountryResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CensusCard({ country, isOpen, onClose }: CensusCardProps) {
  if (!country) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-[#0f111a] border-white/10 text-white p-0 gap-0 overflow-hidden rounded-2xl max-h-[90vh] flex flex-col">
        
        <ScrollArea className="flex-1 overflow-y-auto">
          {/* Header Section with gradient background */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-br from-primary/20 via-background to-background border-b border-white/5">
            <div className="absolute top-0 right-0 p-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <DialogHeader className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-3 border-accent/30 text-accent bg-accent/10 px-3 py-1 uppercase tracking-wider text-[10px]">
                    Census Data {new Date().getFullYear()}
                  </Badge>
                  <DialogTitle className="text-4xl sm:text-5xl font-display font-bold text-white mb-2 flex items-center gap-3">
                    <img 
                      src={`https://flagcdn.com/w80/${
                        country.code === 'USA' ? 'us' :
                        country.code === 'JPN' ? 'jp' :
                        country.code === 'IND' ? 'in' :
                        country.code === 'BGD' ? 'bd' :
                        country.code === 'NGA' ? 'ng' :
                        country.code === 'IDN' ? 'id' :
                        country.code === 'PAK' ? 'pk' :
                        country.code === 'BRA' ? 'br' :
                        country.code === 'MEX' ? 'mx' :
                        country.code === 'ETH' ? 'et' :
                        country.code === 'PHL' ? 'ph' :
                        country.code === 'EGY' ? 'eg' :
                        country.code === 'VNM' ? 'vn' :
                        country.code === 'COD' ? 'cd' :
                        country.code === 'TUR' ? 'tr' :
                        country.code === 'IRN' ? 'ir' :
                        country.code === 'DEU' ? 'de' :
                        country.code === 'THA' ? 'th' :
                        country.code === 'RUS' ? 'ru' :
                        country.code === 'CHN' ? 'cn' :
                        country.code.toLowerCase().slice(0, 2)
                      }.png`}
                      alt={`${country.name} flag`}
                      className="w-10 h-7 object-cover rounded shadow-sm border border-white/10"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    {country.name}
                  </DialogTitle>
                  <DialogDescription className="text-lg text-white/60 font-light max-w-md">
                    {country.description}
                  </DialogDescription>
                </div>
                <div className="hidden sm:flex h-16 w-16 rounded-2xl bg-white/5 items-center justify-center border border-white/10 shadow-inner">
                  <span className="text-3xl font-bold text-white/20">{country.code}</span>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-px bg-white/5">
            <div className="bg-[#0f111a] p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-1">
                <Users className="w-4 h-4 text-primary" />
                Population Estimate
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-display text-white">
                {country.population}
              </div>
            </div>
            <div className="bg-[#0f111a] p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-1">
                <Calendar className="w-4 h-4 text-accent" />
                Census Frequency
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-display text-white">
                {country.censusFrequency}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 bg-[#0f111a]">
            <div className="flex items-center gap-2 mb-6">
              <ClipboardList className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-white">Key Demographic Questions</h3>
            </div>

            <div className="space-y-3">
              {country.surveyQuestions.map((sq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      {sq.question}
                    </p>
                    <div className="flex">
                      <Badge variant="secondary" className="text-[10px] py-0 h-4 bg-white/5 text-white/40 border-white/5">
                        {sq.format}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/10">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  These questions are sourced from the latest available census forms and public documentation. Understanding these demographics helps in resource planning, policy making, and economic forecasting.
                </p>
              </div>
              
              <div className="flex justify-end">
                <a 
                  href={country.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-accent hover:underline flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                >
                  Source: {new URL(country.sourceUrl).hostname}
                </a>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
