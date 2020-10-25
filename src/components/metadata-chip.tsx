import {
  AlarmOutlined,
  AvTimerOutlined,
  EventNoteOutlined,
} from "@material-ui/icons";
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
  clickable,
  label,
  icon,
}) => (
  <Chip
    className={`bg-transparent font-medium text-base ${className ?? ""}`}
    clickable={clickable}
    icon={icon}
    label={label}
  />
);

type BlogMetadataChipProps = {
  className?: string;
  iconClassName?: string;
  date?: string;
  words?: number;
  timeToRead?: number;
};

export const BlogMetadataChip: FC<BlogMetadataChipProps> = ({
  className,
  iconClassName,
  date,
  words,
  timeToRead,
}) => (
  <>
    <MetadataChip
      className={className}
      icon={<EventNoteOutlined className={iconClassName} />}
      label={date}
    />
    <MetadataChip
      className={className}
      icon={<AvTimerOutlined className={iconClassName} />}
      label={words}
    />
    <MetadataChip
      className={className}
      icon={<AlarmOutlined className={iconClassName} />}
      label={`${timeToRead ?? ""} min`}
    />
  </>
);
