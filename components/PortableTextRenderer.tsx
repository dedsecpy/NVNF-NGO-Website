"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { getImageUrl } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref: string }; alt?: string } }) => {
      const url = value.asset ? getImageUrl(value as never, 800, 500) : undefined;
      if (!url) return null;
      return (
        <div className="relative my-8 h-64 w-full overflow-hidden rounded-xl">
          <Image src={url} alt={value.alt ?? ""} fill className="object-cover" sizes="800px" />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 text-2xl font-bold text-charcoal">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-xl font-semibold text-charcoal">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 leading-relaxed text-charcoal/80">{children}</p>
    ),
  },
};

interface PortableTextRendererProps {
  value: PortableTextBlock[];
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}
