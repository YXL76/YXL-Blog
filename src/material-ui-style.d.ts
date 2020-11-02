import type { ComponentsOverrides } from "@material-ui/core";
import type { TimelineOppositeContentClassKey } from "@material-ui/lab";

interface LabComponentNameToClassKey {
  MuiTimelineOppositeContent: TimelineOppositeContentClassKey;
}

declare module "@material-ui/core/styles/overrides" {
  interface ComponentNameToClassKey extends LabComponentNameToClassKey {}
}

interface LabComponents {
  MuiTimelineOppositeContent?: {
    styleOverrides?: ComponentsOverrides["MuiTimelineOppositeContent"];
  };
}

declare module "@material-ui/core/styles/components" {
  interface Components extends LabComponents {}
}
