import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  DollarSign,
  Percent,
  Ban
} from 'lucide-react';

export function Analytics() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Sample data - in real app, this would come from API
  const [monthlyData] = useState({
    month: currentMonth,
    year: currentYear,
    totalBankIssue: 47,
    totalBankSuspend: 12,
    recoverBalance: 125000,
    costing: 35000,
    previousMonth: {
      totalBankIssue: 52,
      totalBankSuspend: 15,
      recoverBalance: 98000,
      costing: 42000
    }
  });

  const stats = useMemo(() => {
    const issueChange = ((monthlyData.totalBankIssue - monthlyData.previousMonth.totalBankIssue) / monthlyData.previousMonth.totalBankIssue * 100).toFixed(1);
    const suspendChange = ((monthlyData.totalBankSuspend - monthlyData.previousMonth.totalBankSuspend) / monthlyData.previousMonth.totalBankSuspend * 100).toFixed(1);
    const recoverChange = ((monthlyData.recoverBalance - monthlyData.previousMonth.recoverBalance) / monthlyData.previousMonth.recoverBalance * 100).toFixed(1);
    const costingChange = ((monthlyData.costing - monthlyData.previousMonth.costing) / monthlyData.previousMonth.costing * 100).toFixed(1);
    
    const netRecovery = monthlyData.recoverBalance - monthlyData.costing;
    const recoveryRate = (netRecovery / monthlyData.recoverBalance * 100).toFixed(1);

    return {
      issueChange: parseFloat(issueChange),
      suspendChange: parseFloat(suspendChange),
      recoverChange: parseFloat(recoverChange),
      costingChange: parseFloat(costingChange),
      netRecovery,
      recoveryRate: parseFloat(recoveryRate)
    };
  }, [monthlyData]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics & Insights</h1>
        <p className="text-muted-foreground mt-1">
          Performance metrics for {monthNames[currentMonth]} {currentYear}
        </p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bank Issue
            </CardTitle>
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{monthlyData.totalBankIssue}</div>
            <div className="flex items-center gap-1 text-sm">
              {stats.issueChange < 0 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400">
                    {Math.abs(stats.issueChange)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-red-600 dark:text-red-400">
                    +{stats.issueChange}%
                  </span>
                </>
              )}
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bank Suspend
            </CardTitle>
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <Ban className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{monthlyData.totalBankSuspend}</div>
            <div className="flex items-center gap-1 text-sm">
              {stats.suspendChange < 0 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400">
                    {Math.abs(stats.suspendChange)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-orange-600 dark:text-orange-400">
                    +{stats.suspendChange}%
                  </span>
                </>
              )}
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recover Balance
            </CardTitle>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
              <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">
              ${monthlyData.recoverBalance.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm">
              {stats.recoverChange > 0 ? (
                <>
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400">
                    +{stats.recoverChange}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-red-600 dark:text-red-400">
                    {stats.recoverChange}%
                  </span>
                </>
              )}
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Costing
            </CardTitle>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">
              ${monthlyData.costing.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm">
              {stats.costingChange < 0 ? (
                <>
                  <TrendingDown className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400">
                    {Math.abs(stats.costingChange)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <span className="text-red-600 dark:text-red-400">
                    +{stats.costingChange}%
                  </span>
                </>
              )}
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Key metrics breakdown for {monthNames[currentMonth]}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Recovery Rate</span>
                <span className="text-sm font-bold">{stats.recoveryRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-green-600 dark:bg-green-400 h-2 rounded-full transition-all" 
                  style={{ width: `${Math.min(stats.recoveryRate, 100)}%` }} 
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Issue Resolution Progress</span>
                <span className="text-sm font-bold">
                  {((monthlyData.totalBankSuspend / monthlyData.totalBankIssue) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-orange-600 dark:bg-orange-400 h-2 rounded-full transition-all" 
                  style={{ width: `${(monthlyData.totalBankSuspend / monthlyData.totalBankIssue) * 100}%` }} 
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Net Recovery</span>
                <div className="flex items-center gap-1">
                  {stats.netRecovery > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${stats.netRecovery > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${stats.netRecovery.toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Recover Balance - Costing = Net Recovery
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Month-over-Month Comparison</CardTitle>
            <CardDescription>Compare current vs previous month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Metric</p>
                <p className="text-sm font-medium">Bank Issues</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Last Month</p>
                <p className="text-sm font-medium">{monthlyData.previousMonth.totalBankIssue}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">This Month</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">{monthlyData.totalBankIssue}</p>
                  <Badge variant={stats.issueChange < 0 ? "default" : "destructive"} className="text-xs">
                    {stats.issueChange > 0 ? '+' : ''}{stats.issueChange}%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Metric</p>
                <p className="text-sm font-medium">Bank Suspend</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Last Month</p>
                <p className="text-sm font-medium">{monthlyData.previousMonth.totalBankSuspend}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">This Month</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">{monthlyData.totalBankSuspend}</p>
                  <Badge variant={stats.suspendChange < 0 ? "default" : "destructive"} className="text-xs">
                    {stats.suspendChange > 0 ? '+' : ''}{stats.suspendChange}%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Metric</p>
                <p className="text-sm font-medium">Recover Balance</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Last Month</p>
                <p className="text-sm font-medium">${monthlyData.previousMonth.recoverBalance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">This Month</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">${monthlyData.recoverBalance.toLocaleString()}</p>
                  <Badge variant={stats.recoverChange > 0 ? "default" : "destructive"} className="text-xs">
                    {stats.recoverChange > 0 ? '+' : ''}{stats.recoverChange}%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Metric</p>
                <p className="text-sm font-medium">Costing</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Last Month</p>
                <p className="text-sm font-medium">${monthlyData.previousMonth.costing.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">This Month</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium">${monthlyData.costing.toLocaleString()}</p>
                  <Badge variant={stats.costingChange < 0 ? "default" : "destructive"} className="text-xs">
                    {stats.costingChange > 0 ? '+' : ''}{stats.costingChange}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Reset Notice */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <Percent className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Auto-Reset Notice</h3>
              <p className="text-sm text-muted-foreground mt-1">
                All percentage calculations automatically reset at the beginning of each new month. 
                Current data reflects {monthNames[currentMonth]} {currentYear} performance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}