import { Suspense } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { listCategories } from "@/services/categories";
import { loadResult } from "@/lib/load";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="sticky top-0 z-40">
        <AnnouncementBar />
        <Suspense fallback={<Header categories={[]} />}>
          <HeaderSlot />
        </Suspense>
      </div>
      <main id="content" className="flex-1">{children}</main>
      <Suspense fallback={<Footer categories={[]} />}>
        <FooterSlot />
      </Suspense>
    </>
  );
}

async function HeaderSlot() {
  const loaded = await loadResult(() => listCategories());
  return <Header categories={loaded.ok ? loaded.data : []} />;
}

async function FooterSlot() {
  const loaded = await loadResult(() => listCategories());
  return <Footer categories={loaded.ok ? loaded.data : []} />;
}
