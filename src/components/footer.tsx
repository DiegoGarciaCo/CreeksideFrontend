import RichTextRenderer from "./richTextRenderer";

interface FooterData {
  footerHeading1: string;
  footerHeading2: string;
  footerParagraph1: string;
  footerParagraph2: string;
}

export default async function FooterServer({
  footerDataPromise,
}: {
  footerDataPromise: Promise<FooterData>;
}) {
  const footerData = await footerDataPromise;

  return (
    <footer className="bg-hoa-primary">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="mt-16 flex justify-center gap-x-10 text-hoa-secondary">
          <div>
            <h3 className="font-bold text-xl">{footerData.footerHeading1}</h3>
            <RichTextRenderer content={footerData.footerParagraph1} />
          </div>
          <div>
            <h3 className="font-bold text-xl">{footerData.footerHeading2}</h3>
            <RichTextRenderer content={footerData.footerParagraph2} />
          </div>
        </div>
        <p className="mt-10 text-center text-sm/6 text-hoa-secondary">
          © 2025 Creekside HOA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
