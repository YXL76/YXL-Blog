import type { TimelineOppositeContentClassKey } from "@material-ui/lab";

interface LabComponentNameToClassKey {
  MuiTimelineOppositeContent: TimelineOppositeContentClassKey;
}

declare module "@material-ui/core/styles/overrides" {
  interface ComponentNameToClassKey extends LabComponentNameToClassKey {}
}
