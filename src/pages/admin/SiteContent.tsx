import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { SiteContentValue } from "@/types/site-content";

type Row = { id: string; key: string; value: SiteContentValue; description: string | null };

const FIELDS: Record<string, { label: string; field: string; type?: "textarea" }[]> = {
  hero: [
    { label: "Eyebrow", field: "eyebrow" },
    { label: "Headline", field: "headline" },
    { label: "Subheadline", field: "subheadline", type: "textarea" },
  ],
  motto: [{ label: "Motto", field: "text" }],
  about: [
    { label: "Title", field: "title" },
    { label: "Body", field: "body", type: "textarea" },
  ],
};

const SiteContent = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Record<string, string>>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .in("key", ["hero", "motto", "about"]);
      if (error) return toast.error(error.message);
      setRows(data ?? []);
      const d: Record<string, Record<string, string>> = {};
      (data ?? []).forEach((r) => {
        d[r.key] = { ...(r.value as Record<string, string>) };
      });
      setDrafts(d);
    })();
  }, []);

  const save = async (row: Row) => {
    setSaving(row.id);
    const { error } = await supabase
      .from("site_content")
      .update({ value: drafts[row.key] })
      .eq("id", row.id);
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success(`${row.key} updated`);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="font-serif text-3xl text-foreground mb-2">Site Content</h2>
        <p className="text-muted-foreground">Edit taglines, motto, and about-us copy.</p>
      </div>

      {rows.map((row) => (
        <Card key={row.id}>
          <CardHeader>
            <CardTitle className="capitalize font-serif">{row.key}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(FIELDS[row.key] ?? []).map((f) => (
              <div key={f.field} className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.18em]">{f.label}</Label>
                {f.type === "textarea" ? (
                  <Textarea
                    rows={4}
                    value={drafts[row.key]?.[f.field] ?? ""}
                    onChange={(e) =>
                      setDrafts({ ...drafts, [row.key]: { ...drafts[row.key], [f.field]: e.target.value } })
                    }
                  />
                ) : (
                  <Input
                    value={drafts[row.key]?.[f.field] ?? ""}
                    onChange={(e) =>
                      setDrafts({ ...drafts, [row.key]: { ...drafts[row.key], [f.field]: e.target.value } })
                    }
                  />
                )}
              </div>
            ))}
            <Button onClick={() => save(row)} disabled={saving === row.id}>
              {saving === row.id ? "Saving…" : "Save changes"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SiteContent;
