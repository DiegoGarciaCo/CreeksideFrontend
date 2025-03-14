"use client";

import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { HeroData } from "@/app/admin/page";
import Link from "next/link";
import Image from "next/image";
import RichTextRenderer from "./richTextRenderer";

interface HeroTwoProps {
  heroData: HeroData;
}

export default function HeroTwo({ heroData }: HeroTwoProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-hoa-primary h-screen overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1"></div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/admin" className="text-sm/6 font-semibold text-white">
              Admin <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-hoa-text-light/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-hoa-text-dark"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-hoa-text-light/10">
                <div className="py-6">
                  <a
                    href={heroData.button1}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-hoa-text-dark hover:bg-hoa-secondary"
                  >
                    Creekside Association
                  </a>
                  <a
                    href={heroData.button2}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-hoa-text-dark hover:bg-hoa-secondary"
                  >
                    Master Association
                  </a>
                  <Link
                    href={heroData.button2}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-hoa-text-dark hover:bg-hoa-secondary"
                  >
                    admin {"->"}
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
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
          <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 sm:pb-32 lg:flex lg:px-8 lg:pt-40 lg:pb-40 h-full">
            <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8 z-10">
              <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
                {heroData.heading1}
              </h1>
              <div className="mt-8 text-lg font-medium text-pretty text-hoa-secondary sm:text-xl/8">
                <RichTextRenderer content={heroData.paragraph1} />
              </div>
              <div className="mt-10 flex items-center gap-x-6">
                <button
                  className="px-6 py-3 text-lg font-semibold bg-hoa-button-1 text-white rounded-lg shadow-lg hover:bg-hoa-button-1-hover transition"
                  aria-label="Learn more about Creekside Homeowners"
                >
                  <Link href={heroData.button1}>
                    Creekside Association<span aria-hidden="true">→</span>
                  </Link>
                </button>
                <button
                  className="px-6 py-3 text-lg font-semibold bg-hoa-button-2 text-hoa-primary border-2 border-hoa-primary rounded-lg shadow-lg hover:bg-hoa-button-2-hover hover:text-hoa-text-dark transition"
                  aria-label="Learn more about Master Association"
                >
                  <Link href={heroData.button2}>
                    Master Association<span aria-hidden="true">→</span>
                  </Link>
                </button>
              </div>
            </div>
            <div className="mx-auto mt-16 hidden md:flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-16">
              <div className="max-w-xl flex-none">
                <Image
                  alt="Neighborhood landscape"
                  src="/image3.webp"
                  width={640}
                  height={360}
                  className="min-h-[32rem] rounded-md bg-hoa-primary/5 shadow-2xl ring-1 ring-hoa-text-dark/10"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
