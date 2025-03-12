"use client";

import styles from "./Skeleton.module.css";
import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  lines?: number;
  className?: string;
  variant?: "text" | "rect" | "circle";
}

export default function Skeleton({
  width = "100%",
  height = "20px",
  lines = 1,
  className = "",
  variant = "rect",
}: SkeletonProps) {
  const skeletonStyle = {
    width,
    height: variant === "text" ? "1em" : height,
    borderRadius: variant === "circle" ? "50%" : "4px",
  };

  if (lines > 1 && variant === "text") {
    return (
      <div className={`${styles.skeletonContainer} ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${styles.skeleton} ${styles.shimmer}`}
            style={{
              ...skeletonStyle,
              marginBottom: index < lines - 1 ? "8px" : "0",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${styles.skeleton} ${styles.shimmer} ${className}`}
      style={skeletonStyle}
    />
  );
}
