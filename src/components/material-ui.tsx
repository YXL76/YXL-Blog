import {
  AppBar as MuiAppBar,
  Avatar as MuiAvatar,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Container as MuiContainer,
  Grid as MuiGrid,
  Typography as MuiTypography,
} from "@material-ui/core";
import { Button as MuiButton, Fab as MuiFab } from "gatsby-theme-material-ui";
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

export const Button = styled(MuiButton)(compose(borders, positions, spacing));

export const Card = styled(MuiCard)(
  compose(borders, display, flexbox, spacing, shadows)
);

export const CardMedia = styled(MuiCardMedia)(
  compose(borders, spacing, shadows, sizing)
);

export const Chip = styled(MuiChip)(compose(bgcolor, borders, typography));

export const Container = styled(MuiContainer)(compose());

export const Fab = styled(MuiFab)(compose());

export const Grid = styled(MuiGrid)(compose(spacing));

export const Typography = styled(MuiTypography)(compose(spacing, typography));
