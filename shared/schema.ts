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
  type: "malware" | "intrusion" | "data_theft" | "ddos" | "phishing";
  blockedAtLayer: number;
  description: string;
}

export interface AnimationState {
  isPlaying: boolean;
  speed: number;
  currentLayer: number;
  progress: number;
  showThreat: boolean;
  threatType: string | null;
}

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
    description: "Distributed denial of service attack blocked at Network Security layer"
  },
  {
    id: 2,
    name: "Phishing Email",
    type: "phishing",
    blockedAtLayer: 3,
    description: "Malicious email blocked by email gateway at Perimeter Security"
  },
  {
    id: 3,
    name: "Malware Infection",
    type: "malware",
    blockedAtLayer: 5,
    description: "Malicious software detected and quarantined by EDR at Host Security"
  },
  {
    id: 4,
    name: "SQL Injection",
    type: "intrusion",
    blockedAtLayer: 6,
    description: "Database attack prevented by WAF at Application Security layer"
  },
  {
    id: 5,
    name: "Data Exfiltration",
    type: "data_theft",
    blockedAtLayer: 7,
    description: "Unauthorized data transfer blocked by DLP at Data Security layer"
  }
];
