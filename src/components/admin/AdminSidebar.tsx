import { NavLink, useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  LayoutDashboard, 
  FileText, 
  Edit3, 
  BarChart3, 
  LogOut,
  Shield,
  PenLine,
  Trash2,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const { signOut, user } = useAdmin();
  const navigate = useNavigate();
  const [trashCount, setTrashCount] = useState(0);

  useEffect(() => {
    const fetchTrashCount = async () => {
      const { count } = await supabase
        .from("form_submissions")
        .select("*", { count: "exact", head: true })
        .not("deleted_at", "is", null);
      setTrashCount(count || 0);
    };

    fetchTrashCount();

    const channel = supabase
      .channel("trash-count")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "form_submissions" },
        () => fetchTrashCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/admin/submissions", icon: FileText, label: "Submissions" },
    { to: "/admin/trash", icon: Trash2, label: "Trash", badge: trashCount },
    { to: "/admin/blog", icon: PenLine, label: "Blog" },
    { to: "/admin/content", icon: Edit3, label: "Content" },
    { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { to: "/admin/account", icon: Settings, label: "Account" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-foreground">Admin</h2>
            <p className="text-xs text-muted-foreground truncate max-w-[140px]">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-body",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[20px] justify-center">
                {item.badge}
              </Badge>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
