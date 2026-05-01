import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type Row = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};

const ContactSubmissions = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) return toast.error(error.message);
    setRows(data ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (row: Row) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ read: !row.read })
      .eq("id", row.id);
    if (error) return toast.error(error.message);
    setRows(rows.map((r) => (r.id === row.id ? { ...r, read: !r.read } : r)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows(rows.filter((r) => r.id !== id));
    toast.success("Deleted");
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="font-serif text-3xl text-foreground mb-2">Contact Messages</h2>
        <p className="text-muted-foreground">Messages submitted from the site contact form.</p>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <Card key={r.id} className={r.read ? "opacity-70" : ""}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{r.name}</span>
                      <span className="text-sm text-muted-foreground">&lt;{r.email}&gt;</span>
                      {!r.read && <Badge variant="default">New</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(r.created_at).toLocaleString()}
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm">{r.message}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => toggleRead(r)}>
                      {r.read ? "Mark unread" : "Mark read"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => remove(r.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactSubmissions;
