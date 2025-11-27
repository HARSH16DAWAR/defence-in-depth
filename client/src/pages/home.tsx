import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Gauge,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Network,
  GitBranch,
  Server,
  Code,
  Database,
  ChevronRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";
import { securityLayers, threatScenarios, type SecurityLayer, type ThreatScenario } from "@shared/schema";

const layerColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  emerald: { 
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20", 
    border: "border-emerald-500/30", 
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "rgba(16, 185, 129, 0.5)"
  },
  blue: { 
    bg: "bg-blue-500/10 dark:bg-blue-500/20", 
    border: "border-blue-500/30", 
    text: "text-blue-600 dark:text-blue-400",
    glow: "rgba(59, 130, 246, 0.5)"
  },
  violet: { 
    bg: "bg-violet-500/10 dark:bg-violet-500/20", 
    border: "border-violet-500/30", 
    text: "text-violet-600 dark:text-violet-400",
    glow: "rgba(139, 92, 246, 0.5)"
  },
  amber: { 
    bg: "bg-amber-500/10 dark:bg-amber-500/20", 
    border: "border-amber-500/30", 
    text: "text-amber-600 dark:text-amber-400",
    glow: "rgba(245, 158, 11, 0.5)"
  },
  rose: { 
    bg: "bg-rose-500/10 dark:bg-rose-500/20", 
    border: "border-rose-500/30", 
    text: "text-rose-600 dark:text-rose-400",
    glow: "rgba(244, 63, 94, 0.5)"
  },
  cyan: { 
    bg: "bg-cyan-500/10 dark:bg-cyan-500/20", 
    border: "border-cyan-500/30", 
    text: "text-cyan-600 dark:text-cyan-400",
    glow: "rgba(6, 182, 212, 0.5)"
  },
  indigo: { 
    bg: "bg-indigo-500/10 dark:bg-indigo-500/20", 
    border: "border-indigo-500/30", 
    text: "text-indigo-600 dark:text-indigo-400",
    glow: "rgba(99, 102, 241, 0.5)"
  },
};

const iconMap: Record<string, typeof Shield> = {
  Building2,
  Network,
  Shield,
  GitBranch,
  Server,
  Code,
  Database,
};

function getIcon(iconName: string) {
  return iconMap[iconName] || Shield;
}

function DataPacket({ 
  currentLayer, 
  isMoving,
  color 
}: { 
  currentLayer: number; 
  isMoving: boolean;
  color: string;
}) {
  const colorClass = layerColors[color] || layerColors.blue;
  
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 z-20"
      style={{ 
        top: `${(currentLayer - 1) * (100 / 7) + (100 / 14)}%`,
      }}
      animate={isMoving ? {
        scale: [1, 1.2, 1],
        boxShadow: [
          `0 0 20px 5px ${colorClass.glow}`,
          `0 0 40px 10px ${colorClass.glow}`,
          `0 0 20px 5px ${colorClass.glow}`,
        ]
      } : {}}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div 
        className={`w-6 h-6 rounded-full bg-gradient-to-br from-white to-blue-200 dark:from-blue-300 dark:to-blue-500 shadow-lg`}
        style={{ 
          boxShadow: `0 0 25px 8px ${colorClass.glow}`,
        }}
      />
      <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-blue-400" />
    </motion.div>
  );
}

function ThreatIndicator({ 
  threat, 
  isBlocked, 
  layer 
}: { 
  threat: ThreatScenario; 
  isBlocked: boolean; 
  layer: number;
}) {
  if (!isBlocked) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-30"
      style={{ top: `${(layer - 1) * (100 / 7) + (100 / 14)}%` }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-2 bg-red-500/20 dark:bg-red-500/30 backdrop-blur-sm border border-red-500/40 rounded-lg px-3 py-2"
      >
        <AlertTriangle className="w-4 h-4 text-red-500" />
        <span className="text-xs font-medium text-red-600 dark:text-red-400">Blocked</span>
      </motion.div>
    </motion.div>
  );
}

function LayerCard({ 
  layer, 
  isActive, 
  isComplete,
  threatBlocked 
}: { 
  layer: SecurityLayer; 
  isActive: boolean; 
  isComplete: boolean;
  threatBlocked: ThreatScenario | null;
}) {
  const colorClass = layerColors[layer.color] || layerColors.blue;
  const Icon = getIcon(layer.icon);

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full"
        >
          <Card className={`h-full border-2 ${colorClass.border} ${colorClass.bg} backdrop-blur-sm overflow-hidden`}>
            <CardHeader className="pb-3 flex flex-row items-center gap-3">
              <div className={`p-3 rounded-xl ${colorClass.bg} ${colorClass.border} border`}>
                <Icon className={`w-6 h-6 ${colorClass.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className={`text-lg font-semibold ${colorClass.text}`}>
                  {layer.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">Layer {layer.id} of 7</p>
              </div>
              {isComplete && (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  Role
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {layer.role}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  Protection Mechanisms
                </h4>
                <ul className="space-y-1.5">
                  {layer.protectionMechanisms.map((mechanism, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-3 h-3 mt-1 flex-shrink-0 text-muted-foreground/60" />
                      <span>{mechanism}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {threatBlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      Threat Blocked!
                    </span>
                  </div>
                  <p className="text-xs text-red-600/80 dark:text-red-400/80">
                    {threatBlocked.description}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SecurityLayerStrip({ 
  layer, 
  isActive, 
  isComplete,
  onClick
}: { 
  layer: SecurityLayer; 
  isActive: boolean; 
  isComplete: boolean;
  onClick: () => void;
}) {
  const colorClass = layerColors[layer.color] || layerColors.blue;
  const Icon = getIcon(layer.icon);

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative flex items-center gap-3 w-full p-3 rounded-lg border transition-all duration-300
        ${isActive 
          ? `${colorClass.bg} ${colorClass.border} border-2 shadow-lg` 
          : 'bg-card/50 border-border/50 hover:bg-card hover:border-border'
        }
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      data-testid={`layer-strip-${layer.id}`}
    >
      <div className={`p-2 rounded-lg ${isActive ? colorClass.bg : 'bg-muted/50'} ${isActive ? colorClass.border : 'border-transparent'} border`}>
        <Icon className={`w-5 h-5 ${isActive ? colorClass.text : 'text-muted-foreground'}`} />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className={`text-sm font-medium truncate ${isActive ? colorClass.text : 'text-foreground'}`}>
          {layer.shortName}
        </p>
      </div>
      {isComplete && (
        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
      )}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className={`absolute inset-0 rounded-lg border-2 ${colorClass.border}`}
          style={{ boxShadow: `0 0 20px 2px ${colorClass.glow}` }}
        />
      )}
    </motion.button>
  );
}

function AnimationControls({ 
  isPlaying, 
  speed, 
  onPlayPause, 
  onSpeedChange, 
  onReset,
  loopCount 
}: {
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
  loopCount: number;
}) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardContent className="py-4 px-6">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant={isPlaying ? "default" : "outline"}
                  onClick={onPlayPause}
                  data-testid="button-play-pause"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isPlaying ? "Pause animation" : "Play animation"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={onReset}
                  data-testid="button-reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset animation</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center gap-3 flex-1 min-w-[200px] max-w-[300px]">
            <Gauge className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <Slider
              value={[speed]}
              onValueChange={([val]) => onSpeedChange(val)}
              min={0.5}
              max={2}
              step={0.25}
              className="flex-1"
              data-testid="slider-speed"
            />
            <span className="text-sm text-muted-foreground font-mono w-12 text-right">
              {speed.toFixed(2)}x
            </span>
          </div>

          <Badge variant="secondary" className="font-mono" data-testid="badge-loop-count">
            Loop {loopCount}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function CircuitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" className="fill-current text-primary" />
            <circle cx="50" cy="50" r="2" className="fill-current text-primary" />
            <circle cx="90" cy="90" r="2" className="fill-current text-primary" />
            <path d="M10 10 L50 10 L50 50" className="stroke-current text-primary" strokeWidth="1" fill="none" />
            <path d="M50 50 L90 50 L90 90" className="stroke-current text-primary" strokeWidth="1" fill="none" />
            <path d="M10 50 L10 90 L50 90" className="stroke-current text-primary" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
}

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [currentLayer, setCurrentLayer] = useState(1);
  const [completedLayers, setCompletedLayers] = useState<number[]>([]);
  const [loopCount, setLoopCount] = useState(1);
  const [currentThreat, setCurrentThreat] = useState<ThreatScenario | null>(null);
  const [threatBlockedAt, setThreatBlockedAt] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetAnimation = useCallback(() => {
    setCurrentLayer(1);
    setCompletedLayers([]);
    setCurrentThreat(null);
    setThreatBlockedAt(null);
  }, []);

  const selectRandomThreat = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * threatScenarios.length);
    return threatScenarios[randomIndex];
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const baseInterval = 2000;
    const adjustedInterval = baseInterval / speed;

    intervalRef.current = setInterval(() => {
      setCurrentLayer((prev) => {
        const nextLayer = prev + 1;
        
        if (nextLayer > 7) {
          setLoopCount((c) => c + 1);
          setCompletedLayers([]);
          setCurrentThreat(selectRandomThreat());
          setThreatBlockedAt(null);
          return 1;
        }
        
        setCompletedLayers((completed) => [...completed, prev]);
        
        if (currentThreat && currentThreat.blockedAtLayer === nextLayer) {
          setThreatBlockedAt(nextLayer);
          setTimeout(() => {
            setCurrentThreat(null);
            setThreatBlockedAt(null);
          }, 1500);
        }
        
        return nextLayer;
      });
    }, adjustedInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, currentThreat, selectRandomThreat]);

  useEffect(() => {
    if (!currentThreat) {
      const threat = selectRandomThreat();
      setCurrentThreat(threat);
    }
  }, [currentThreat, selectRandomThreat]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  
  const handleReset = () => {
    resetAnimation();
    setLoopCount(1);
    setIsPlaying(true);
  };

  const handleLayerClick = (layerId: number) => {
    setIsPlaying(false);
    setCurrentLayer(layerId);
    setCompletedLayers(securityLayers.filter(l => l.id < layerId).map(l => l.id));
  };

  const activeLayer = securityLayers.find(l => l.id === currentLayer);
  const activeLayerColor = activeLayer?.color || "blue";

  return (
    <div className="min-h-screen bg-background relative">
      <CircuitBackground />
      
      <div className="relative z-10 flex flex-col h-screen">
        <header className="flex-shrink-0 px-6 py-4 border-b bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight" data-testid="text-title">
                  Defense in Depth
                </h1>
                <p className="text-sm text-muted-foreground">
                  Interactive Security Layer Visualization
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {currentThreat && !threatBlockedAt && (
                <Badge variant="destructive" className="gap-1.5">
                  <AlertTriangle className="w-3 h-3" />
                  {currentThreat.name} incoming
                </Badge>
              )}
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden p-4 md:p-6">
          <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-4 md:gap-6">
            <div className="lg:w-64 flex-shrink-0 space-y-2 overflow-y-auto">
              <div className="sticky top-0 bg-background/80 backdrop-blur-sm pb-2 mb-2">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Security Layers
                </h2>
              </div>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-2 relative">
                  {securityLayers.map((layer) => (
                    <SecurityLayerStrip
                      key={layer.id}
                      layer={layer}
                      isActive={layer.id === currentLayer}
                      isComplete={completedLayers.includes(layer.id)}
                      onClick={() => handleLayerClick(layer.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <div className="flex-1 relative rounded-xl border bg-gradient-to-b from-card/50 to-background overflow-hidden">
                <div className="absolute inset-0 flex">
                  {securityLayers.map((layer, index) => {
                    const colorClass = layerColors[layer.color] || layerColors.blue;
                    const isActive = layer.id === currentLayer;
                    const isComplete = completedLayers.includes(layer.id);
                    
                    return (
                      <div
                        key={layer.id}
                        className={`
                          relative flex-1 border-r last:border-r-0 border-border/30 
                          transition-all duration-500
                          ${isActive ? colorClass.bg : isComplete ? 'bg-muted/20' : 'bg-transparent'}
                        `}
                        style={{ 
                          borderBottom: isActive ? `3px solid` : undefined,
                          borderBottomColor: isActive ? colorClass.glow : undefined,
                        }}
                      >
                        <div className={`
                          absolute inset-x-0 bottom-0 h-1 transition-all duration-300
                          ${isComplete ? 'bg-green-500/50' : 'bg-transparent'}
                        `} />
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <motion.div
                            animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                            className={`p-2 md:p-3 rounded-xl ${isActive ? colorClass.bg : 'bg-muted/30'} ${isActive ? colorClass.border : 'border-transparent'} border`}
                          >
                            {(() => {
                              const Icon = getIcon(layer.icon);
                              return <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? colorClass.text : 'text-muted-foreground'}`} />;
                            })()}
                          </motion.div>
                          <p className={`mt-2 text-xs font-medium text-center ${isActive ? colorClass.text : 'text-muted-foreground'}`}>
                            {layer.shortName}
                          </p>
                          {isComplete && (
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          )}
                        </div>

                        {threatBlockedAt === layer.id && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [1, 1.3, 0], opacity: [1, 0.8, 0] }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="p-3 rounded-full bg-red-500/20 border-2 border-red-500">
                              <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <motion.div
                  className="absolute bottom-0 h-2 bg-gradient-to-r from-primary/50 to-primary rounded-full"
                  style={{ left: 0 }}
                  animate={{ 
                    width: `${(currentLayer / 7) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              <div className="h-64 lg:h-80">
                {activeLayer && (
                  <LayerCard
                    layer={activeLayer}
                    isActive={true}
                    isComplete={completedLayers.includes(activeLayer.id)}
                    threatBlocked={threatBlockedAt === activeLayer.id ? currentThreat : null}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="flex-shrink-0 px-4 md:px-6 pb-4 md:pb-6">
          <div className="max-w-7xl mx-auto">
            <AnimationControls
              isPlaying={isPlaying}
              speed={speed}
              onPlayPause={handlePlayPause}
              onSpeedChange={setSpeed}
              onReset={handleReset}
              loopCount={loopCount}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
