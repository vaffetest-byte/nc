import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RefreshCw, Eye, TrendingUp, Calendar, Users, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface PageViewData {
  page_path: string;
  count: number;
}

interface DailyData {
  date: string;
  views: number;
}

interface RealtimeVisitor {
  id: string;
  page_path: string;
  created_at: string;
  user_agent: string | null;
}

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [pageViews, setPageViews] = useState<PageViewData[]>([]);
  const [dailyViews, setDailyViews] = useState<DailyData[]>([]);
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");
  
  // Realtime state
  const [activeVisitors, setActiveVisitors] = useState(0);
  const [recentViews, setRecentViews] = useState<RealtimeVisitor[]>([]);

  useEffect(() => {
    fetchAnalytics();
    fetchActiveVisitors();
  }, [dateRange]);

  // Subscribe to realtime page views
  useEffect(() => {
    const channel = supabase
      .channel('realtime-page-views')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'page_views'
        },
        (payload) => {
          const newView = payload.new as RealtimeVisitor;
          setRecentViews(prev => [newView, ...prev].slice(0, 10));
          setTodayViews(prev => prev + 1);
          fetchActiveVisitors();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchActiveVisitors = async () => {
    // Count visitors active in last 5 minutes
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

    const { count } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", fiveMinutesAgo.toISOString());

    setActiveVisitors(count || 0);

    // Fetch recent views for the feed
    const { data: recent } = await supabase
      .from("page_views")
      .select("id, page_path, created_at, user_agent")
      .order("created_at", { ascending: false })
      .limit(10);

    if (recent) {
      setRecentViews(recent);
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    
    const daysAgo = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Total views in range
    const { count: total } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startDate.toISOString());

    setTotalViews(total || 0);

    // Today's views
    const { count: todayCount } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString());

    setTodayViews(todayCount || 0);

    // Page views breakdown
    const { data: allViews } = await supabase
      .from("page_views")
      .select("page_path")
      .gte("created_at", startDate.toISOString());

    if (allViews) {
      const pageCounts: Record<string, number> = {};
      allViews.forEach(view => {
        const path = view.page_path || "/";
        pageCounts[path] = (pageCounts[path] || 0) + 1;
      });

      const sortedPages = Object.entries(pageCounts)
        .map(([page_path, count]) => ({ page_path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setPageViews(sortedPages);
    }

    // Daily views for chart
    const { data: viewsData } = await supabase
      .from("page_views")
      .select("created_at")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: true });

    if (viewsData) {
      const dailyCounts: Record<string, number> = {};
      
      // Initialize all dates in range
      for (let i = 0; i < daysAgo; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        dailyCounts[dateStr] = 0;
      }

      viewsData.forEach(view => {
        const dateStr = view.created_at.split("T")[0];
        dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1;
      });

      const dailyData = Object.entries(dailyCounts)
        .map(([date, views]) => ({ date, views }))
        .sort((a, b) => a.date.localeCompare(b.date));

      setDailyViews(dailyData);
    }

    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatPagePath = (path: string) => {
    if (path === "/") return "Home";
    return path.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    return formatDate(dateStr);
  };

  const getBrowserFromUA = (ua: string | null) => {
    if (!ua) return "Unknown";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    if (ua.includes("Edge")) return "Edge";
    return "Other";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground font-body mt-1">
            Website traffic and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={dateRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setDateRange("7d")}
          >
            7 Days
          </Button>
          <Button
            variant={dateRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setDateRange("30d")}
          >
            30 Days
          </Button>
          <Button
            variant={dateRange === "90d" ? "default" : "outline"}
            size="sm"
            onClick={() => setDateRange("90d")}
          >
            90 Days
          </Button>
          <Button variant="outline" size="sm" onClick={fetchAnalytics} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Realtime Stats */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <h2 className="font-heading text-xl font-bold text-foreground">Live Activity</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{activeVisitors}</p>
              <p className="text-sm text-muted-foreground">Active visitors (last 5 min)</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Recent Activity</span>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {recentViews.length > 0 ? (
                recentViews.slice(0, 5).map((view) => (
                  <div key={view.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">
                      {formatPagePath(view.page_path)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {getBrowserFromUA(view.user_agent)} · {formatTimeAgo(view.created_at)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {loading ? "..." : totalViews.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Total Views ({dateRange === "7d" ? "7 days" : dateRange === "30d" ? "30 days" : "90 days"})
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {loading ? "..." : todayViews.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Today's Views</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {loading ? "..." : Math.round(totalViews / (dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90))}
              </p>
              <p className="text-sm text-muted-foreground">Daily Average</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Views Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            Daily Page Views
          </h2>
          {dailyViews.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  labelFormatter={formatDate}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No data available
            </div>
          )}
        </div>

        {/* Top Pages Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            Top Pages
          </h2>
          {pageViews.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pageViews} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  dataKey="page_path" 
                  type="category" 
                  tickFormatter={formatPagePath}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={100}
                />
                <Tooltip 
                  formatter={(value: number) => [value, "Views"]}
                  labelFormatter={formatPagePath}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
