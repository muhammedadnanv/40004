
import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  withPadding?: boolean;
  centered?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  fullWidth = false,
  withPadding = true,
  centered = true,
}: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        "w-full",
        fullWidth ? "" : "max-w-7xl mx-auto",
        withPadding ? "px-4 sm:px-6 md:px-8 lg:px-12" : "",
        centered ? "text-center" : "",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ResponsiveGrid({
  children,
  className,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
}: {
  children: React.ReactNode;
  className?: string;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}) {
  const getGridCols = () => {
    return `grid-cols-${columns.default} ${
      columns.sm ? `sm:grid-cols-${columns.sm}` : ""
    } ${columns.md ? `md:grid-cols-${columns.md}` : ""} ${
      columns.lg ? `lg:grid-cols-${columns.lg}` : ""
    } ${columns.xl ? `xl:grid-cols-${columns.xl}` : ""}`;
  };

  return (
    <div
      className={cn(
        "grid",
        getGridCols(),
        "gap-4 sm:gap-6 md:gap-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ResponsiveFlex({
  children,
  className,
  direction = "row",
  align = "center",
  justify = "between",
  wrap = true,
  gap = "default",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "col" | "row-reverse" | "col-reverse" | "responsive";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: "none" | "sm" | "default" | "md" | "lg";
}) {
  const getDirection = () => {
    if (direction === "responsive") return "flex-col sm:flex-row";
    if (direction === "row") return "flex-row";
    if (direction === "col") return "flex-col";
    if (direction === "row-reverse") return "flex-row-reverse";
    return "flex-col-reverse";
  };

  const getGap = () => {
    if (gap === "none") return "";
    if (gap === "sm") return "gap-2 sm:gap-3";
    if (gap === "md") return "gap-4 sm:gap-6";
    if (gap === "lg") return "gap-6 sm:gap-8";
    return "gap-4";
  };

  return (
    <div
      className={cn(
        "flex",
        getDirection(),
        `items-${align}`,
        `justify-${justify}`,
        wrap ? "flex-wrap" : "flex-nowrap",
        getGap(),
        className
      )}
    >
      {children}
    </div>
  );
}

export function ResponsiveText({
  children,
  className,
  size = "default",
  as = "p",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl";
  as?: "p" | "span" | "div";
}) {
  const Component = as;

  const getSize = () => {
    if (size === "xs") return "text-xs sm:text-sm";
    if (size === "sm") return "text-sm sm:text-base";
    if (size === "lg") return "text-base sm:text-lg md:text-xl";
    if (size === "xl") return "text-lg sm:text-xl md:text-2xl";
    if (size === "2xl") return "text-xl sm:text-2xl md:text-3xl lg:text-4xl";
    return "text-base";
  };

  return (
    <Component
      className={cn(
        getSize(),
        className
      )}
    >
      {children}
    </Component>
  );
}
