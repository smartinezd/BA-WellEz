import { 
  users, 
  epics, 
  stories, 
  okrs, 
  summaries, 
  changeLogs, 
  traceability, 
  sprintMetrics, 
  riskMetrics,
  type User, 
  type InsertUser,
  type Epic,
  type InsertEpic,
  type Story,
  type InsertStory,
  type Okr,
  type InsertOkr,
  type Summary,
  type InsertSummary,
  type ChangeLog,
  type InsertChangeLog,
  type Traceability,
  type InsertTraceability,
  type SprintMetrics,
  type InsertSprintMetrics,
  type RiskMetrics,
  type InsertRiskMetrics
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dashboard data methods
  getEpics(): Promise<Epic[]>;
  getStories(): Promise<Story[]>;
  getOkrs(): Promise<Okr[]>;
  getSummaries(): Promise<Summary[]>;
  getChangeLogs(): Promise<ChangeLog[]>;
  getTraceability(): Promise<Traceability[]>;
  getSprintMetrics(): Promise<SprintMetrics[]>;
  getRiskMetrics(): Promise<RiskMetrics[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private epics: Map<number, Epic>;
  private stories: Map<number, Story>;
  private okrs: Map<number, Okr>;
  private summaries: Map<number, Summary>;
  private changeLogs: Map<number, ChangeLog>;
  private traceabilityMap: Map<number, Traceability>;
  private sprintMetrics: Map<number, SprintMetrics>;
  private riskMetrics: Map<number, RiskMetrics>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.epics = new Map();
    this.stories = new Map();
    this.okrs = new Map();
    this.summaries = new Map();
    this.changeLogs = new Map();
    this.traceabilityMap = new Map();
    this.sprintMetrics = new Map();
    this.riskMetrics = new Map();
    this.currentId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed Epics
    const epicData = [
      { name: "User Authentication Redesign", epicId: "EPIC-001", completion: 78, testCoverage: 65, riskScore: 2.1, status: "On Track" },
      { name: "Payment Gateway Integration", epicId: "EPIC-005", completion: 45, testCoverage: 23, riskScore: 8.2, status: "At Risk" },
      { name: "Mobile App MVP", epicId: "EPIC-012", completion: 58, testCoverage: 67, riskScore: 5.8, status: "Behind" },
    ];

    epicData.forEach(epic => {
      const id = this.currentId++;
      this.epics.set(id, { ...epic, id });
    });

    // Seed OKRs
    const okrData = [
      { title: "Improve Customer Satisfaction", description: "Increase NPS score to 8.5+", progress: 85, quarter: "Q1 2024", storiesAligned: 12 },
      { title: "Reduce Processing Time", description: "Cut workflow time by 30%", progress: 92, quarter: "Q1 2024", storiesAligned: 8 },
      { title: "Expand Market Reach", description: "Enter 3 new markets", progress: 42, quarter: "Q1 2024", storiesAligned: 15 },
    ];

    okrData.forEach(okr => {
      const id = this.currentId++;
      this.okrs.set(id, { ...okr, id });
    });

    // Seed Summaries
    const summaryData = [
      { storyId: "US-2847", description: "Payment processing blocked due to API changes. Requires immediate attention.", severity: "Critical", nextStep: "Contact vendor support", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { storyId: "US-2901", description: "UI/UX review pending for 3 days. Design team bandwidth constraint identified.", severity: "Attention", nextStep: "Escalate to design lead", createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      { storyId: "US-2789", description: "Database migration completed successfully. Performance metrics improved by 23%.", severity: "Info", nextStep: "Update documentation", createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) },
      { storyId: "US-2756", description: "Authentication module deployed to production. All tests passing.", severity: "Success", nextStep: "Monitor metrics", createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) },
    ];

    summaryData.forEach(summary => {
      const id = this.currentId++;
      this.summaries.set(id, { ...summary, id });
    });

    // Seed Change Logs
    const changeLogData = [
      { 
        title: 'Story US-2934 created in Epic-005 "Payment Gateway Integration"', 
        description: "Added new story for implementing PayPal integration with error handling and retry logic.", 
        author: "Mike Chen", 
        type: "Story Creation", 
        impact: "High",
        createdAt: new Date(Date.now() - 2 * 60 * 1000)
      },
      { 
        title: "Sprint 23 rescoped - 3 stories moved to Sprint 24", 
        description: "Moved US-2889, US-2891, and US-2893 due to capacity constraints and dependency issues.", 
        author: "Lisa Park", 
        type: "Sprint Planning", 
        impact: "Medium",
        createdAt: new Date(Date.now() - 15 * 60 * 1000)
      },
      { 
        title: "Ownership transfer: Epic-012 reassigned to Team Bravo", 
        description: "Mobile App MVP Epic transferred from Team Alpha to Team Bravo due to expertise alignment.", 
        author: "David Kim", 
        type: "Ownership Transfer", 
        impact: "High",
        createdAt: new Date(Date.now() - 32 * 60 * 1000)
      },
    ];

    changeLogData.forEach(log => {
      const id = this.currentId++;
      this.changeLogs.set(id, { ...log, id });
    });

    // Seed Traceability
    const traceabilityData = [
      {
        storyId: "US-2847",
        commits: 7,
        tests: 12,
        deployment: "v2.1.3",
        unitTests: "8/8 ✓",
        integrationTests: "3/3 ✓",
        e2eTests: "1 Pending",
        stagingStatus: "✓ Deployed",
        productionStatus: "Scheduled"
      }
    ];

    traceabilityData.forEach(trace => {
      const id = this.currentId++;
      this.traceabilityMap.set(id, { ...trace, id });
    });

    // Seed Sprint Metrics
    const sprintData = [
      {
        sprintNumber: 23,
        successProbability: 78,
        plannedPoints: 89,
        estimatedCompletion: 82,
        velocity: 76
      }
    ];

    sprintData.forEach(sprint => {
      const id = this.currentId++;
      this.sprintMetrics.set(id, { ...sprint, id });
    });

    // Seed Risk Metrics
    const riskData = [
      {
        riskScore: 6.8,
        blockersCount: 7,
        delaysCount: 12,
        missingDataCount: 5,
        recommendation: "Address critical blockers in Epic-005 and Epic-012 to reduce risk score."
      }
    ];

    riskData.forEach(risk => {
      const id = this.currentId++;
      this.riskMetrics.set(id, { ...risk, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getEpics(): Promise<Epic[]> {
    return Array.from(this.epics.values());
  }

  async getStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }

  async getOkrs(): Promise<Okr[]> {
    return Array.from(this.okrs.values());
  }

  async getSummaries(): Promise<Summary[]> {
    return Array.from(this.summaries.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getChangeLogs(): Promise<ChangeLog[]> {
    return Array.from(this.changeLogs.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getTraceability(): Promise<Traceability[]> {
    return Array.from(this.traceabilityMap.values());
  }

  async getSprintMetrics(): Promise<SprintMetrics[]> {
    return Array.from(this.sprintMetrics.values());
  }

  async getRiskMetrics(): Promise<RiskMetrics[]> {
    return Array.from(this.riskMetrics.values());
  }
}

export const storage = new MemStorage();
