import Image, { ImageProps } from "next/image";

/**
 * Optimized Image Component
 * Automatically handles lazy loading, blur placeholder, and optimization
 */
export function OptimizedImage({
  src,
  alt,
  priority = false,
  className = "",
  ...props
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQ/9k="
      quality={85}
      className={className}
      {...props}
    />
  );
}

/**
 * Hero Image Component
 * For above-the-fold images, loads immediately
 */
export function HeroImage(props: ImageProps) {
  return <OptimizedImage {...props} priority={true} />;
}

/**
 * Lazy Image Component  
 * For below-the-fold images, loads when in viewport
 */
export function LazyImage(props: ImageProps) {
  return <OptimizedImage {...props} priority={false} />;
}
