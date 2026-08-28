import { Info } from "lucide-react";
import { Tooltip } from "react-tooltip";

export type TooltipWrapperProps = {
  tooltipId: string;
  tooltipContent: string;
};

export const TooltipWrapper = ({
  tooltipId,
  tooltipContent,
}: TooltipWrapperProps) => (
  <>
    <Info data-tooltip-id={tooltipId} data-tooltip-content={tooltipContent} />
    <Tooltip id={tooltipId} />
  </>
);
