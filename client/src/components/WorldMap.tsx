import React, { useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Loader2 } from "lucide-react";
import type { CountryResponse } from "@shared/routes";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  countries: CountryResponse[];
  onSelectCountry: (country: CountryResponse) => void;
  isLoading: boolean;
}

export function WorldMap({ countries, onSelectCountry, isLoading }: WorldMapProps) {
  // List of pastel colors for countries
  const pastelColors = [
    "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA",
    "#F3E5F5", "#FFF9C4", "#E1F5FE", "#F1F8E9", "#FCE4EC"
  ];

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center rounded-3xl bg-card/30 border border-white/5 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <p className="font-medium">Loading geospatial data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] max-h-[600px] bg-[#0d1b2a] rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05),transparent_70%)] pointer-events-none" />
      
      <ComposableMap 
        projection="geoEqualEarth" 
        projectionConfig={{ 
          scale: 160,
          center: [0, 10]
        }}
        width={1000}
        height={500}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isoA3 = (geo.properties.ISO_A3 || geo.properties.iso_a3 || geo.properties.ADM0_A3 || "").toUpperCase();
              const name = (geo.properties.name || geo.properties.NAME || geo.properties.FORMAL_EN || "").toLowerCase();
              const geoId = (String(geo.id) || "").toUpperCase();
              
              const countryIndex = countries.findIndex(c => {
                const targetCode = c.code.toUpperCase();
                const targetName = c.name.toLowerCase();
                if (targetCode === "USA" && (isoA3 === "USA" || isoA3 === "US" || geoId === "USA" || name.includes("united states") || name.includes("america"))) {
                  return true;
                }
                return targetCode === isoA3 || targetName === name || targetCode === geoId;
              });

              const isHighlight = countryIndex !== -1;
              const country = isHighlight ? countries[countryIndex] : null;
              const fillColor = isHighlight ? pastelColors[countryIndex % pastelColors.length] : "#d1d5db";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (country) onSelectCountry(country);
                  }}
                  className="transition-all duration-300 outline-none"
                  style={{
                    default: {
                      fill: fillColor,
                      stroke: "#0d1b2a",
                      strokeWidth: 0.5,
                      opacity: isHighlight ? 0.9 : 0.4,
                      cursor: isHighlight ? "pointer" : "default",
                    },
                    hover: {
                      fill: isHighlight ? fillColor : "#d1d5db",
                      opacity: isHighlight ? 1 : 0.5,
                      stroke: isHighlight ? "white" : "#0d1b2a",
                      strokeWidth: isHighlight ? 1 : 0.5,
                      cursor: isHighlight ? "pointer" : "default",
                    },
                    pressed: {
                      fill: isHighlight ? fillColor : "#d1d5db",
                      opacity: 0.8,
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto pointer-events-none">
        <div className="glass-card px-4 py-2 rounded-2xl md:rounded-full flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
          <span className="flex items-center gap-2 text-xs font-medium text-white/70">
            <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            Interactive Regions
          </span>
          <div className="hidden md:block h-4 w-px bg-white/10" />
          <span className="text-[10px] md:text-xs text-muted-foreground leading-tight">Click highlighted countries for detailed census insights</span>
        </div>
      </div>
    </div>
  );
}
