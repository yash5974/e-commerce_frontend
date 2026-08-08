import { useMemo, useState } from "react";

interface ProductImageGalleryProps {
  name: string;
  mainImage: string;
  galleryImages: string[];
}

export default function ProductImageGallery({
  name,
  mainImage,
  galleryImages,
}: ProductImageGalleryProps) {
  const images = useMemo(() => {
    return [mainImage, ...galleryImages.filter((image) => image !== mainImage)];
  }, [mainImage, galleryImages]);

  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div className="grid gap-4 md:grid-cols-[96px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`size-20 shrink-0 overflow-hidden rounded-lg border ${
              selectedImage === image
                ? "border-primary ring-2 ring-primary/20"
                : "border-border"
            }`}
            aria-label={`View ${name} image ${index + 1}`}
          >
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="order-1 aspect-square overflow-hidden rounded-xl bg-muted md:order-2">
        <img
          src={selectedImage}
          alt={name}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
