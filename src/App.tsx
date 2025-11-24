import { Route, Switch } from "wouter";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AppLayout } from "@/components/Layout";
import { RequireAuth } from "@/components/RequireAuth";

// PAGES (IMPORT LENGKAP)
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import StockMail from "@/pages/StockMail";
import BankAccounts from "@/pages/BankAccounts";
import BankIssues from "@/pages/BankIssues";
import Settings from "@/pages/Settings";

// Yang tadi error karena TIDAK DI-IMPORT
import LastInOut from "@/pages/LastInOut";
import BankIssueFollowUp from "@/pages/BankIssueFollowUp";
import COperation from "@/pages/COperation";
import TransactionSummary from "@/pages/TransactionSummary";
import AgentListing from "@/pages/AgentListing";
import AgentDownlines from "@/pages/AgentDownlines";
import DailyReport from "@/pages/DailyReport";
import WealthPlus from "@/pages/WealthPlus";
import Analytics from "@/pages/Analytics";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Switch>
            {/* LOGIN */}
            <Route path="/login">
              <Login />
            </Route>

            {/* DASHBOARD */}
            <Route path="/">
              <RequireAuth>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* STOCK MAIL */}
            <Route path="/stock-mail">
              <RequireAuth>
                <AppLayout>
                  <StockMail />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* BANK ACCOUNTS */}
            <Route path="/bank-accounts">
              <RequireAuth>
                <AppLayout>
                  <BankAccounts />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* BANK ISSUES */}
            <Route path="/bank-issues">
              <RequireAuth>
                <AppLayout>
                  <BankIssues />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* LAST IN OUT */}
            <Route path="/last-in-out">
              <RequireAuth>
                <AppLayout>
                  <LastInOut />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* BANK ISSUE FOLLOW UP */}
            <Route path="/bank-issues-follow-up">
              <RequireAuth>
                <AppLayout>
                  <BankIssueFollowUp />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* C-OPERATION */}
            <Route path="/c-operation">
              <RequireAuth>
                <AppLayout>
                  <COperation />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* TRANSACTION SUMMARY */}
            <Route path="/transaction-summary">
              <RequireAuth>
                <AppLayout>
                  <TransactionSummary />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* AGENT LISTING */}
            <Route path="/agent-listing">
              <RequireAuth>
                <AppLayout>
                  <AgentListing />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* AGENT DOWNLINES */}
            <Route path="/agent-downlines">
              <RequireAuth>
                <AppLayout>
                  <AgentDownlines />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* DAILY REPORT */}
            <Route path="/daily-report">
              <RequireAuth>
                <AppLayout>
                  <DailyReport />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* WEALTH PLUS */}
            <Route path="/wealth-plus">
              <RequireAuth>
                <AppLayout>
                  <WealthPlus />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* ANALYTICS */}
            <Route path="/analytics">
              <RequireAuth>
                <AppLayout>
                  <Analytics />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* SETTINGS */}
            <Route path="/settings">
              <RequireAuth>
                <AppLayout>
                  <Settings />
                </AppLayout>
              </RequireAuth>
            </Route>

            {/* 404 */}
            <Route>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-2">404</h1>
                  <p className="text-muted-foreground">Page Not Found</p>
                </div>
              </div>
            </Route>
          </Switch>

          <Toaster />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
