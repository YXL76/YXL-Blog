import {
  AppBar as MuiAppBar,
  Avatar as MuiAvatar,
  ButtonBase as MuiButtonBase,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Container as MuiContainer,
  Grid as MuiGrid,
  Typography as MuiTypography,
} from "@material-ui/core";
import {
  BottomNavigationAction as MuiBottomNavigationAction,
  Button as MuiButton,
  CardActionArea as MuiCardActionArea,
  Fab as MuiFab,
  GatsbyLink as MuiGatsbyLink,
  IconButton as MuiIconButton,
  Link as MuiLink,
} from "gatsby-theme-material-ui";
import {
  bgcolor,
  borders,
  compose,
  display,
  flexbox,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
} from "@material-ui/system";
import { styled } from "@material-ui/core/styles";

export { Box } from "@material-ui/core";

export const AppBar = styled(MuiAppBar)(compose());

export const Avatar = styled(MuiAvatar)(compose(sizing, shadows));

export const Button = styled(MuiButton)(
  compose(borders, display, flexbox, positions, spacing)
);

export const ButtonBase = styled(MuiButtonBase)(
  compose(borders, display, shadows, spacing, sizing)
);

export const BottomNavigationAction = styled(MuiBottomNavigationAction)(
  compose()
);

export const Card = styled(MuiCard)(
  compose(borders, display, flexbox, shadows, spacing)
);

export const CardActionArea = styled(MuiCardActionArea)(compose());

export const CardMedia = styled(MuiCardMedia)(
  compose(borders, shadows, spacing, sizing)
);

export const Chip = styled(MuiChip)(
  compose(bgcolor, borders, spacing, typography)
);

export const Container = styled(MuiContainer)(compose());

export const Fab = styled(MuiFab)(compose());

export const GatsbyLink = styled(MuiGatsbyLink)(compose(sizing));

export const Grid = styled(MuiGrid)(compose(spacing));

export const IconButton = styled(MuiIconButton)(compose());

export const Link = styled(MuiLink)(compose(sizing, spacing, typography));

export const Typography = styled(MuiTypography)(
  compose(display, sizing, spacing, typography)
);
