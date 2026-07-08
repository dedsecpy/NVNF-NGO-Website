export interface TickerSettings {
  message: string;
  href: string;
  enabled: boolean;
}

export const defaultTicker: TickerSettings = {
  message:
    "We are actively working on riverside flood relief in Sarlahi — families need food, shelter, and clean water.",
  href: "/get-involved",
  enabled: true,
};
