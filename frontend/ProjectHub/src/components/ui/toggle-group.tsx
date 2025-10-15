// src/components/ui/toggle-group.tsx
import React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

// Root component for the toggle group
export const Root = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ToggleGroupPrimitive.Root>
>((props, ref) => <ToggleGroupPrimitive.Root {...props} ref={ref} />);

// Item component for individual toggle buttons
export const Item = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ToggleGroupPrimitive.Item>
>((props, ref) => <ToggleGroupPrimitive.Item {...props} ref={ref} />);
