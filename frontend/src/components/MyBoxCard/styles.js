import { makeStyles } from "@material-ui/core/styles";

import { BORDER_RADIUS } from "configs/CSSvariables";

export const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(1),
    flexShrink: 0,
    maxWidth: 230
  },
  card: {
    backgroundColor: theme.palette.background.success,
    borderRadius: BORDER_RADIUS,
    padding: theme.spacing(2),
    cursor: "pointer"
  }
}));
