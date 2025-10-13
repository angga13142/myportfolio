// Project images configuration
export const projectImages: Record<string, Array<{ src: string; alt: string }>> = {
  "excavator-operations": [
    {
      src: "/projects/excavator-operations/excavator-operation.jpg",
      alt: "Excavator operation at mining site",
    },
    {
      src: "/projects/excavator-operations/excavator-operation2.jpg",
      alt: "Excavator loading material",
    },
  ],
  "nickel-mining-operations": [
    {
      src: "/projects/nickel-mining/nickel-mining.jpg",
      alt: "Nickel mining operations overview",
    },
    {
      src: "/projects/nickel-mining/nickel-mine.jpg",
      alt: "Mining site with excavator",
    },
  ],
  "safety-implementation": [
    {
      src: "/projects/safety-implementation/safety.jpg",
      alt: "Safety protocols in action",
    },
    {
      src: "/projects/safety-implementation/safety-implement.jpg",
      alt: "Safety implementation at work site",
    },
  ],
  "equipment-maintenance-excellence": [
    {
      src: "/projects/equipment-maintenance/equipment-coordination.jpg",
      alt: "Equipment coordination and maintenance",
    },
    {
      src: "/projects/equipment-maintenance/team-meeting.jpg",
      alt: "Team meeting for maintenance planning",
    },
  ],
  "team-coordination-excellence": [
    {
      src: "/projects/team-coordination/team-coordination.jpg",
      alt: "Team coordination at mining site",
    },
    {
      src: "/projects/team-coordination/miningteam.jpg",
      alt: "Mining team coordination",
    },
  ],
  "productivity-improvement": [
    {
      src: "/projects/productivity-improvement/production.jpg",
      alt: "Production operations",
    },
    {
      src: "/projects/productivity-improvement/productions.jpg",
      alt: "Productivity improvement in action",
    },
  ],
};

export function getProjectImages(slug: string) {
  return projectImages[slug] || [];
}

export function getHeroImage(slug: string) {
  const images = projectImages[slug];
  return images && images.length > 0 ? images[0].src : null;
}
