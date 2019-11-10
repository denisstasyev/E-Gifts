import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  step: {
    marginBottom: theme.spacing(1)
  },
  mobileButton: {
    marginTop: theme.spacing(2)
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
