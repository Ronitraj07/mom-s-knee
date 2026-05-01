import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Row = { id: string; key: string; value: any };

const SOCIAL_FIELDS = [
  { field: "instagram", label: "Instagram URL" },
  { field: "facebook", label: "Facebook URL" },
  { field: "tiktok", label: "TikTok URL" },
  { field: "email", label: "Contact email" },
];

const IMAGE_FIELDS = [
  { field: "hero", label: "Hero image URL" },
  { field: "product", label: "Product image URL" },
  { field: "lifestyle", label: "Lifestyle image URL" },
];

const Media = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [drafts, setDrafts] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("site_content").select("*").in("key", ["socials", "images"]);
      if (error) return toast.error(error.message);
      setRows(data ?? []);
      const d: Record<string, any> = {};
      (data ?? []).forEach((r) => (d[r.key] = { ...r.value }));
      setDrafts(d);
    })();
  }, []);

  const save = async (row: Row) => {
    setSaving(row.id);
    const { error } = await supabase.from("site_content").update({ value: drafts[row.key] }).eq("id", row.id);
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success(`${row.key} updated`);
  };

  const renderCard = (row: Row, fields: { field: string; label: string }[]) => (
    <Card key={row.id}>
      <CardHeader>
        <CardTitle className="capitalize font-serif">{row.key}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((f) => (
          <div key={f.field} className="space-y-2">
            <Label className="text-xs uppercase tracking-[0.18em]">{f.label}</Label>
            <Input
              value={drafts[row.key]?.[f.field] ?? ""}
              onChange={(e) =>
                setDrafts({ ...drafts, [row.key]: { ...drafts[row.key], [f.field]: e.target.value } })
              }
              placeholder="https://…"
            />
          </div>
        ))}
        <Button onClick={() => save(row)} disabled={saving === row.id}>
          {saving === row.id ? "Saving…" : "Save changes"}
        </Button>
      </CardContent>
    </Card>
  );

  const socials = rows.find((r) => r.key === "socials");
  const images = rows.find((r) => r.key === "images");

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="font-serif text-3xl text-foreground mb-2">Images & Socials</h2>
        <p className="text-muted-foreground">Update footer social links and image URLs shown on the site.</p>
      </div>
      {socials && renderCard(socials, SOCIAL_FIELDS)}
      {images && renderCard(images, IMAGE_FIELDS)}
    </div>
  );
};

export default Media;
