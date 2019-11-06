import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  step: {
    marginBottom: theme.spacing(1)
  },
  marker: {
    position: "fixed",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  fab: {
    marginTop: theme.spacing(1),
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row-reverse"
  }
}));
