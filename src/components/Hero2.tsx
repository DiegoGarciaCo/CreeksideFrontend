import { Suspense } from "react";
import Image from "next/image";
import { HeroData } from "@/app/admin/page";
import HeroTwoClient from "./HeroTwoClient";
import RichTextRenderer from "./richTextRenderer";

export default async function HeroTwo({
  heroDataPromise,
}: {
  heroDataPromise: Promise<HeroData>;
}) {
  const heroData = await heroDataPromise;

  return (
    <div className="bg-hoa-primary h-screen overflow-hidden relative">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1"></div>
        </nav>
      </header>
      <main>
        <div className="relative isolate h-screen">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-full w-full stroke-white/50 [mask-image:radial-gradient(32rem_32rem_at_top_right,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-white/10">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
          <div
            aria-hidden="true"
            className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
              className="aspect-1108/632 w-[69.25rem] bg-linear-to-r from-hoa-button-1 to-hoa-accent opacity-20"
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 sm:pb-32 lg:flex lg:px-8 lg:pt-40 lg:pb-40">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-x-8 min-h-0">
              <div className="max-w-2xl flex-1 lg:pt-8">
                <Suspense fallback={<HeroContentSkeleton />}>
                  <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
                    {heroData.heading1}
                  </h1>
                  <div className="mt-8 text-lg font-medium text-pretty text-hoa-secondary sm:text-xl/8">
                    <RichTextRenderer content={heroData.paragraph1} />
                  </div>
                </Suspense>
                <HeroTwoClient heroData={heroData} />
              </div>
              <div className="mt-6 lg:mt-4 flex-shrink-0 hidden md:block">
                <Image
                  alt="Neighborhood landscape"
                  src="/creekside.png"
                  width={540}
                  height={304}
                  className="rounded-md bg-hoa-primary/5 shadow-2xl ring-1 ring-hoa-text-dark/10 w-full max-w-[540px] max-h-[504px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function HeroContentSkeleton() {
  return (
    <>
      <div className="mt-10 h-12 w-4/5 bg-gray-300 animate-pulse mb-8" />
      <div className="h-16 w-full bg-gray-300 animate-pulse mb-6" />
      <div className="mt-10 flex items-center gap-x-6">
        <div className="h-10 w-40 bg-gray-300 animate-pulse" />
        <div className="h-10 w-40 bg-gray-300 animate-pulse" />
      </div>
    </>
  );
}
