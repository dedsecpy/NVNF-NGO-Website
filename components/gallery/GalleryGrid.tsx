"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getGalleryImageSrc } from "@/lib/sanity/gallery-images";
import type { GalleryItem } from "@/lib/sanity/types";

interface GalleryGridProps {
  items: GalleryItem[];
}

type Filter = "all" | "photo" | "video";

export function GalleryGrid({ items }: GalleryGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "photo", label: "Photos" },
    { value: "video", label: "Videos" },
  ];

  return (
    <>
      <div className="mb-8 flex justify-center gap-2" role="tablist" aria-label="Gallery filter">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-sky text-white"
                : "bg-white text-charcoal shadow-sm hover:bg-sky/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const imageUrl = getGalleryImageSrc(item);

          return (
            <button
              key={item._id}
              type="button"
              onClick={() => setLightbox(item)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-card"
              aria-label={`View ${item.title}`}
            >
              <Image
                src={imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white opacity-0 transition-opacity group-hover:opacity-100">
                <p className="font-medium">{item.title}</p>
                {item.category === "video" && (
                  <span className="text-xs text-sky-pale">Video</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/90 p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[90vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white hover:text-sky-pale"
                aria-label="Close lightbox"
              >
                Close
              </button>
              {lightbox.category === "video" && lightbox.videoUrl ? (
                <iframe
                  src={lightbox.videoUrl}
                  title={lightbox.title}
                  className="aspect-video w-full rounded-xl"
                  allowFullScreen
                />
              ) : (
                <div className="relative aspect-video w-full">
                  <Image
                    src={getGalleryImageSrc(lightbox)}
                    alt={lightbox.title}
                    fill
                    className="rounded-xl object-contain"
                    sizes="90vw"
                  />
                </div>
              )}
              <p className="mt-4 text-center text-white">{lightbox.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
