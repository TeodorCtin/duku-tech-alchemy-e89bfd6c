import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface EliteTooltipProps {
  children: ReactNode;
  content: string | ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}

/**
 * Elite tooltip component with premium styling
 * Used for showing additional information on hover
 */
const EliteTooltip = ({ 
  children, 
  content, 
  side = "top",
  delayDuration = 300 
}: EliteTooltipProps) => {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className="bg-black/95 backdrop-blur-2xl border-primary/30 shadow-gold px-4 py-2 max-w-xs animate-scale-in"
        sideOffset={5}
      >
        <div className="text-sm">
          {content}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default EliteTooltip;
