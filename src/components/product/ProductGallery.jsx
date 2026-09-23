import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Modal from "../common/Modal";

const ProductGallery = ({ images = [], productName = "Product" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!images.length) {
    return (
      <div className="flex aspect-square items-center justify-center bg-[#F1F3EC] text-sm text-[#68736A]">
        No product images available
      </div>
    );
  }

  const activeImage = images[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden bg-[#F1F3EC]">
        <img
          src={activeImage}
          alt={`${productName} view ${activeIndex + 1}`}
          className="aspect-[0.85] w-full object-cover"
        />

        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          aria-label="Zoom product image"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#12372A] transition hover:bg-[#12372A] hover:text-white"
        >
          <Expand size={17} />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#12372A] transition hover:bg-[#12372A] hover:text-white"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#12372A] transition hover:bg-[#12372A] hover:text-white"
            >
              <ChevronRight size={19} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden border-2 ${
                activeIndex === index
                  ? "border-[#12372A]"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <Modal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        size="xl"
        title={productName}
      >
        <div className="flex justify-center bg-[#F1F3EC]">
          <img
            src={activeImage}
            alt={`${productName} enlarged`}
            className="max-h-[75vh] w-full object-contain"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductGallery;