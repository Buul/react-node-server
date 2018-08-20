import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import git from "~/assets/img/git.png";
import linkedin from "~/assets/img/in.png";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginTop: 18,
    backgroundColor: "#000000"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const Footer = props => (
  <div id="footer">
    <Button
      href="https://github.com/Buul"
      target="blank"
      variant="fab"
      aria-label="Add"
      mini
      className={props.classes.button}
    >
      <img id="logo" src={git} alt="Git" />
    </Button>
    <Button
      href="https://www.linkedin.com/in/paulofirmino/"
      target="blank"
      variant="fab"
      aria-label="Add"
      mini
      className={props.classes.button}
    >
      <img id="logo" src={linkedin} width="100%" alt="Git" />
    </Button>
    <div>
      <Typography color="inherit">© 2018 Paulo Firmino</Typography>
    </div>
  </div>
);

export default withStyles(styles)(Footer);
