import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Users, Eye, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  totalSubmissions: number;
  fundingRequests: number;
  brokerSignups: number;
  pageViews: number;
  unreadSubmissions: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalSubmissions: 0,
    fundingRequests: 0,
    brokerSignups: 0,
    pageViews: 0,
    unreadSubmissions: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentSubmissions();
  }, []);

  const fetchStats = async () => {
    // Get submission counts
    const { data: submissions } = await supabase
      .from("form_submissions")
      .select("form_type, read_status");

    const fundingRequests = submissions?.filter(s => s.form_type === "funding").length || 0;
    const brokerSignups = submissions?.filter(s => s.form_type === "broker").length || 0;
    const unreadSubmissions = submissions?.filter(s => !s.read_status).length || 0;

    // Get page view count (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { count: pageViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo.toISOString());

    setStats({
      totalSubmissions: (submissions?.length || 0),
      fundingRequests,
      brokerSignups,
      pageViews: pageViews || 0,
      unreadSubmissions,
    });
    setLoading(false);
  };

  const fetchRecentSubmissions = async () => {
    const { data } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setRecentSubmissions(data || []);
  };

  const statCards = [
    {
      label: "Total Submissions",
      value: stats.totalSubmissions,
      icon: FileText,
      color: "bg-blue-500",
      link: "/admin/submissions",
    },
    {
      label: "Funding Requests",
      value: stats.fundingRequests,
      icon: TrendingUp,
      color: "bg-primary",
      link: "/admin/submissions?type=funding",
    },
    {
      label: "Broker Signups",
      value: stats.brokerSignups,
      icon: Users,
      color: "bg-green-500",
      link: "/admin/submissions?type=broker",
    },
    {
      label: "Page Views (30d)",
      value: stats.pageViews,
      icon: Eye,
      color: "bg-purple-500",
      link: "/admin/analytics",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-body mt-1">
          Overview of your website activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {loading ? "..." : stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Unread Alert */}
      {stats.unreadSubmissions > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8">
          <p className="text-primary font-semibold">
            You have {stats.unreadSubmissions} unread submission{stats.unreadSubmissions > 1 ? "s" : ""}
          </p>
          <Link to="/admin/submissions" className="text-primary hover:underline text-sm">
            View all submissions →
          </Link>
        </div>
      )}

      {/* Recent Submissions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-heading text-xl font-bold text-foreground mb-4">
          Recent Submissions
        </h2>
        
        {recentSubmissions.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet.</p>
        ) : (
          <div className="space-y-3">
            {recentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  submission.read_status ? "bg-muted/30" : "bg-primary/5 border border-primary/20"
                }`}
              >
                <div>
                  <p className="font-semibold text-foreground">
                    {submission.data?.name || submission.data?.fullName || submission.data?.contactName || "Unknown"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {submission.form_type === "funding" ? "Funding Request" : "Broker Signup"} •{" "}
                    {new Date(submission.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    submission.form_type === "funding"
                      ? "bg-primary/10 text-primary"
                      : "bg-green-500/10 text-green-600"
                  }`}
                >
                  {submission.form_type === "funding" ? "Funding" : "Broker"}
                </span>
              </div>
            ))}
          </div>
        )}

        <Link
          to="/admin/submissions"
          className="block text-center text-primary hover:underline mt-4 text-sm"
        >
          View all submissions →
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
