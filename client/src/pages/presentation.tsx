import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Shield, Info, Loader2, X } from "lucide-react";
import { DefenseRings } from "@/components/DefenseRings";
import { LayerModal } from "@/components/LayerModal";
import { LayerLegend } from "@/components/LayerLegend";
import { ThemeToggle } from "@/components/theme-toggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type DefenseLayer } from "@shared/schema";

export default function Presentation() {
  const [selectedLayer, setSelectedLayer] = useState<DefenseLayer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const { data: layers, isLoading, error } = useQuery<DefenseLayer[]>({
    queryKey: ["/api/defense-layers"],
  });

  const handleLayerClick = (layer: DefenseLayer) => {
    setSelectedLayer(layer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLayer(null), 200);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="relative flex-1 flex flex-col min-h-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
        
        <div className="relative z-10 container mx-auto px-4 pt-4 pb-2 flex-1 flex flex-col h-full">
          <div className="absolute top-4 right-4 z-20">
            <ThemeToggle />
          </div>

          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-2 flex-shrink-0 pt-2"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-md">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <h1 
              className="text-2xl lg:text-4xl font-bold tracking-tight text-foreground mb-2 cursor-pointer hover:text-primary transition-colors inline-block"
              onClick={() => setIsInfoModalOpen(true)}
              data-testid="page-title"
            >
              Defense in Depth
            </h1>
            
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
              Layered Security Strategy
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
            >
              <Info className="h-3 w-3" />
              <span>Click any ring to explore the security layer</span>
            </motion.div>
          </motion.header>

          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-1 flex items-end justify-center min-h-0 w-full"
            aria-label="Interactive defense layers visualization"
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-muted-foreground">Loading security layers...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <p className="text-destructive mb-2">Failed to load security layers</p>
                  <p className="text-sm text-muted-foreground">Please refresh the page to try again</p>
                </div>
              </div>
            ) : layers ? (
              <div className="w-full h-full max-w-[95vw] flex items-end justify-center pb-0">
                <DefenseRings layers={layers} onLayerClick={handleLayerClick} />
              </div>
            ) : null}
          </motion.section>

          {layers && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex-shrink-0 pb-1 pt-1"
            >
              <LayerLegend layers={layers} />
            </motion.section>
          )}
        </div>
      </div>

      <LayerModal 
        layer={selectedLayer} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-primary/10 rounded-md">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              Defense in Depth
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              A comprehensive cybersecurity strategy
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">What is Defense in Depth?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Defense in Depth is a cybersecurity strategy that employs multiple layers of security controls 
                to protect information and systems. Rather than relying on a single security measure, this 
                approach creates a series of defensive mechanisms that work together to provide comprehensive 
                protection.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Principles</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Layered Protection:</strong> Multiple security controls at different levels (physical, network, application, data)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Redundancy:</strong> If one layer fails, others continue to provide protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Diversity:</strong> Different types of security controls reduce the risk of a single point of failure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Comprehensive Coverage:</strong> Protection at every stage of data flow and system access</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">The Seven Layers</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                This visualization demonstrates seven critical security layers, from the outermost human layer 
                to the innermost data layer. Each layer provides specific protection mechanisms:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-muted/30 rounded">1. Human Layer</div>
                <div className="p-2 bg-muted/30 rounded">2. Physical Layer</div>
                <div className="p-2 bg-muted/30 rounded">3. Perimeter Layer</div>
                <div className="p-2 bg-muted/30 rounded">4. Network Layer</div>
                <div className="p-2 bg-muted/30 rounded">5. Endpoint Layer</div>
                <div className="p-2 bg-muted/30 rounded">6. Application Layer</div>
                <div className="p-2 bg-muted/30 rounded col-span-2 text-center">7. Data Layer</div>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                Click on any ring in the visualization to explore detailed information about each security layer, 
                including its purpose, tools, and technologies.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

