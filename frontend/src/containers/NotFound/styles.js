import { makeStyles } from "@material-ui/core/styles";

import { BORDER_RADIUS } from "configCSS";

export const useStyles = makeStyles(theme => ({
  boxLogo: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: BORDER_RADIUS,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  flexTitle: {
    alignSelf: "flex-start",
    marginBottom: theme.spacing(1)
  },
  flexText: {
    alignSelf: "flex-start"
  },
  fab: {
    marginTop: theme.spacing(1),
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row-reverse"
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));
