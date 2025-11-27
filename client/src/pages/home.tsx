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
  Info,
  Zap,
  Mail,
  Lock,
  FileWarning,
  UserX,
  Skull,
  Bug,
  Target,
  BookOpen,
  Layers,
  Settings,
  ArrowRight,
  X,
  History,
  Wrench,
  Award,
  HelpCircle,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  ShieldX,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  securityLayers, 
  threatScenarios, 
  layerDetails,
  quizQuestions,
  type SecurityLayer, 
  type ThreatScenario,
  type QuizQuestion 
} from "@shared/schema";

const layerColors: Record<string, { bg: string; border: string; text: string; glow: string; solid: string }> = {
  emerald: { 
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20", 
    border: "border-emerald-500/30", 
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "rgba(16, 185, 129, 0.5)",
    solid: "bg-emerald-500"
  },
  blue: { 
    bg: "bg-blue-500/10 dark:bg-blue-500/20", 
    border: "border-blue-500/30", 
    text: "text-blue-600 dark:text-blue-400",
    glow: "rgba(59, 130, 246, 0.5)",
    solid: "bg-blue-500"
  },
  violet: { 
    bg: "bg-violet-500/10 dark:bg-violet-500/20", 
    border: "border-violet-500/30", 
    text: "text-violet-600 dark:text-violet-400",
    glow: "rgba(139, 92, 246, 0.5)",
    solid: "bg-violet-500"
  },
  amber: { 
    bg: "bg-amber-500/10 dark:bg-amber-500/20", 
    border: "border-amber-500/30", 
    text: "text-amber-600 dark:text-amber-400",
    glow: "rgba(245, 158, 11, 0.5)",
    solid: "bg-amber-500"
  },
  rose: { 
    bg: "bg-rose-500/10 dark:bg-rose-500/20", 
    border: "border-rose-500/30", 
    text: "text-rose-600 dark:text-rose-400",
    glow: "rgba(244, 63, 94, 0.5)",
    solid: "bg-rose-500"
  },
  cyan: { 
    bg: "bg-cyan-500/10 dark:bg-cyan-500/20", 
    border: "border-cyan-500/30", 
    text: "text-cyan-600 dark:text-cyan-400",
    glow: "rgba(6, 182, 212, 0.5)",
    solid: "bg-cyan-500"
  },
  indigo: { 
    bg: "bg-indigo-500/10 dark:bg-indigo-500/20", 
    border: "border-indigo-500/30", 
    text: "text-indigo-600 dark:text-indigo-400",
    glow: "rgba(99, 102, 241, 0.5)",
    solid: "bg-indigo-500"
  },
};

const severityColors: Record<string, string> = {
  low: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
  high: "bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30",
  critical: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
};

const iconMap: Record<string, typeof Shield> = {
  Building2,
  Network,
  Shield,
  GitBranch,
  Server,
  Code,
  Database,
  Zap,
  Mail,
  Lock,
  FileWarning,
  UserX,
  Skull,
  Bug,
};

function getIcon(iconName: string) {
  return iconMap[iconName] || Shield;
}

function ThreatScenarioSelector({ 
  threats, 
  selectedThreat, 
  onSelectThreat,
  onSimulate
}: { 
  threats: ThreatScenario[];
  selectedThreat: ThreatScenario | null;
  onSelectThreat: (threat: ThreatScenario) => void;
  onSimulate: () => void;
}) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-destructive" />
          Attack Scenarios
        </CardTitle>
        <CardDescription>Select an attack type to simulate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {threats.map((threat) => {
            const Icon = getIcon(threat.icon);
            const isSelected = selectedThreat?.id === threat.id;
            return (
              <button
                key={threat.id}
                onClick={() => onSelectThreat(threat)}
                className={`
                  p-3 rounded-lg border transition-all text-left
                  ${isSelected 
                    ? 'bg-destructive/10 border-destructive/50 ring-2 ring-destructive/20' 
                    : 'bg-card hover:bg-muted/50 border-border'
                  }
                `}
                data-testid={`threat-${threat.id}`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-destructive' : 'text-muted-foreground'}`} />
                <p className={`text-sm font-medium ${isSelected ? 'text-destructive' : 'text-foreground'}`}>
                  {threat.name}
                </p>
                <Badge variant="outline" className={`mt-1 text-xs ${severityColors[threat.severity]}`}>
                  {threat.severity}
                </Badge>
              </button>
            );
          })}
        </div>
        
        {selectedThreat && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-muted/50 rounded-lg border"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{selectedThreat.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{selectedThreat.description}</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-muted-foreground">Blocked at:</span>
                    <span className="font-medium">{securityLayers.find(l => l.id === selectedThreat.blockedAtLayer)?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span className="text-muted-foreground">Layers traversed:</span>
                    <span className="font-medium">{selectedThreat.attackPath.length}</span>
                  </div>
                </div>
              </div>
              <Button onClick={onSimulate} className="gap-2" data-testid="button-simulate-attack">
                <Zap className="w-4 h-4" />
                Simulate
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function AttackPathVisualization({ 
  threat, 
  currentStep,
  isSimulating 
}: { 
  threat: ThreatScenario | null;
  currentStep: number;
  isSimulating: boolean;
}) {
  if (!threat) return null;

  return (
    <div className="relative">
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {threat.attackPath.map((layerId, index) => {
          const layer = securityLayers.find(l => l.id === layerId);
          const colorClass = layer ? layerColors[layer.color] : layerColors.blue;
          const isCurrentStep = index === currentStep && isSimulating;
          const isPassed = index < currentStep;
          const isBlocked = layerId === threat.blockedAtLayer && index === currentStep;
          const Icon = layer ? getIcon(layer.icon) : Shield;

          return (
            <div key={layerId} className="flex items-center">
              <motion.div
                className={`
                  relative p-2 rounded-lg border-2 transition-all
                  ${isBlocked 
                    ? 'bg-red-500/20 border-red-500' 
                    : isCurrentStep 
                      ? `${colorClass.bg} ${colorClass.border}` 
                      : isPassed 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-muted/30 border-muted'
                  }
                `}
                animate={isCurrentStep && !isBlocked ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: isCurrentStep ? Infinity : 0 }}
              >
                <Icon className={`w-5 h-5 ${isBlocked ? 'text-red-500' : isCurrentStep ? colorClass.text : isPassed ? 'text-green-500' : 'text-muted-foreground'}`} />
                {isBlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3 text-white" />
                  </motion.div>
                )}
                {isPassed && !isBlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.div>
              {index < threat.attackPath.length - 1 && (
                <ArrowRight className={`w-4 h-4 mx-1 ${isPassed ? 'text-green-500' : 'text-muted-foreground'}`} />
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Attack path: {threat.attackPath.map(id => securityLayers.find(l => l.id === id)?.shortName).join(" → ")}
      </p>
    </div>
  );
}

function LayerDrillDown({ layer }: { layer: SecurityLayer }) {
  const details = layerDetails.find(d => d.id === layer.id);
  const colorClass = layerColors[layer.color] || layerColors.blue;
  const Icon = getIcon(layer.icon);

  if (!details) return null;

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-xl ${colorClass.bg} ${colorClass.border} border`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-3 rounded-xl ${colorClass.bg} ${colorClass.border} border`}>
            <Icon className={`w-6 h-6 ${colorClass.text}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${colorClass.text}`}>{layer.name}</h3>
            <p className="text-sm text-muted-foreground">{layer.description}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <History className="w-4 h-4 text-muted-foreground" />
          Real-World Examples
        </h4>
        <div className="grid gap-3">
          {details.realWorldExamples.map((example, idx) => (
            <Card key={idx} className="bg-card/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{example.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{example.description}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">{example.year}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="font-medium">Impact:</span> {example.impact}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          Best Practices
        </h4>
        <ul className="space-y-2">
          {details.bestPractices.map((practice, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
              <ChevronRight className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
              <span>{practice}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-muted-foreground" />
          Recommended Tools
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {details.tools.map((tool, idx) => (
            <div key={idx} className="p-3 bg-muted/30 rounded-lg border">
              <p className="font-medium text-sm">{tool.name}</p>
              <Badge variant="secondary" className="text-xs mt-1">{tool.category}</Badge>
              <p className="text-xs text-muted-foreground mt-2">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComparisonMode({ enabledLayers }: { enabledLayers: number[] }) {
  const allEnabled = enabledLayers.length === 7;
  const singleLayerEnabled = enabledLayers.length === 1;
  
  const calculateSecurityScore = (layers: number[]) => {
    return Math.round((layers.length / 7) * 100);
  };

  const getVulnerabilities = (layers: number[]) => {
    const missing = securityLayers.filter(l => !layers.includes(l.id));
    return missing.flatMap(l => l.threats);
  };

  const securityScore = calculateSecurityScore(enabledLayers);
  const vulnerabilities = getVulnerabilities(enabledLayers);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className={`${enabledLayers.length >= 5 ? 'border-green-500/30' : enabledLayers.length >= 3 ? 'border-yellow-500/30' : 'border-red-500/30'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              {allEnabled ? (
                <ShieldCheck className="w-5 h-5 text-green-500" />
              ) : enabledLayers.length >= 3 ? (
                <ShieldAlert className="w-5 h-5 text-yellow-500" />
              ) : (
                <ShieldX className="w-5 h-5 text-red-500" />
              )}
              Current Security Posture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Security Score</span>
                  <span className="font-bold text-2xl">{securityScore}%</span>
                </div>
                <Progress value={securityScore} className="h-3" />
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Active Layers: {enabledLayers.length}/7</p>
                <div className="flex flex-wrap gap-1">
                  {securityLayers.map(layer => {
                    const isEnabled = enabledLayers.includes(layer.id);
                    const colorClass = layerColors[layer.color];
                    return (
                      <Badge 
                        key={layer.id} 
                        variant={isEnabled ? "default" : "outline"}
                        className={isEnabled ? colorClass.bg : 'opacity-50'}
                      >
                        {layer.shortName}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Vulnerabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            {vulnerabilities.length === 0 ? (
              <div className="text-center py-4 text-green-500">
                <ShieldCheck className="w-12 h-12 mx-auto mb-2" />
                <p className="font-medium">Full Protection Active</p>
                <p className="text-sm text-muted-foreground">All security layers are enabled</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {vulnerabilities.slice(0, 6).map((vuln, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
                    <span className="text-muted-foreground">{vuln}</span>
                  </div>
                ))}
                {vulnerabilities.length > 6 && (
                  <p className="text-xs text-muted-foreground">
                    +{vulnerabilities.length - 6} more vulnerabilities
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Defense Effectiveness</CardTitle>
          <CardDescription>How threats are handled with current configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {threatScenarios.slice(0, 4).map(threat => {
              const blockedLayer = securityLayers.find(l => l.id === threat.blockedAtLayer);
              const isBlocked = enabledLayers.includes(threat.blockedAtLayer);
              const Icon = getIcon(threat.icon);
              
              return (
                <div 
                  key={threat.id}
                  className={`p-3 rounded-lg border ${isBlocked ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${isBlocked ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="text-sm font-medium">{threat.name}</span>
                  </div>
                  <Badge variant={isBlocked ? "default" : "destructive"} className="text-xs">
                    {isBlocked ? `Blocked at ${blockedLayer?.shortName}` : 'Not Protected'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function QuizMode({ 
  questions, 
  onComplete 
}: { 
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      onComplete(score);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="py-8 text-center">
          <Award className={`w-16 h-16 mx-auto mb-4 ${percentage >= 70 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-4xl font-bold mb-2">{score}/{questions.length}</p>
          <p className="text-muted-foreground mb-6">
            {percentage >= 90 ? "Excellent! You're a security expert!" :
             percentage >= 70 ? "Great job! You have solid security knowledge." :
             percentage >= 50 ? "Good effort! Consider reviewing the concepts." :
             "Keep learning! Security is a journey."}
          </p>
          <Progress value={percentage} className="h-3 mb-6" />
          <Button onClick={handleRestart} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const relatedLayer = question.relatedLayer ? securityLayers.find(l => l.id === question.relatedLayer) : null;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <Badge variant="outline" className={
            question.difficulty === "easy" ? "bg-green-500/10 text-green-600" :
            question.difficulty === "medium" ? "bg-yellow-500/10 text-yellow-600" :
            "bg-red-500/10 text-red-600"
          }>
            {question.difficulty}
          </Badge>
        </div>
        <Progress value={(currentQuestion / questions.length) * 100} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        
        {relatedLayer && (
          <Badge variant="secondary" className="gap-1">
            <Layers className="w-3 h-3" />
            Related: {relatedLayer.name}
          </Badge>
        )}

        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === question.correctAnswer;
            const showResult = selectedAnswer !== null;
            
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`
                  w-full p-4 rounded-lg border text-left transition-all
                  ${showResult && isCorrect 
                    ? 'bg-green-500/10 border-green-500' 
                    : showResult && isSelected && !isCorrect
                      ? 'bg-red-500/10 border-red-500'
                      : isSelected
                        ? 'bg-primary/10 border-primary'
                        : 'bg-card hover:bg-muted/50 border-border'
                  }
                  ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
                data-testid={`quiz-option-${idx}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg ${
                selectedAnswer === question.correctAnswer 
                  ? 'bg-green-500/10 border border-green-500/30' 
                  : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              <p className="text-sm font-medium mb-1">
                {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
              </p>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {showExplanation && (
          <div className="flex justify-end">
            <Button onClick={handleNext} className="gap-2">
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  See Results
                  <Award className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LayerConfigurationPanel({ 
  enabledLayers, 
  onToggleLayer 
}: { 
  enabledLayers: number[];
  onToggleLayer: (layerId: number) => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Layer Configuration
        </CardTitle>
        <CardDescription>
          Toggle layers on/off to see how it affects your security posture
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {securityLayers.map(layer => {
            const colorClass = layerColors[layer.color];
            const Icon = getIcon(layer.icon);
            const isEnabled = enabledLayers.includes(layer.id);
            
            return (
              <div 
                key={layer.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isEnabled ? `${colorClass.bg} ${colorClass.border}` : 'bg-muted/30 border-muted opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isEnabled ? colorClass.bg : 'bg-muted/50'}`}>
                    <Icon className={`w-4 h-4 ${isEnabled ? colorClass.text : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${isEnabled ? colorClass.text : 'text-muted-foreground'}`}>
                      {layer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{layer.shortName}</p>
                  </div>
                </div>
                <Switch 
                  checked={isEnabled}
                  onCheckedChange={() => onToggleLayer(layer.id)}
                  data-testid={`switch-layer-${layer.id}`}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SecurityLayerStrip({ 
  layer, 
  isActive, 
  isComplete,
  isEnabled,
  onClick
}: { 
  layer: SecurityLayer; 
  isActive: boolean; 
  isComplete: boolean;
  isEnabled: boolean;
  onClick: () => void;
}) {
  const colorClass = layerColors[layer.color] || layerColors.blue;
  const Icon = getIcon(layer.icon);

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative flex items-center gap-3 w-full p-3 rounded-lg border transition-all duration-300
        ${!isEnabled ? 'opacity-40' : ''}
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
      {isComplete && isEnabled && (
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("visualization");
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [currentLayer, setCurrentLayer] = useState(1);
  const [completedLayers, setCompletedLayers] = useState<number[]>([]);
  const [loopCount, setLoopCount] = useState(1);
  const [currentThreat, setCurrentThreat] = useState<ThreatScenario | null>(null);
  const [threatBlockedAt, setThreatBlockedAt] = useState<number | null>(null);
  const [selectedThreatScenario, setSelectedThreatScenario] = useState<ThreatScenario | null>(null);
  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);
  const [attackStep, setAttackStep] = useState(0);
  const [enabledLayers, setEnabledLayers] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [selectedLayerForDrilldown, setSelectedLayerForDrilldown] = useState<SecurityLayer | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
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
    if (activeTab !== "visualization" || !isPlaying) {
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
        let nextLayer = prev + 1;
        
        while (nextLayer <= 7 && !enabledLayers.includes(nextLayer)) {
          nextLayer++;
        }
        
        if (nextLayer > 7) {
          setLoopCount((c) => c + 1);
          setCompletedLayers([]);
          setCurrentThreat(selectRandomThreat());
          setThreatBlockedAt(null);
          const firstEnabled = enabledLayers.find(l => l >= 1) || 1;
          return firstEnabled;
        }
        
        setCompletedLayers((completed) => [...completed, prev]);
        
        if (currentThreat && currentThreat.blockedAtLayer === nextLayer && enabledLayers.includes(nextLayer)) {
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
  }, [isPlaying, speed, currentThreat, selectRandomThreat, activeTab, enabledLayers]);

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
    setCompletedLayers(securityLayers.filter(l => l.id < layerId && enabledLayers.includes(l.id)).map(l => l.id));
  };

  const handleSimulateAttack = () => {
    if (!selectedThreatScenario) return;
    setIsSimulatingAttack(true);
    setAttackStep(0);
    
    const simulateStep = (step: number) => {
      if (step >= selectedThreatScenario.attackPath.length) {
        setTimeout(() => {
          setIsSimulatingAttack(false);
          setAttackStep(0);
        }, 1500);
        return;
      }
      
      setAttackStep(step);
      setTimeout(() => simulateStep(step + 1), 1000);
    };
    
    simulateStep(0);
  };

  const handleToggleLayer = (layerId: number) => {
    setEnabledLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId].sort((a, b) => a - b)
    );
  };

  const activeLayer = securityLayers.find(l => l.id === currentLayer);

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
              {activeTab === "visualization" && currentThreat && !threatBlockedAt && (
                <Badge variant="destructive" className="gap-1.5">
                  <AlertTriangle className="w-3 h-3" />
                  {currentThreat.name} incoming
                </Badge>
              )}
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-4 md:px-6 pt-4 border-b bg-background/50 backdrop-blur-sm">
              <TabsList className="grid w-full max-w-3xl grid-cols-5">
                <TabsTrigger value="visualization" className="gap-2" data-testid="tab-visualization">
                  <Layers className="w-4 h-4" />
                  <span className="hidden sm:inline">Visualization</span>
                </TabsTrigger>
                <TabsTrigger value="threats" className="gap-2" data-testid="tab-threats">
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Threats</span>
                </TabsTrigger>
                <TabsTrigger value="drilldown" className="gap-2" data-testid="tab-drilldown">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Details</span>
                </TabsTrigger>
                <TabsTrigger value="compare" className="gap-2" data-testid="tab-compare">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Compare</span>
                </TabsTrigger>
                <TabsTrigger value="quiz" className="gap-2" data-testid="tab-quiz">
                  <Award className="w-4 h-4" />
                  <span className="hidden sm:inline">Quiz</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto p-4 md:p-6">
              <TabsContent value="visualization" className="mt-0 h-full">
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
                            isEnabled={enabledLayers.includes(layer.id)}
                            onClick={() => handleLayerClick(layer.id)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-4 min-w-0">
                    <div className="flex-1 relative rounded-xl border bg-gradient-to-b from-card/50 to-background overflow-hidden min-h-[200px]">
                      <div className="absolute inset-0 flex">
                        {securityLayers.map((layer) => {
                          const colorClass = layerColors[layer.color] || layerColors.blue;
                          const isActive = layer.id === currentLayer;
                          const isComplete = completedLayers.includes(layer.id);
                          const isEnabled = enabledLayers.includes(layer.id);
                          
                          return (
                            <div
                              key={layer.id}
                              className={`
                                relative flex-1 border-r last:border-r-0 border-border/30 
                                transition-all duration-500
                                ${!isEnabled ? 'opacity-30' : ''}
                                ${isActive ? colorClass.bg : isComplete ? 'bg-muted/20' : 'bg-transparent'}
                              `}
                              style={{ 
                                borderBottom: isActive ? `3px solid` : undefined,
                                borderBottomColor: isActive ? colorClass.glow : undefined,
                              }}
                            >
                              <div className={`
                                absolute inset-x-0 bottom-0 h-1 transition-all duration-300
                                ${isComplete && isEnabled ? 'bg-green-500/50' : 'bg-transparent'}
                              `} />
                              
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                                <motion.div
                                  animate={isActive && isEnabled ? { scale: [1, 1.1, 1] } : {}}
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
                                {isComplete && isEnabled && (
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                                )}
                                {!isEnabled && (
                                  <Badge variant="outline" className="mt-1 text-xs opacity-50">Off</Badge>
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
              </TabsContent>

              <TabsContent value="threats" className="mt-0">
                <div className="max-w-5xl mx-auto space-y-6">
                  <ThreatScenarioSelector
                    threats={threatScenarios}
                    selectedThreat={selectedThreatScenario}
                    onSelectThreat={setSelectedThreatScenario}
                    onSimulate={handleSimulateAttack}
                  />
                  
                  {selectedThreatScenario && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Attack Path Visualization</CardTitle>
                        <CardDescription>Watch how the attack progresses through security layers</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AttackPathVisualization
                          threat={selectedThreatScenario}
                          currentStep={attackStep}
                          isSimulating={isSimulatingAttack}
                        />
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <Shield className="w-4 h-4 text-green-500" />
                              Detection Method
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedThreatScenario.detectionMethod}
                            </p>
                          </div>
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                              <History className="w-4 h-4 text-amber-500" />
                              Real-World Example
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedThreatScenario.realWorldExample}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="drilldown" className="mt-0">
                <div className="max-w-5xl mx-auto">
                  <Card className="mb-6">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Select a Layer to Explore</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                        {securityLayers.map(layer => {
                          const colorClass = layerColors[layer.color];
                          const Icon = getIcon(layer.icon);
                          const isSelected = selectedLayerForDrilldown?.id === layer.id;
                          
                          return (
                            <button
                              key={layer.id}
                              onClick={() => setSelectedLayerForDrilldown(layer)}
                              className={`
                                p-3 rounded-lg border transition-all text-center
                                ${isSelected 
                                  ? `${colorClass.bg} ${colorClass.border} ring-2 ring-offset-2` 
                                  : 'bg-card hover:bg-muted/50 border-border'
                                }
                              `}
                              data-testid={`drilldown-layer-${layer.id}`}
                            >
                              <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? colorClass.text : 'text-muted-foreground'}`} />
                              <p className={`text-xs font-medium ${isSelected ? colorClass.text : 'text-foreground'}`}>
                                {layer.shortName}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {selectedLayerForDrilldown ? (
                    <LayerDrillDown layer={selectedLayerForDrilldown} />
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a security layer above to view detailed information</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="compare" className="mt-0">
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <LayerConfigurationPanel
                        enabledLayers={enabledLayers}
                        onToggleLayer={handleToggleLayer}
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <ComparisonMode enabledLayers={enabledLayers} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="quiz" className="mt-0">
                <div className="max-w-3xl mx-auto py-4">
                  <QuizMode 
                    questions={quizQuestions} 
                    onComplete={(score) => setQuizScore(score)} 
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </main>

        {activeTab === "visualization" && (
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
        )}
      </div>
    </div>
  );
}
