import { Suspense } from "react";
import { HomePageContent } from "@/app/admin/page";
import { unstable_noStore } from "next/cache";
import HeroTwo from "@/components/Hero2";
import ContentServer from "@/components/content";
import FooterServer from "@/components/footer";

async function fetchContent(): Promise<HomePageContent> {
  unstable_noStore();
  const response = await fetch(
    "https://api.creeksideinverness.org/api/content",
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch content");
  }
  return response.json();
}

async function fetchImages(): Promise<string[]> {
  unstable_noStore();
  const response = await fetch(
    "https://api.creeksideinverness.org/api/images",
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  return response.json();
}

export default async function HomePage() {
  const contentPromise = fetchContent();
  const imagesPromise = fetchImages();

  return (
    <>
      {/* Hero Section with static content outside Suspense */}
      <HeroTwo heroDataPromise={contentPromise.then((data) => data.hero)} />
      <Suspense fallback={<ContentSkeleton />}>
        <ContentServer
          contentDataPromise={contentPromise.then((data) => data.content)}
          imagesPromise={imagesPromise}
        />
      </Suspense>
      <Suspense fallback={<FooterSkeleton />}>
        <FooterServer
          footerDataPromise={contentPromise.then((data) => ({
            footerHeading1: data.content.footerHeading1,
            footerHeading2: data.content.footerHeading2,
            footerParagraph1: data.content.footerParagraph1,
            footerParagraph2: data.content.footerParagraph2,
          }))}
        />
      </Suspense>
    </>
  );
}

function ContentSkeleton() {
  return (
    <div className="bg-hoa-secondary px-6 py-32 lg:px-8">
      <div className="sticky top-10 right-0 w-1/2 max-w-xs border-2 border-hoa-accent p-6 bg-white shadow-lg rounded-2xl float-end hidden lg:block">
        <div className="h-6 w-40 bg-gray-300 animate-pulse mb-4" />
        <div className="h-24 w-full bg-gray-300 animate-pulse" />
      </div>
      <div className="relative max-w-3xl">
        <div className="h-5 w-24 bg-gray-300 animate-pulse mb-2" />
        <div className="h-10 w-4/5 bg-gray-300 animate-pulse mb-6" />
        <div className="h-16 w-full bg-gray-300 animate-pulse mb-10" />
        <div className="h-20 w-full bg-gray-300 animate-pulse mb-8" />
        <div className="h-20 w-full bg-gray-300 animate-pulse mb-16" />
        <div className="h-7 w-3/5 bg-gray-300 animate-pulse mb-6" />
        <div className="h-16 w-full bg-gray-300 animate-pulse mb-10" />
        <div className="h-16 w-full bg-gray-300 animate-pulse mb-16" />
        <div className="h-64 w-full bg-gray-300 animate-pulse mb-16 rounded-lg" />
        <div className="h-7 w-3/5 bg-gray-300 animate-pulse mb-6" />
        <div className="h-16 w-full bg-gray-300 animate-pulse mb-8" />
        <div className="h-16 w-full bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
}

function FooterSkeleton() {
  return (
    <footer className="bg-hoa-primary">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="mt-16 flex justify-center gap-x-10">
          <div>
            <div className="h-5 w-40 bg-gray-300 animate-pulse mb-2" />
            <div className="h-4 w-24 bg-gray-300 animate-pulse mb-1" />
            <div className="h-4 w-32 bg-gray-300 animate-pulse" />
          </div>
          <div>
            <div className="h-5 w-40 bg-gray-300 animate-pulse mb-2" />
            <div className="h-4 w-24 bg-gray-300 animate-pulse mb-1" />
            <div className="h-4 w-32 bg-gray-300 animate-pulse" />
          </div>
        </div>
        <div className="mt-10 h-4 w-48 bg-gray-300 animate-pulse mx-auto" />
      </div>
    </footer>
  );
}
