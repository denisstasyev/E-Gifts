import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  fab: {
    alignSelf: "flex-end",
    marginTop: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
}));
