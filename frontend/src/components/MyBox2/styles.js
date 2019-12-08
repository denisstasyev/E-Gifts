import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  defaultBox: {
    marginTop: theme.spacing(8),
    paddingBottom: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));
