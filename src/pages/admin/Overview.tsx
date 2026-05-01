import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, FileText } from "lucide-react";

const Overview = () => {
  const [stats, setStats] = useState({ contact: 0, contactUnread: 0, waitlist: 0, content: 0 });

  useEffect(() => {
    (async () => {
      const [c, cu, w, ct] = await Promise.all([
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("read", false),
        supabase.from("waitlist_signups").select("*", { count: "exact", head: true }),
        supabase.from("site_content").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        contact: c.count ?? 0,
        contactUnread: cu.count ?? 0,
        waitlist: w.count ?? 0,
        content: ct.count ?? 0,
      });
    })();
  }, []);

  return (
    <div className="max-w-5xl">
      <h2 className="font-serif text-3xl text-foreground mb-2">Overview</h2>
      <p className="text-muted-foreground mb-8">Welcome back. Here's what's new.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Waitlist signups</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif">{stats.waitlist}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contact messages</CardTitle>
            <Mail className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif">{stats.contact}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.contactUnread} unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Content blocks</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif">{stats.content}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
