"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "./button";
import { playClickSound, playHoverSound } from "@/lib/sounds";
import { VariantProps } from "class-variance-authority";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

interface InteractiveButtonProps extends ButtonProps {
  enableSound?: boolean;
}

export const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ enableSound = true, onClick, onMouseEnter, children, className, ...props }, ref) => {
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (enableSound) playClickSound();
        onClick?.(e);
      },
      [enableSound, onClick]
    );

    const handleHover = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (enableSound) playHoverSound();
        onMouseEnter?.(e);
      },
      [enableSound, onMouseEnter]
    );

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        style={{ display: "inline-block" }}
      >
        <Button
          ref={ref}
          onClick={handleClick}
          onMouseEnter={handleHover}
          className={className}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

InteractiveButton.displayName = "InteractiveButton";
