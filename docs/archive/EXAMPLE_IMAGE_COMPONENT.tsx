// Example: How images will be integrated into project pages

import Image from "next/image";

// 1. Hero Image Component
export function ProjectHero({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative w-full h-[400px] md:h-[600px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <h1 className="absolute bottom-8 left-8 text-4xl md:text-6xl font-bold text-white">
        {title}
      </h1>
    </div>
  );
}

// 2. Image Gallery Component
export function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="relative h-64 group cursor-pointer overflow-hidden rounded-lg"
        >
          <Image
            src={image}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>
      ))}
    </div>
  );
}

// 3. Profile Photo Component
export function ProfilePhoto({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-zinc-800">
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
      />
    </div>
  );
}

// 4. Certificate Showcase Component
export function CertificateCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <p className="mt-2 text-center text-sm font-medium">{title}</p>
    </div>
  );
}

// Usage Example in Project Page:
/*
  <ProjectHero 
    image="/projects/excavator-operations/hero.jpg"
    title="Excavator Operations Excellence"
  />
  
  <article>
    <p>Project content...</p>
    
    <ImageGallery 
      images={[
        "/projects/excavator-operations/gallery-1.jpg",
        "/projects/excavator-operations/gallery-2.jpg",
        "/projects/excavator-operations/gallery-3.jpg",
      ]}
    />
  </article>
*/
