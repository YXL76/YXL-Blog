import type { FC, ReactElement, ReactNode } from "react";
import { Chip } from ".";

type MetadataChipProps = {
  className?: string;
  avatar?: ReactElement;
  clickable?: boolean;
  label?: ReactNode;
  icon?: ReactElement;
};

export const MetadataChip: FC<MetadataChipProps> = ({
  className,
  avatar,
  clickable,
  label,
  icon,
}) => (
  <Chip
    className={`bg-transparent font-medium text-base ${className ?? ""}`}
    clickable={clickable}
    avatar={avatar}
    icon={icon}
    label={label}
  />
);
