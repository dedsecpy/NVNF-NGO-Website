"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { useMotion } from "@/hooks/useMotion";
import { getTeamPhotoUrl, getInitials, getAvatarColorClass } from "@/lib/sanity/team-images";
import type { TeamMember } from "@/lib/sanity/types";

interface TeamProps {
  members: TeamMember[];
}

export function Team({ members }: TeamProps) {
  const { transition, stagger, prefersReducedMotion } = useMotion();

  return (
    <Section className="bg-white py-10 md:py-16" id="team">
      <Container>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-12 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Our team</p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
            The people behind NVNF
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => {
            const photoUrl = getTeamPhotoUrl(member);

            return (
              <motion.article
                key={member._id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: i * stagger }}
                className="text-center"
              >
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full ring-4 ring-sky/20">
                  {photoUrl ? (
                    <Image src={photoUrl} alt={member.name} fill className="object-cover" sizes="160px" />
                  ) : (
                    <div
                      className={cn(
                        "flex h-full w-full items-center justify-center font-display text-4xl font-bold text-white",
                        getAvatarColorClass(member._id)
                      )}
                      aria-hidden="true"
                    >
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>
                <h3 className="mt-5 text-lg font-bold text-charcoal">{member.name}</h3>
                <p className="text-sm font-semibold text-sky">{member.role}</p>
                {member.bio && <p className="mt-2 text-sm text-charcoal/70">{member.bio}</p>}
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
