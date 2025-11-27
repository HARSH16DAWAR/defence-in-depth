import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Security Layer Types
export interface SecurityLayer {
  id: number;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  role: string;
  protectionMechanisms: string[];
  threats: string[];
}

export interface ThreatScenario {
  id: number;
  name: string;
  type: "malware" | "intrusion" | "data_theft" | "ddos" | "phishing" | "ransomware" | "insider" | "apt";
  blockedAtLayer: number;
  description: string;
  attackPath: number[];
  severity: "low" | "medium" | "high" | "critical";
  detectionMethod: string;
  realWorldExample: string;
  icon: string;
}

export interface AnimationState {
  isPlaying: boolean;
  speed: number;
  currentLayer: number;
  progress: number;
  showThreat: boolean;
  threatType: string | null;
}

export interface LayerDetails {
  id: number;
  realWorldExamples: {
    name: string;
    description: string;
    year: number;
    impact: string;
  }[];
  bestPractices: string[];
  tools: {
    name: string;
    category: string;
    description: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  relatedLayer: number | null;
  difficulty: "easy" | "medium" | "hard";
}

export const layerDetails: LayerDetails[] = [
  {
    id: 1,
    realWorldExamples: [
      { name: "Google Data Center Security", description: "Multi-layer physical security with biometrics, 24/7 guards, and laser beam intrusion detection", year: 2023, impact: "Industry gold standard" },
      { name: "Target Breach Entry Point", description: "HVAC contractor credentials used for initial access due to weak physical access controls", year: 2013, impact: "40 million credit cards stolen" }
    ],
    bestPractices: [
      "Implement multi-factor physical authentication",
      "Use mantrap entries for sensitive areas",
      "Deploy 24/7 video surveillance with AI analytics",
      "Conduct regular physical security audits"
    ],
    tools: [
      { name: "HID Global", category: "Access Control", description: "Enterprise badge and biometric systems" },
      { name: "Verkada", category: "Surveillance", description: "AI-powered security cameras" },
      { name: "Genetec", category: "Security Management", description: "Unified security platform" }
    ]
  },
  {
    id: 2,
    realWorldExamples: [
      { name: "GitHub DDoS Mitigation", description: "Largest DDoS attack (1.35 Tbps) successfully mitigated through network security measures", year: 2018, impact: "Only 10 minutes of downtime" },
      { name: "WannaCry Spread", description: "Ransomware spread through networks lacking proper segmentation", year: 2017, impact: "200,000+ computers infected" }
    ],
    bestPractices: [
      "Segment networks based on security zones",
      "Deploy IDS/IPS at network boundaries",
      "Implement network access control (NAC)",
      "Monitor all network traffic for anomalies"
    ],
    tools: [
      { name: "Cisco ISE", category: "NAC", description: "Network access control solution" },
      { name: "Snort", category: "IDS/IPS", description: "Open-source intrusion detection" },
      { name: "Darktrace", category: "AI Security", description: "AI-powered network monitoring" }
    ]
  },
  {
    id: 3,
    realWorldExamples: [
      { name: "JPMorgan Firewall", description: "Advanced firewall rules blocked attempted intrusions from nation-state actors", year: 2019, impact: "Prevented data breach" },
      { name: "Capital One Breach", description: "Misconfigured WAF allowed attacker to exploit SSRF vulnerability", year: 2019, impact: "100 million records exposed" }
    ],
    bestPractices: [
      "Use next-generation firewalls with deep packet inspection",
      "Implement strict DMZ policies",
      "Deploy email security gateways",
      "Regular firewall rule audits and cleanup"
    ],
    tools: [
      { name: "Palo Alto Networks", category: "NGFW", description: "Next-generation firewall" },
      { name: "Proofpoint", category: "Email Security", description: "Advanced email protection" },
      { name: "Zscaler", category: "Cloud Security", description: "Cloud-native security platform" }
    ]
  },
  {
    id: 4,
    realWorldExamples: [
      { name: "SolarWinds Attack", description: "APT moved laterally after initial compromise due to flat network design", year: 2020, impact: "18,000+ organizations affected" },
      { name: "Google BeyondCorp", description: "Zero Trust architecture eliminated perimeter-based security", year: 2014, impact: "Model for modern security" }
    ],
    bestPractices: [
      "Implement Zero Trust architecture",
      "Use micro-segmentation for workloads",
      "Deploy privileged access management (PAM)",
      "Monitor east-west traffic patterns"
    ],
    tools: [
      { name: "CyberArk", category: "PAM", description: "Privileged access management" },
      { name: "Illumio", category: "Micro-segmentation", description: "Zero Trust segmentation" },
      { name: "Okta", category: "Identity", description: "Identity and access management" }
    ]
  },
  {
    id: 5,
    realWorldExamples: [
      { name: "Colonial Pipeline", description: "EDR detected ransomware but response was too slow", year: 2021, impact: "$4.4M ransom paid" },
      { name: "Microsoft Defender", description: "Blocked Emotet malware across enterprise endpoints", year: 2021, impact: "Millions of endpoints protected" }
    ],
    bestPractices: [
      "Deploy EDR on all endpoints",
      "Implement automated patch management",
      "Use application whitelisting",
      "Enable host-based firewalls"
    ],
    tools: [
      { name: "CrowdStrike Falcon", category: "EDR", description: "Cloud-native endpoint protection" },
      { name: "Microsoft Defender ATP", category: "EDR", description: "Enterprise endpoint security" },
      { name: "Tanium", category: "Endpoint Management", description: "Real-time endpoint visibility" }
    ]
  },
  {
    id: 6,
    realWorldExamples: [
      { name: "Equifax Breach", description: "Unpatched Apache Struts vulnerability exploited", year: 2017, impact: "147 million records exposed" },
      { name: "Log4Shell Response", description: "WAFs quickly updated to block Log4j exploitation attempts", year: 2021, impact: "Millions of attacks blocked" }
    ],
    bestPractices: [
      "Implement secure SDLC practices",
      "Deploy WAF for web applications",
      "Regular security code reviews",
      "API security and rate limiting"
    ],
    tools: [
      { name: "Cloudflare WAF", category: "WAF", description: "Web application firewall" },
      { name: "Snyk", category: "SAST/SCA", description: "Developer security platform" },
      { name: "Burp Suite", category: "DAST", description: "Web security testing" }
    ]
  },
  {
    id: 7,
    realWorldExamples: [
      { name: "Apple iCloud Encryption", description: "End-to-end encryption protects user data", year: 2022, impact: "Billions of users protected" },
      { name: "Marriott Breach", description: "Unencrypted passport data stolen", year: 2018, impact: "500 million guests affected" }
    ],
    bestPractices: [
      "Encrypt data at rest and in transit",
      "Implement data classification",
      "Deploy DLP solutions",
      "Regular backup and recovery testing"
    ],
    tools: [
      { name: "Symantec DLP", category: "DLP", description: "Data loss prevention" },
      { name: "Varonis", category: "Data Security", description: "Data security platform" },
      { name: "HashiCorp Vault", category: "Secrets", description: "Secrets management" }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary purpose of Defense in Depth?",
    options: [
      "To have a single, very strong security control",
      "To create multiple layers of security that protect each other",
      "To reduce security costs",
      "To comply with regulations only"
    ],
    correctAnswer: 1,
    explanation: "Defense in Depth uses multiple layers of security controls so that if one layer fails, others are still in place to protect assets.",
    relatedLayer: null,
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which layer is responsible for protecting against DDoS attacks?",
    options: [
      "Physical Security",
      "Network Security",
      "Application Security",
      "Data Security"
    ],
    correctAnswer: 1,
    explanation: "Network Security uses IDS/IPS and traffic analysis to detect and mitigate DDoS attacks before they overwhelm systems.",
    relatedLayer: 2,
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What does Zero Trust architecture assume?",
    options: [
      "The internal network is always safe",
      "Users inside the network can be trusted",
      "Never trust, always verify - regardless of location",
      "Firewalls are sufficient for security"
    ],
    correctAnswer: 2,
    explanation: "Zero Trust assumes no implicit trust based on network location. Every access request must be verified regardless of where it originates.",
    relatedLayer: 4,
    difficulty: "medium"
  },
  {
    id: 4,
    question: "What is the role of a WAF (Web Application Firewall)?",
    options: [
      "Protecting physical servers",
      "Encrypting data at rest",
      "Filtering malicious web traffic and blocking application-layer attacks",
      "Managing user passwords"
    ],
    correctAnswer: 2,
    explanation: "A WAF inspects HTTP traffic and blocks attacks like SQL injection, XSS, and other application-layer threats.",
    relatedLayer: 6,
    difficulty: "medium"
  },
  {
    id: 5,
    question: "Which security control prevents unauthorized data from leaving the organization?",
    options: [
      "IDS/IPS",
      "Firewall",
      "Data Loss Prevention (DLP)",
      "Antivirus"
    ],
    correctAnswer: 2,
    explanation: "DLP solutions monitor and control data transfers to prevent sensitive information from being exfiltrated.",
    relatedLayer: 7,
    difficulty: "easy"
  },
  {
    id: 6,
    question: "What makes APT (Advanced Persistent Threat) attacks particularly dangerous?",
    options: [
      "They are very fast",
      "They use simple techniques",
      "They are long-term, stealthy, and highly targeted",
      "They only target small businesses"
    ],
    correctAnswer: 2,
    explanation: "APTs are sophisticated attacks that maintain persistent access over long periods, often sponsored by nation-states targeting high-value assets.",
    relatedLayer: 5,
    difficulty: "hard"
  },
  {
    id: 7,
    question: "Why is network segmentation important?",
    options: [
      "It makes the network faster",
      "It limits lateral movement if an attacker gains access",
      "It reduces hardware costs",
      "It eliminates the need for firewalls"
    ],
    correctAnswer: 1,
    explanation: "Network segmentation contains breaches by preventing attackers from moving freely between network zones if they compromise one area.",
    relatedLayer: 2,
    difficulty: "medium"
  },
  {
    id: 8,
    question: "What is the primary function of EDR (Endpoint Detection and Response)?",
    options: [
      "Email filtering",
      "Network monitoring",
      "Detecting and responding to threats on individual devices",
      "Database encryption"
    ],
    correctAnswer: 2,
    explanation: "EDR continuously monitors endpoints for suspicious behavior, provides threat detection, and enables rapid incident response.",
    relatedLayer: 5,
    difficulty: "easy"
  },
  {
    id: 9,
    question: "In a ransomware attack, which layer typically provides the last line of defense?",
    options: [
      "Network Security",
      "Perimeter Security",
      "Host Security with EDR and backups",
      "Physical Security"
    ],
    correctAnswer: 2,
    explanation: "Host Security with EDR can detect ransomware behavior, and proper backups (part of Data Security) allow recovery without paying ransom.",
    relatedLayer: 5,
    difficulty: "medium"
  },
  {
    id: 10,
    question: "What is the concept of 'least privilege' in security?",
    options: [
      "Giving users the minimum access needed to do their job",
      "Providing maximum access to trusted users",
      "Removing all user permissions",
      "Sharing passwords among team members"
    ],
    correctAnswer: 0,
    explanation: "Least privilege limits access rights to the minimum necessary, reducing the attack surface and potential damage from compromised accounts.",
    relatedLayer: 4,
    difficulty: "easy"
  }
];

// Defense in Depth Layer Data
export const securityLayers: SecurityLayer[] = [
  {
    id: 1,
    name: "Physical Security",
    shortName: "Physical",
    icon: "Building2",
    color: "emerald",
    description: "The outermost layer protecting physical access to infrastructure",
    role: "Prevents unauthorized physical access to facilities, hardware, and network equipment",
    protectionMechanisms: [
      "Access control systems (badges, biometrics)",
      "Security guards and surveillance cameras",
      "Locked server rooms and data centers",
      "Environmental controls (fire suppression, climate)"
    ],
    threats: ["Physical intrusion", "Hardware theft", "Tailgating"]
  },
  {
    id: 2,
    name: "Network Security",
    shortName: "Network",
    icon: "Network",
    color: "blue",
    description: "Controls and monitors network traffic at the infrastructure level",
    role: "Filters malicious traffic and prevents network-based attacks before they reach internal systems",
    protectionMechanisms: [
      "Network segmentation and VLANs",
      "Network Access Control (NAC)",
      "Intrusion Detection/Prevention Systems (IDS/IPS)",
      "Traffic analysis and monitoring"
    ],
    threats: ["DDoS attacks", "Man-in-the-middle", "Network scanning"]
  },
  {
    id: 3,
    name: "Perimeter Security",
    shortName: "Perimeter",
    icon: "Shield",
    color: "violet",
    description: "The boundary between trusted internal networks and untrusted external networks",
    role: "Acts as the first line of defense, filtering traffic entering and leaving the network",
    protectionMechanisms: [
      "Firewalls (stateful and next-gen)",
      "DMZ (Demilitarized Zone)",
      "VPN gateways for secure remote access",
      "Email and web gateways"
    ],
    threats: ["External attacks", "Unauthorized access attempts", "Malicious payloads"]
  },
  {
    id: 4,
    name: "Internal Network Security",
    shortName: "Internal",
    icon: "GitBranch",
    color: "amber",
    description: "Security controls within the internal network infrastructure",
    role: "Monitors and controls traffic between internal network segments to prevent lateral movement",
    protectionMechanisms: [
      "Internal firewalls and micro-segmentation",
      "Zero Trust Network Architecture",
      "Secure DNS and network monitoring",
      "Privileged Access Management (PAM)"
    ],
    threats: ["Insider threats", "Lateral movement", "Privilege escalation"]
  },
  {
    id: 5,
    name: "Host Security",
    shortName: "Host",
    icon: "Server",
    color: "rose",
    description: "Security measures implemented on individual devices and servers",
    role: "Protects endpoints and servers from malware, unauthorized access, and configuration vulnerabilities",
    protectionMechanisms: [
      "Endpoint Detection and Response (EDR)",
      "Host-based firewalls and antivirus",
      "Patch management and hardening",
      "Device encryption and secure boot"
    ],
    threats: ["Malware", "Ransomware", "Unpatched vulnerabilities"]
  },
  {
    id: 6,
    name: "Application Security",
    shortName: "Application",
    icon: "Code",
    color: "cyan",
    description: "Security built into software applications and services",
    role: "Ensures applications are designed, developed, and deployed securely to prevent exploitation",
    protectionMechanisms: [
      "Secure coding practices and code review",
      "Web Application Firewalls (WAF)",
      "API security and rate limiting",
      "Runtime application self-protection (RASP)"
    ],
    threats: ["SQL injection", "XSS attacks", "API abuse", "Code vulnerabilities"]
  },
  {
    id: 7,
    name: "Data Security",
    shortName: "Data",
    icon: "Database",
    color: "indigo",
    description: "The innermost layer protecting the organization's most valuable asset - data",
    role: "Ensures data confidentiality, integrity, and availability through encryption and access controls",
    protectionMechanisms: [
      "Encryption at rest and in transit",
      "Data Loss Prevention (DLP)",
      "Access control and data classification",
      "Backup and disaster recovery"
    ],
    threats: ["Data breaches", "Data exfiltration", "Unauthorized access"]
  }
];

export const threatScenarios: ThreatScenario[] = [
  {
    id: 1,
    name: "DDoS Attack",
    type: "ddos",
    blockedAtLayer: 2,
    description: "Distributed denial of service attack attempting to overwhelm network resources with massive traffic volume",
    attackPath: [1, 2],
    severity: "high",
    detectionMethod: "Traffic analysis detects abnormal volume patterns; IDS/IPS identifies attack signatures",
    realWorldExample: "2016 Dyn DNS Attack - Mirai botnet disrupted major websites including Twitter and Netflix",
    icon: "Zap"
  },
  {
    id: 2,
    name: "Phishing Campaign",
    type: "phishing",
    blockedAtLayer: 3,
    description: "Sophisticated email attack using social engineering to trick users into revealing credentials or downloading malware",
    attackPath: [1, 2, 3],
    severity: "high",
    detectionMethod: "Email gateway scans for malicious links, attachments, and known phishing patterns",
    realWorldExample: "2020 Twitter Hack - Social engineering led to compromise of high-profile accounts",
    icon: "Mail"
  },
  {
    id: 3,
    name: "Ransomware Attack",
    type: "ransomware",
    blockedAtLayer: 5,
    description: "Malicious software that encrypts files and demands payment for decryption keys",
    attackPath: [1, 2, 3, 4, 5],
    severity: "critical",
    detectionMethod: "EDR detects suspicious file encryption behavior; antivirus identifies known ransomware signatures",
    realWorldExample: "2021 Colonial Pipeline - REvil ransomware caused major fuel supply disruption",
    icon: "Lock"
  },
  {
    id: 4,
    name: "SQL Injection",
    type: "intrusion",
    blockedAtLayer: 6,
    description: "Attacker injects malicious SQL code through application inputs to access or manipulate database",
    attackPath: [1, 2, 3, 4, 5, 6],
    severity: "critical",
    detectionMethod: "WAF detects SQL injection patterns; input validation blocks malicious queries",
    realWorldExample: "2017 Equifax Breach - SQL injection exposed 147 million customer records",
    icon: "Code"
  },
  {
    id: 5,
    name: "Data Exfiltration",
    type: "data_theft",
    blockedAtLayer: 7,
    description: "Attempt to transfer sensitive data outside the organization without authorization",
    attackPath: [1, 2, 3, 4, 5, 6, 7],
    severity: "critical",
    detectionMethod: "DLP monitors data transfers; access controls detect unauthorized data access patterns",
    realWorldExample: "2014 Sony Pictures Hack - Massive data theft including unreleased films and emails",
    icon: "FileWarning"
  },
  {
    id: 6,
    name: "Insider Threat",
    type: "insider",
    blockedAtLayer: 4,
    description: "Malicious insider with valid credentials attempting to access unauthorized resources or exfiltrate data",
    attackPath: [4],
    severity: "high",
    detectionMethod: "PAM monitors privileged access; Zero Trust verifies every access request",
    realWorldExample: "2013 Edward Snowden - Insider accessed and leaked classified NSA documents",
    icon: "UserX"
  },
  {
    id: 7,
    name: "Advanced Persistent Threat",
    type: "apt",
    blockedAtLayer: 5,
    description: "Sophisticated, long-term attack by nation-state or organized group targeting high-value assets",
    attackPath: [1, 2, 3, 4, 5],
    severity: "critical",
    detectionMethod: "EDR behavioral analysis; threat intelligence correlation identifies APT tactics",
    realWorldExample: "2020 SolarWinds Attack - Russian APT compromised thousands of organizations",
    icon: "Skull"
  },
  {
    id: 8,
    name: "Zero-Day Exploit",
    type: "malware",
    blockedAtLayer: 6,
    description: "Attack exploiting previously unknown vulnerability before patches are available",
    attackPath: [1, 2, 3, 4, 5, 6],
    severity: "critical",
    detectionMethod: "RASP detects anomalous application behavior; sandboxing isolates suspicious code",
    realWorldExample: "2021 Log4Shell - Critical Java vulnerability exploited worldwide within hours of disclosure",
    icon: "Bug"
  }
];
