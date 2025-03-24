import { Suspense } from "react";
import { ContentData } from "@/app/admin/page";
import RichTextRenderer from "./richTextRenderer";
import Carousel from "./corousal";

export default async function ContentServer({
  contentDataPromise,
  imagesPromise,
}: {
  contentDataPromise: Promise<ContentData>;
  imagesPromise: Promise<string[]>;
}) {
  const contentData = await contentDataPromise;
  const images = await imagesPromise;

  return (
    <div className="bg-hoa-secondary px-6 py-32 lg:px-8">
      <div className="sticky top-10 right-0 w-1/2 max-w-xs border-2 border-hoa-accent p-6 bg-white shadow-lg rounded-2xl float-end transition-transform duration-300 hover:scale-105 hidden lg:block">
        <h2 className="font-bold text-2xl text-hoa-text-dark">Announcements</h2>
        <RichTextRenderer content={contentData.announcements} />
      </div>
      <div className="relative max-w-3xl text-base/7 text-hoa-text-dark/70">
        <p className="text-base/7 font-semibold text-hoa-text-dark/80">
          About Us
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-hoa-text-dark sm:text-5xl">
          {contentData.heading2}
        </h1>
        <div className="mt-6 text-xl/8">
          <RichTextRenderer content={contentData.paragraph2} />
        </div>
        <div className="mt-10 max-w-2xl">
          <div>
            <RichTextRenderer content={contentData.paragraph3} />
          </div>
          <div className="mt-8">
            <RichTextRenderer content={contentData.paragraph4} />
          </div>
          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-hoa-text-dark">
            {contentData.heading3}
          </h2>
          <div className="mt-6">
            <RichTextRenderer content={contentData.paragraph5} />
          </div>
          <div className="my-10">
            <RichTextRenderer content={contentData.paragraph6} />
          </div>
        </div>
        <div className="rounded-lg shadow-lg">
          <Suspense
            fallback={
              <div className="h-64 w-full bg-gray-300 animate-pulse rounded-lg" />
            }
          >
            <Carousel images={images} />
          </Suspense>
        </div>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-hoa-text-dark">
            {contentData.heading4}
          </h2>
          <div className="mt-6">
            <RichTextRenderer content={contentData.paragraph7} />
          </div>
          <div className="mt-8">
            <RichTextRenderer content={contentData.paragraph8} />
          </div>
        </div>
      </div>
    </div>
  );
}
