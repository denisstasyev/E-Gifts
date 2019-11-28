import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  views: {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    width: "100%"
  },
  mobileStepper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  details: {
    width: "100%"
  },
  chip: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  price: {
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(2)
  },

  stepper: {
    backgroundColor: theme.palette.background.default
  },
  step: {
    marginBottom: theme.spacing(1)
  },
  messages: {
    display: "flex",
    overflowY: "auto",
    margin: theme.spacing(2)
  },
  check: {
    marginTop: theme.spacing(1)
  },
  message: {
    marginTop: theme.spacing(2),
    display: "flex"
  },
  clear: {
    marginLeft: theme.spacing(2)
  },

  mail: {
    marginTop: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  socialText: {
    marginLeft: theme.spacing(1)
  },
  link: {
    marginTop: theme.spacing(2)
  },
  copy: {
    marginTop: theme.spacing(2)
  },
  buttons: {
    marginTop: theme.spacing(1)
  },

  fab: {
    marginTop: theme.spacing(1),
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row-reverse"
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  text: {
    alignSelf: "flex-start"
  }
}));
