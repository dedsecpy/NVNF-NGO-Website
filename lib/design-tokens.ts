export const animation = {
  duration: {
    entrance: 0.6,
    interaction: 0.3,
  },
  ease: [0.25, 0.1, 0.25, 1] as const,
  stagger: 0.1,
} as const;

export const shadows = {
  card: "0 4px 24px rgba(0,0,0,0.08)",
  hover: "0 12px 40px rgba(0,0,0,0.15)",
} as const;

export const colors = {
  saffron: "#E8690B",
  forest: "#1B4332",
  cream: "#F5F0E8",
  charcoal: "#1C1C1E",
  urgency: "#C0392B",
} as const;
