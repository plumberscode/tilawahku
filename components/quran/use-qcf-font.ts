"use client";

import { useEffect, useState } from "react";

const CDN_BASE = "https://verses.quran.foundation";
const loadedFontNames = new Set<string>();

/**
 * Hook to dynamically load QCF V2 page fonts and UthmanicHafs fallback font
 */
export function useQcfFont(pageNumber: number) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fontName = `p${pageNumber}-v2`;

    async function loadFonts() {
      // 1. Check if already loaded
      if (loadedFontNames.has(fontName) && document.fonts.check(`1em "${fontName}"`)) {
        if (isMounted) setIsLoaded(true);
        return;
      }

      try {
        // Load fallback font UthmanicHafs first if not present
        if (!loadedFontNames.has("UthmanicHafs")) {
          const fallbackFace = new FontFace(
            "UthmanicHafs",
            `url('${CDN_BASE}/fonts/quran/hafs/uthmanic_hafs/UthmanicHafs1Ver18.woff2') format('woff2')`
          );
          fallbackFace.display = "swap";
          await fallbackFace.load();
          document.fonts.add(fallbackFace);
          loadedFontNames.add("UthmanicHafs");
        }

        // Load the page-specific QCF V2 font
        const pageFace = new FontFace(
          fontName,
          `url('${CDN_BASE}/fonts/quran/hafs/v2/woff2/p${pageNumber}.woff2') format('woff2'), url('${CDN_BASE}/fonts/quran/hafs/v2/woff/p${pageNumber}.woff') format('woff')`
        );
        pageFace.display = "block";
        await pageFace.load();
        document.fonts.add(pageFace);
        loadedFontNames.add(fontName);

        if (isMounted) {
          setIsLoaded(true);
        }
      } catch (err) {
        console.error(`Failed to load QCF font for page ${pageNumber}:`, err);
        // Still allow rendering via fallback
        if (isMounted) {
          setIsLoaded(false);
        }
      }
    }

    loadFonts();

    return () => {
      isMounted = false;
    };
  }, [pageNumber]);

  return { isLoaded, fontName: `p${pageNumber}-v2` };
}
