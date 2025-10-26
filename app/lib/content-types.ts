// Content data storage
export interface VideoData {
  id: string;
  title: string;
  youtubeId: string;
  category: "operations" | "safety" | "training" | "achievement";
  duration: string;
  description?: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  videoUrl: string;
  rating: number;
  date: string;
  text: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
  caption?: string;
  order: number;
}

export interface ContentData {
  operationsVideos: VideoData[];
  testimonials: TestimonialData[];
  gallery: GalleryImage[];
  lastUpdated: string;
}
