import type { FC } from "react";
import React from "react";

type TabPanelProps = {
  index: number;
  value: number;
};

export const TabPanel: FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && children}
  </div>
);
