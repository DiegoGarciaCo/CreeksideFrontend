"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type EmblaCarouselProps = {
  images: string[];
};

export default function Carousel({ images }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const goToPrev = () => emblaApi?.scrollPrev();
  const goToNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative shadow-lg">
      <div className="embla rounded-lg" ref={emblaRef}>
        <div className="embla__container flex">
          {images.map((image, index) => (
            <div className="embla__slide flex-shrink-0" key={index}>
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent rounded-full p-3 shadow-md hover:bg-gray-200"
      >
        <IoIosArrowBack size={30} className="text-gray-700" />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent rounded-full p-3 shadow-md hover:bg-gray-200"
      >
        <IoIosArrowForward size={30} className="text-gray-700" />
      </button>
    </div>
  );
}
