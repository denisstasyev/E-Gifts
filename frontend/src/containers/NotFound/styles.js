import { makeStyles } from "@material-ui/core/styles";

import { MOBILE_WIDTH, BORDER_RADIUS } from "configCSS";

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
  boxes: {
    display: "flex",
    flexWrap: "wrap"
  },
  box1: {
    width: "50%",
    paddingRight: theme.spacing(1),
    // eslint-disable-next-line
    [`@media (max-width: ${MOBILE_WIDTH}px)`]: {
      paddingRight: 0,
      width: "100%"
    }
  },
  box2: {
    width: "50%",
    paddingLeft: theme.spacing(1),
    // eslint-disable-next-line
    [`@media (max-width: ${MOBILE_WIDTH}px)`]: { paddingLeft: 0, width: "100%" }
  },
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
