import React from "react";
import * as Sentry from "@sentry/browser";

import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import App from "App";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN
});

class SentryErrorLogger extends React.PureComponent {
  state = { error: null, eventId: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return (
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Typography variant="h5" style={{ margin: "10%" }}>
            Sorry, an error occured. You can help us by sending Feedback.
          </Typography>
          <Fab
            variant="extended"
            size="medium"
            onClick={() =>
              Sentry.showReportDialog({ eventId: this.state.eventId })
            }
          >
            Report Feedback
          </Fab>
        </div>
      );
    } else {
      return <App />;
    }
  }
}

export default SentryErrorLogger;
