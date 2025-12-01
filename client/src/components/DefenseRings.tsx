import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { type DefenseLayer } from "@shared/schema";
import { Shield } from "lucide-react";

interface DefenseRingsProps {
  layers: DefenseLayer[];
  onLayerClick: (layer: DefenseLayer) => void;
}

export function DefenseRings({ layers, onLayerClick }: DefenseRingsProps) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  
  const sortedLayers = [...layers].sort((a, b) => b.order - a.order);
  
  const baseRadius = 80;
  const ringWidth = 119;
  const ringGap = 10;
  const centerX = 500;
  const centerY = 1100;
  
  const calculateRingPath = useCallback((index: number) => {
    const innerRadius = baseRadius + index * (ringWidth + ringGap);
    const outerRadius = innerRadius + ringWidth;
    
    const startAngle = Math.PI;
    const endAngle = 0;
    
    const innerStartX = centerX + innerRadius * Math.cos(startAngle);
    const innerStartY = centerY - innerRadius * Math.sin(startAngle);
    const innerEndX = centerX + innerRadius * Math.cos(endAngle);
    const innerEndY = centerY - innerRadius * Math.sin(endAngle);
    
    const outerStartX = centerX + outerRadius * Math.cos(endAngle);
    const outerStartY = centerY - outerRadius * Math.sin(endAngle);
    const outerEndX = centerX + outerRadius * Math.cos(startAngle);
    const outerEndY = centerY - outerRadius * Math.sin(startAngle);
    
    return `
      M ${innerStartX} ${innerStartY}
      A ${innerRadius} ${innerRadius} 0 0 1 ${innerEndX} ${innerEndY}
      L ${outerStartX} ${outerStartY}
      A ${outerRadius} ${outerRadius} 0 0 0 ${outerEndX} ${outerEndY}
      Z
    `;
  }, []);
  
  const calculateLabelPosition = useCallback((index: number) => {
    const innerRadius = baseRadius + index * (ringWidth + ringGap);
    const labelRadius = innerRadius + ringWidth / 2;
    const angle = Math.PI / 2;
    
    return {
      x: centerX + labelRadius * Math.cos(angle),
      y: centerY - labelRadius * Math.sin(angle) + 8
    };
  }, []);

  return (
    <div className="relative w-full h-full flex justify-center items-end">
      <svg 
        viewBox="0 0 1000 1200" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-label="Defense in Depth security layers visualization"
      >
        <defs>
          {sortedLayers.map((layer) => (
            <linearGradient 
              key={`gradient-${layer.id}`} 
              id={`gradient-${layer.id}`}
              x1="0%" y1="0%" x2="0%" y2="100%"
            >
              <stop offset="0%" stopColor={layer.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={layer.color} stopOpacity="0.7" />
            </linearGradient>
          ))}
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>
        
        <g className="rings-group">
          {sortedLayers.map((layer, index) => {
            const isHovered = hoveredLayer === layer.id;
            const labelPos = calculateLabelPosition(index);
            
            return (
              <g 
                key={layer.id}
                className="ring-group cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => onLayerClick(layer)}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                onFocus={() => setHoveredLayer(layer.id)}
                onBlur={() => setHoveredLayer(null)}
                role="button"
                tabIndex={0}
                aria-label={`Click to explore ${layer.name} security layer`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onLayerClick(layer);
                  }
                }}
                data-testid={`ring-${layer.id}`}
                style={{ outline: 'none' }}
              >
                <motion.path
                  d={calculateRingPath(index)}
                  fill={`url(#gradient-${layer.id})`}
                  stroke={isHovered ? layer.hoverColor : "rgba(255,255,255,0.3)"}
                  strokeWidth={isHovered ? 3 : 1}
                  filter={isHovered ? "url(#glow)" : "url(#dropShadow)"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isHovered ? 1.02 : 1,
                    transition: { 
                      duration: 0.3,
                      delay: index * 0.08
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                />
                
                <motion.text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none"
                  fill="white"
                  fontSize={index < 3 ? "22" : "24"}
                  fontWeight="600"
                  letterSpacing="0.02em"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    transition: { delay: 0.3 + index * 0.08 }
                  }}
                  style={{
                    textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                  }}
                >
                  {layer.name.replace(" Layer", "")}
                </motion.text>
              </g>
            );
          })}
        </g>
        
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4, type: "spring" }}
        >
          <circle 
            cx={centerX} 
            cy={centerY} 
            r={baseRadius - 10} 
            fill="url(#centerGradient)"
            className="drop-shadow-lg"
          />
          <defs>
            <radialGradient id="centerGradient" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>
          <Shield 
            x={centerX - 20} 
            y={centerY - 20} 
            width={40} 
            height={40} 
            className="text-primary"
            stroke="currentColor"
            strokeWidth={1.5}
            fill="none"
          />
        </motion.g>
      </svg>
    </div>
  );
}

