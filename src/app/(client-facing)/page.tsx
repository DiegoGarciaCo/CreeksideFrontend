"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HomePageContent } from "@/app/admin/page";
import Skeleton from "@/components/skeleton";
import HeroTwo from "@/components/Hero2";
import Content from "@/components/content";
import Footer from "@/components/footer";

export default function HomePage() {
  const { data, isLoading } = useQuery<HomePageContent>({
    queryKey: ["content"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/api/content", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      return response.json();
    },
  });

  const { data: images, isLoading: isImagesLoading } = useQuery<string[]>({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/api/images", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    },
  });

  if (isLoading || isImagesLoading) {
    return (
      <div className="min-h-screen">
        <div className="bg-hoa-primary h-screen overflow-hidden">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
              <Skeleton width="32px" height="32px" />
              <Skeleton width="24px" height="24px" className="lg:hidden" />
              <Skeleton
                width="80px"
                height="20px"
                className="hidden lg:block"
              />
            </nav>
          </header>
          <div className="relative isolate h-screen">
            <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 sm:pb-32 lg:flex lg:px-8 lg:pt-40 lg:pb-40 h-full">
              <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
                <Skeleton width="80%" height="48px" className="mt-10 mb-8" />
                <Skeleton height="60px" className="mb-6" />
                <div className="flex gap-6">
                  <Skeleton width="150px" height="40px" />
                  <Skeleton width="150px" height="40px" />
                </div>
              </div>
              <div className="mx-auto mt-16 flex sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-16">
                <Skeleton
                  width="640px"
                  height="360px"
                  className="rounded-md min-h-[32rem]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-hoa-secondary px-6 py-32 lg:px-8">
          <div className="sticky top-10 right-0 w-1/2 max-w-xs border-2 border-hoa-accent p-6 bg-white shadow-lg rounded-2xl float-end hidden lg:block">
            <Skeleton width="150px" height="24px" className="mb-4" />
            <Skeleton height="100px" />
          </div>
          <div className="relative max-w-3xl">
            <Skeleton width="100px" height="20px" className="mb-2" />
            <Skeleton width="80%" height="36px" className="mb-6" />
            <Skeleton height="60px" className="mb-10" />
            <Skeleton height="80px" className="mb-8" />
            <Skeleton height="80px" className="mb-16" />
            <Skeleton width="70%" height="28px" className="mb-6" />
            <Skeleton height="60px" className="mb-10" />
            <Skeleton height="60px" className="mb-16" />
            <Skeleton width="100%" height="300px" className="mb-16" />
            <Skeleton width="70%" height="28px" className="mb-6" />
            <Skeleton height="60px" className="mb-8" />
            <Skeleton height="60px" />
          </div>
        </div>
        <footer className="bg-hoa-primary">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
            <div className="mt-16 flex justify-center gap-x-10 text-hoa-secondary">
              <div>
                <Skeleton width="150px" height="20px" className="mb-2" />
                <Skeleton width="100px" height="16px" className="mb-1" />
                <Skeleton width="120px" height="16px" />
              </div>
              <div>
                <Skeleton width="150px" height="20px" className="mb-2" />
                <Skeleton width="100px" height="16px" className="mb-1" />
                <Skeleton width="120px" height="16px" />
              </div>
            </div>
            <Skeleton width="200px" height="16px" className="mt-10 mx-auto" />
          </div>
        </footer>
      </div>
    );
  }

  if (!data || !images) {
    return null;
  }

  return (
    <>
      <HeroTwo heroData={data.hero} />
      <Content contentData={data.content} images={images} />
      <Footer
        footerData={{
          footerHeading1: data.content.footerHeading1,
          footerHeading2: data.content.footerHeading2,
          footerParagraph1: data.content.footerParagraph1,
          footerParagraph2: data.content.footerParagraph2,
        }}
      />
    </>
  );
}
