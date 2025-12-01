import { motion } from "framer-motion";
import { type DefenseLayer } from "@shared/schema";

interface LayerLegendProps {
  layers: DefenseLayer[];
}

export function LayerLegend({ layers }: LayerLegendProps) {
  const sortedLayers = [...layers].sort((a, b) => a.order - b.order);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="w-full max-w-3xl mx-auto"
    >
      <p className="text-center text-sm text-muted-foreground mb-4">
        Security Layers
      </p>
      <div className="flex flex-wrap justify-center gap-3" data-testid="layer-legend">
        {sortedLayers.map((layer, index) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.05 }}
            className="flex items-center gap-2"
          >
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: layer.color }}
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {layer.order}. {layer.name.replace(" Layer", "")}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

