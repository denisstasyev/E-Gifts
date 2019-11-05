import { makeStyles } from "@material-ui/core/styles";

import { hexToRgb } from "utils";
import { MOBILE_WIDTH, BORDER_RADIUS } from "configCSS";

import NoEImage from "static/home/no_e.svg";
import NoGImage from "static/home/no_g.svg";

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
  boxEG: {
    display: "flex",
    flexWrap: "wrap"
  },
  boxE: {
    width: "50%",
    paddingRight: theme.spacing(1),
    // eslint-disable-next-line
    [`@media (max-width: ${MOBILE_WIDTH}px)`]: {
      paddingRight: 0,
      width: "100%"
    }
  },
  boxG: {
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
  boxImage: {
    width: "100%",
    maxWidth: 200,
    margin: 40
  },
  boxImageNoE: {
    background: `url(${NoEImage})`,
    backgroundRepeat: "no-repeat"
  },
  boxImageE: {
    filter: `drop-shadow(0 5px 5px rgba(${hexToRgb(
      theme.palette.primary.main
    )}, 0.4))`
  },
  boxImageNoG: {
    background: `url(${NoGImage})`,
    backgroundRepeat: "no-repeat"
  },
  boxImageG: {
    filter: `drop-shadow(0 5px 5px rgba(${hexToRgb(
      theme.palette.primary.main
    )}, 0.4))`
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  flexTitle: {
    alignSelf: "flex-start"
  },
  boxText: {
    display: "flex",
    alignSelf: "flex-start"
  },
  boxTextLetter: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2)
  },
  step: {
    marginBottom: theme.spacing(1)
  },
  startIcon: {
    marginRight: theme.spacing(1)
  },
  fab: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row-reverse"
  }
}));
