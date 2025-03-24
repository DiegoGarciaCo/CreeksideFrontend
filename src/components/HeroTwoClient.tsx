"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { HeroData } from "@/app/admin/page";

export default function HeroTwoClient({ heroData }: { heroData: HeroData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Buttons */}
      <div className="mt-10 flex items-center gap-x-6">
        <button
          className="px-6 py-3 text-lg font-semibold bg-hoa-button-1 text-white rounded-lg shadow-lg hover:bg-hoa-button-1-hover transition"
          onClick={() => window.open(heroData.button1, "_blank")}
          aria-label="Learn more about Creekside Homeowners"
        >
          Creekside Association<span aria-hidden="true">→</span>
        </button>
        <button
          className="px-6 py-3 text-lg font-semibold bg-hoa-button-2 text-hoa-primary border-2 border-hoa-primary rounded-lg shadow-lg hover:bg-hoa-button-2-hover hover:text-hoa-text-dark transition"
          onClick={() => window.open(heroData.button2, "_blank")}
          aria-label="Learn more about Master Association"
        >
          Master Association<span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex lg:hidden absolute top-0 right-0 p-6">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end absolute top-0 right-0 p-6 lg:px-8">
        <Link href="/admin" className="text-sm/6 font-semibold text-white">
          Admin <span aria-hidden="true">→</span>
        </Link>
      </div>
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
                <button
                  onClick={() => window.open(heroData.button1, "_blank")}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-hoa-text-dark hover:bg-hoa-secondary"
                >
                  Creekside Association
                </button>
                <button
                  onClick={() => window.open(heroData.button2, "_blank")}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-hoa-text-dark hover:bg-hoa-secondary"
                >
                  Master Association
                </button>
                <Link
                  href="/admin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-hoa-text-dark hover:bg-hoa-secondary"
                >
                  admin {"->"}
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDownIcon className="size-8 text-white" />
        </button>
      </div>
    </>
  );
}
