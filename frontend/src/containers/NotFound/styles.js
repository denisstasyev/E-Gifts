import { makeStyles } from "@material-ui/core/styles";

import { BORDER_RADIUS } from "configCSS";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "calc(100% - 56px)",
    // eslint-disable-next-line
    height: "calc(var(--vh, 1vh) * 100 - 56px)"
  },
  container: {
    overflowY: "auto",
    height: "100%"
  },
  box: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: BORDER_RADIUS
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  fab: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row-reverse"
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));
