import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  StockMail,
  BankAccount,
  BankIssue,
  COperation,
  Transaction,
  Agent,
  Downline,
  DailyReport,
  WealthListing,
  LastInOut,
  BankIssueFollowUp
} from '@/lib/sampleData';

interface DataContextType {
  // Stock Mail
  stockMails: StockMail[];
  setStockMails: (mails: StockMail[] | ((prev: StockMail[]) => StockMail[])) => void;
  
  // Bank Accounts
  bankAccounts: BankAccount[];
  setBankAccounts: (accounts: BankAccount[] | ((prev: BankAccount[]) => BankAccount[])) => void;
  
  // Bank Issues
  bankIssues: BankIssue[];
  setBankIssues: (issues: BankIssue[] | ((prev: BankIssue[]) => BankIssue[])) => void;
  
  // C Operations
  cOperations: COperation[];
  setCOperations: (operations: COperation[] | ((prev: COperation[]) => COperation[])) => void;
  
  // Transactions
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[] | ((prev: Transaction[]) => Transaction[])) => void;
  
  // Agents
  agents: Agent[];
  setAgents: (agents: Agent[] | ((prev: Agent[]) => Agent[])) => void;
  
  // Downlines
  downlines: Downline[];
  setDownlines: (downlines: Downline[] | ((prev: Downline[]) => Downline[])) => void;
  
  // Daily Reports
  dailyReports: DailyReport[];
  setDailyReports: (reports: DailyReport[] | ((prev: DailyReport[]) => DailyReport[])) => void;
  
  // Wealth Listings
  wealthListings: WealthListing[];
  setWealthListings: (listings: WealthListing[] | ((prev: WealthListing[]) => WealthListing[])) => void;
  
  // Last In Out
  lastInOuts: LastInOut[];
  setLastInOuts: (records: LastInOut[] | ((prev: LastInOut[]) => LastInOut[])) => void;
  
  // Bank Issue Follow Ups
  bankIssueFollowUps: BankIssueFollowUp[];
  setBankIssueFollowUps: (followUps: BankIssueFollowUp[] | ((prev: BankIssueFollowUp[]) => BankIssueFollowUp[])) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STOCK_MAILS: 'nexxport_stock_mails',
  BANK_ACCOUNTS: 'nexxport_bank_accounts',
  BANK_ISSUES: 'nexxport_bank_issues',
  C_OPERATIONS: 'nexxport_c_operations',
  TRANSACTIONS: 'nexxport_transactions',
  AGENTS: 'nexxport_agents',
  DOWNLINES: 'nexxport_downlines',
  DAILY_REPORTS: 'nexxport_daily_reports',
  WEALTH_LISTINGS: 'nexxport_wealth_listings',
  LAST_IN_OUTS: 'nexxport_last_in_outs',
  BANK_ISSUE_FOLLOW_UPS: 'nexxport_bank_issue_follow_ups',
};

function loadFromStorage<T>(key: string, defaultValue: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('data-updated', { detail: { key } }));
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [stockMails, setStockMailsState] = useState<StockMail[]>(() => 
    loadFromStorage(STORAGE_KEYS.STOCK_MAILS, [])
  );
  const [bankAccounts, setBankAccountsState] = useState<BankAccount[]>(() => 
    loadFromStorage(STORAGE_KEYS.BANK_ACCOUNTS, [])
  );
  const [bankIssues, setBankIssuesState] = useState<BankIssue[]>(() => 
    loadFromStorage(STORAGE_KEYS.BANK_ISSUES, [])
  );
  const [cOperations, setCOperationsState] = useState<COperation[]>(() => 
    loadFromStorage(STORAGE_KEYS.C_OPERATIONS, [])
  );
  const [transactions, setTransactionsState] = useState<Transaction[]>(() => 
    loadFromStorage(STORAGE_KEYS.TRANSACTIONS, [])
  );
  const [agents, setAgentsState] = useState<Agent[]>(() => 
    loadFromStorage(STORAGE_KEYS.AGENTS, [])
  );
  const [downlines, setDownlinesState] = useState<Downline[]>(() => 
    loadFromStorage(STORAGE_KEYS.DOWNLINES, [])
  );
  const [dailyReports, setDailyReportsState] = useState<DailyReport[]>(() => 
    loadFromStorage(STORAGE_KEYS.DAILY_REPORTS, [])
  );
  const [wealthListings, setWealthListingsState] = useState<WealthListing[]>(() => 
    loadFromStorage(STORAGE_KEYS.WEALTH_LISTINGS, [])
  );
  const [lastInOuts, setLastInOutsState] = useState<LastInOut[]>(() => 
    loadFromStorage(STORAGE_KEYS.LAST_IN_OUTS, [])
  );
  const [bankIssueFollowUps, setBankIssueFollowUpsState] = useState<BankIssueFollowUp[]>(() => 
    loadFromStorage(STORAGE_KEYS.BANK_ISSUE_FOLLOW_UPS, [])
  );

  // Wrapper functions that save to storage
  const setStockMails = (value: StockMail[] | ((prev: StockMail[]) => StockMail[])) => {
    setStockMailsState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.STOCK_MAILS, newValue);
      return newValue;
    });
  };

  const setBankAccounts = (value: BankAccount[] | ((prev: BankAccount[]) => BankAccount[])) => {
    setBankAccountsState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.BANK_ACCOUNTS, newValue);
      return newValue;
    });
  };

  const setBankIssues = (value: BankIssue[] | ((prev: BankIssue[]) => BankIssue[])) => {
    setBankIssuesState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.BANK_ISSUES, newValue);
      return newValue;
    });
  };

  const setCOperations = (value: COperation[] | ((prev: COperation[]) => COperation[])) => {
    setCOperationsState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.C_OPERATIONS, newValue);
      return newValue;
    });
  };

  const setTransactions = (value: Transaction[] | ((prev: Transaction[]) => Transaction[])) => {
    setTransactionsState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.TRANSACTIONS, newValue);
      return newValue;
    });
  };

  const setAgents = (value: Agent[] | ((prev: Agent[]) => Agent[])) => {
    setAgentsState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.AGENTS, newValue);
      return newValue;
    });
  };

  const setDownlines = (value: Downline[] | ((prev: Downline[]) => Downline[])) => {
    setDownlinesState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.DOWNLINES, newValue);
      return newValue;
    });
  };

  const setDailyReports = (value: DailyReport[] | ((prev: DailyReport[]) => DailyReport[])) => {
    setDailyReportsState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.DAILY_REPORTS, newValue);
      return newValue;
    });
  };

  const setWealthListings = (value: WealthListing[] | ((prev: WealthListing[]) => WealthListing[])) => {
    setWealthListingsState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.WEALTH_LISTINGS, newValue);
      return newValue;
    });
  };

  const setLastInOuts = (value: LastInOut[] | ((prev: LastInOut[]) => LastInOut[])) => {
    setLastInOutsState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.LAST_IN_OUTS, newValue);
      return newValue;
    });
  };

  const setBankIssueFollowUps = (value: BankIssueFollowUp[] | ((prev: BankIssueFollowUp[]) => BankIssueFollowUp[])) => {
    setBankIssueFollowUpsState(prev => {
      const newValue = typeof value === 'function' ? value(prev) : value;
      saveToStorage(STORAGE_KEYS.BANK_ISSUE_FOLLOW_UPS, newValue);
      return newValue;
    });
  };

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.STOCK_MAILS && e.newValue) {
        setStockMailsState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.BANK_ACCOUNTS && e.newValue) {
        setBankAccountsState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.BANK_ISSUES && e.newValue) {
        setBankIssuesState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.C_OPERATIONS && e.newValue) {
        setCOperationsState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.TRANSACTIONS && e.newValue) {
        setTransactionsState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.AGENTS && e.newValue) {
        setAgentsState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.DOWNLINES && e.newValue) {
        setDownlinesState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.DAILY_REPORTS && e.newValue) {
        setDailyReportsState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.WEALTH_LISTINGS && e.newValue) {
        setWealthListingsState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.LAST_IN_OUTS && e.newValue) {
        setLastInOutsState(JSON.parse(e.newValue));
      } else if (e.key === STORAGE_KEYS.BANK_ISSUE_FOLLOW_UPS && e.newValue) {
        setBankIssueFollowUpsState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <DataContext.Provider value={{
      stockMails, setStockMails,
      bankAccounts, setBankAccounts,
      bankIssues, setBankIssues,
      cOperations, setCOperations,
      transactions, setTransactions,
      agents, setAgents,
      downlines, setDownlines,
      dailyReports, setDailyReports,
      wealthListings, setWealthListings,
      lastInOuts, setLastInOuts,
      bankIssueFollowUps, setBankIssueFollowUps,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}