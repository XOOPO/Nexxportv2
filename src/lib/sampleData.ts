// Stock Mail
export interface StockMail {
  id: number;
  email: string;
  password: string;
  device: string;
  status: string;
  handler: string;
  assign: string;
}

export const sampleStockMails: StockMail[] = [];

// Bank Account Details
export interface BankAccount {
  id: number;
  bankName: string;
  status: string;
  accountHolderName: string;
  bankAccountNumber: string;
  email: string;
  emailPassword: string;
  bankPassword: string;
  device: string;
}

export const sampleBankAccounts: BankAccount[] = [];

// Bank Issues
export interface BankIssue {
  id: number;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  issue: string;
  lastBalance: string;
  status: string;
  handler: string;
  dateReported: string;
}

export const sampleBankIssues: BankIssue[] = [];

// C Operation
export interface COperation {
  id: number;
  bank: string;
  device: string;
  typeBank: string;
  agent: string;
  status: string;
}

export const sampleCOperations: COperation[] = [];

// Transaction Summary
export interface Transaction {
  id: number;
  date: string;
  bankName: string;
  line: string;
  inCount: number;
  outCount: number;
  inAmount: number;
  outAmount: number;
}

export const sampleTransactions: Transaction[] = [];

// Agent Listing
export interface Agent {
  id: number;
  agentName: string;
  agentId?: string;
  joinDate: string;
  totalCommission: number;
  totalBank: number;
  totalDownline: number;
  agentContact?: string;
}

export const sampleAgents: Agent[] = [];

// Downline
export interface Downline {
  id: number;
  agentId: number;
  nameDownline: string;
  joinDate: string;
  commission: number;
  bank: string;
  downlineContact: string;
  address: string;
}

export const sampleDownlines: Downline[] = [];

// Daily Report
export interface DailyReport {
  id: number;
  staffName: string;
  note: string;
  date: string;
}

export const sampleDailyReports: DailyReport[] = [];

// Wealth+
export interface WealthListing {
  id: number;
  ownerCode: string;
  bankName: string;
  accountHolderName: string;
  ownerContact: string;
  agentContact: string;
  rentAmount: number;
  commission: number;
  salesCommission: number;
  paymentMethod: string;
  paymentDate: string;
  client: string;
  sellingPrice: number;
  contractStart: string;
  contractEnd: string;
  contractMonth: number;
  accountStatus: string;
}

export const sampleWealthListings: WealthListing[] = [];

// Last In Out
export interface LastInOut {
  id: number;
  dateIssued: string;
  bankName: string;
  bankAccountHolderName: string;
  bankAccountNumber: string;
  bankBalance: string;
  issues: string;
  lastIn1Time: string;
  lastIn1Name: string;
  lastIn1Amount: string;
  lastIn2Time: string;
  lastIn2Name: string;
  lastIn2Amount: string;
}

export const sampleLastInOuts: LastInOut[] = [];

// Bank Issue Follow Up
export interface BankIssueFollowUp {
  id: number;
  date: string;
  time: string;
  bankName: string;
  bankAccountHolderName: string;
  bankAccountNumber: string;
  device: string;
  operator: string;
  transferOutBalance: string;
  attachment: string;
}

export const sampleBankIssueFollowUps: BankIssueFollowUp[] = [];