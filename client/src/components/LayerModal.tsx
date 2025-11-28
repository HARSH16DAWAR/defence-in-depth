import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, ArrowLeft, Server, Lock, Globe, Users, Database, Laptop, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type DefenseLayer, type Tool } from "@shared/schema";

interface LayerModalProps {
  layer: DefenseLayer | null;
  isOpen: boolean;
  onClose: () => void;
}

const layerIcons: Record<string, typeof Shield> = {
  data: Database,
  application: Server,
  endpoint: Laptop,
  network: Network,
  perimeter: Globe,
  physical: Lock,
  human: Users
};

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay: 0.1 + index * 0.05 }
      }}
    >
      <Card 
        className="p-4 h-full hover-elevate transition-all duration-200 border border-card-border bg-card"
        data-testid={`tool-card-${tool.id}`}
      >
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-card-foreground text-sm leading-tight">
              {tool.name}
            </h4>
            <Badge variant="secondary" className="text-xs shrink-0">
              {tool.category}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            {tool.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

export function LayerModal({ layer, isOpen, onClose }: LayerModalProps) {
  if (!layer) return null;
  
  const Icon = layerIcons[layer.id] || Shield;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="modal-backdrop"
          />
          
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-background border border-border rounded-md shadow-xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            data-testid="layer-modal"
          >
            <div 
              className="sticky top-0 z-10 px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onClose}
                    className="shrink-0"
                    data-testid="button-back"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  
                  <div 
                    className="p-2.5 rounded-md"
                    style={{ backgroundColor: `${layer.color}20` }}
                  >
                    <Icon 
                      className="h-6 w-6" 
                      style={{ color: layer.color }}
                    />
                  </div>
                  
                  <div>
                    <h2 
                      className="text-xl lg:text-2xl font-bold"
                      style={{ color: layer.color }}
                      data-testid="layer-name"
                    >
                      {layer.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Layer {layer.order} of 7
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onClose}
                  className="shrink-0"
                  data-testid="button-close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">Purpose</h3>
                </div>
                <div 
                  className="p-5 rounded-md border border-border"
                  style={{ backgroundColor: `${layer.color}08` }}
                >
                  <p 
                    className="text-base font-medium mb-3"
                    style={{ color: layer.color }}
                    data-testid="layer-purpose"
                  >
                    {layer.purpose}
                  </p>
                  <p className="text-muted-foreground leading-relaxed" data-testid="layer-description">
                    {layer.description}
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Server className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Tools & Technologies
                  </h3>
                  <Badge variant="outline" className="ml-2">
                    {layer.tools.length} tools
                  </Badge>
                </div>
                
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  data-testid="tools-grid"
                >
                  {layer.tools.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-6 border-t border-border"
              >
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="gap-2"
                    data-testid="button-return-home"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Return to Overview
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

