import Image from "next/image";

type ProductImageProps = {
  src: string | null;
  alt: string;
  priority?: boolean | undefined;
};

export function ProductImage({ src, alt, priority }: ProductImageProps) {
  if (src === null) {
    return (
      <div
        className="flex aspect-square w-full items-center justify-center rounded bg-gray-100"
        aria-hidden="true"
      >
        <span className="text-xs text-gray-400">No image</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded bg-gray-100">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        priority={priority ?? false}
      />
    </div>
  );
}