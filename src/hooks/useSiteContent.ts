import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { SiteContentMap } from "@/types/site-content";

export const useSiteContent = (keys?: string[]) => {
  const [content, setContent] = useState<SiteContentMap>({});
  const [loading, setLoading] = useState(true);

  const keyString = keys?.join(",") ?? "";

  useEffect(() => {
    let q = supabase.from("site_content").select("key, value");
    if (keys && keys.length) q = q.in("key", keys);
    q.then(({ data, error }) => {
      if (!error) {
        const map: SiteContentMap = {};
        (data ?? []).forEach((r) => {
          map[r.key] = r.value as Record<string, string>;
        });
        setContent(map);
      }
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyString]);

  return { content, loading };
};
