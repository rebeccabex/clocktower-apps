import { Info } from "lucide-react";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

export type TooltipWrapperProps = {
  tooltipId: string;
  tooltipContent: string;
};

export const TooltipWrapper = ({
  tooltipId,
  tooltipContent,
}: TooltipWrapperProps) => (
  <>
    <Info
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
      size={20}
    />
    <StyledTooltip id={tooltipId} />
  </>
);

const StyledTooltip = styled(Tooltip)`
  max-width: 400px;
  overflow-wrap: break-word;
`;
