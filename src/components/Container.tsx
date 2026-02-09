import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("container-bc", className)}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
