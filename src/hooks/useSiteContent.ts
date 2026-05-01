import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type SiteContentMap = Record<string, Record<string, any>>;

export const useSiteContent = (keys?: string[]) => {
  const [content, setContent] = useState<SiteContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = supabase.from("site_content").select("key, value");
    if (keys && keys.length) q = q.in("key", keys);
    q.then(({ data }) => {
      const map: SiteContentMap = {};
      (data ?? []).forEach((r: any) => (map[r.key] = (r.value ?? {}) as Record<string, any>));
      setContent(map);
      setLoading(false);
    });
  }, [keys?.join(",")]);

  return { content, loading };
};
