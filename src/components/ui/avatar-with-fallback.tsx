"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AvatarWithFallbackProps {
  src?: string | null;
  alt: string;
  firstName?: string;
  lastName?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function AvatarWithFallback({
  src,
  alt,
  firstName = "",
  lastName = "",
  width = 48,
  height = 48,
  className = "",
}: AvatarWithFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get initials from first and last name
  const getInitials = () => {
    const firstInitial = firstName?.charAt(0)?.toUpperCase() || "";
    const lastInitial = lastName?.charAt(0)?.toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  };

  // Generate a consistent background color based on the name

  const shouldShowFallback = !src || imageError || !imageLoaded;

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden flex items-center justify-center",
        shouldShowFallback && "bg-primary",
        className
      )}
      style={{ width, height }}
    >
      {src && !imageError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-200",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {shouldShowFallback && (
        <span
          className="text-white font-semibold select-none"
          style={{ fontSize: `${Math.min(width, height) * 0.4}px` }}
        >
          {getInitials()}
        </span>
      )}
    </div>
  );
}
