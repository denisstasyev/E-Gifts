import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    // eslint-disable-next-line
    height: "calc(var(--vh, 1vh) * 100)"
  },
  rootMobile: {
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
  footer: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  context: {
    marginBottom: theme.spacing(2)
  },
  mail: {
    display: "flex",
    flexDirection: "column"
  },
  mailButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignSelf: "flex-end"
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  copyright: {
    textAlign: "center"
  }
}));
