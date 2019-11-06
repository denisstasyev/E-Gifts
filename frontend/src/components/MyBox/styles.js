import { makeStyles } from "@material-ui/core/styles";

import { BORDER_RADIUS } from "configCSS";

export const useStyles = makeStyles(theme => ({
  box: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: BORDER_RADIUS
  }
}));