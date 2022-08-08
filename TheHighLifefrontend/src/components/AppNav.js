import {
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  List,
  ListItem,
  Paper,
  Popper,
  withStyles,
} from "@material-ui/core";
import React from "react";
import CallIcon from "@material-ui/icons/Call";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../assets/img/highlife.PNG";
import { Link } from "react-router-dom";

const useStyles = (theme) => ({
  nav: {
    display: "flex",
    height: "auto",
    background: "white",
    paddingTop: "30px",
    paddingBottom: "5px",
    alignItems: "center",
    justifyContent: "space-around",
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-between",
      marginLeft: "5%",
      marginRight: "5%",
    },
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  link: {
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#3A8040",
      textDecoration: "underline",
    },
  },
  navContact: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  sectionMobile: {
    display: "inline",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  paper: {
    marginTop: "13px",
    // marginRight: '1px',
    borderTop: "1px solid",
    backgroundColor: "#ffff",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  paperroot: {
    width: "70px",
    maxWidth: 200,
    borderRadius: "10px",
    backgroundColor: theme.palette.background.paper,
  },

  btntransition: {
    backgroundSize: "200%",
    transition: "all ease 0.5s",
    cursor: "pointer",
    background: "linear-gradient(to left, #ffff 50%, #3A8040 50%) right",
    "&:hover": {
      backgroundPosition: "left",
      transform: `translateX(100 %)`,
    },
  },
  mobileViewMenuIcon: {
    fill: "#3A8040",
  },
  logo: {
    height: "100px",
    objectFit: "contain",
  },
});

class AppNav extends React.Component {
  state = { open: false };

  handleToggle = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.mobileMoreAnchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  isMobileMenuOpen = () => {
    return Boolean(this.mobileMoreAnchorEl);
  };

  renderMobileView = (classes) => {
    return (
      <Popper
        open={this.state.open}
        anchorEl={this.mobileMoreAnchorEl}
        transition
        disablePortal={false}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={this.handleClose}>
                <div className={classes.paperroot}>
                  <List component="nav" aria-label="nav bar items">
                    <ListItem button className={classes.btntransition}>
                      <Link to="/">Home</Link>
                    </ListItem>

                    <Divider />
                    <ListItem button className={classes.btntransition}>
                      <Link>Shop</Link>
                    </ListItem>
                    <Divider />
                    <ListItem button className={classes.btntransition}>
                      <Link>Sale</Link>
                    </ListItem>
                  </List>
                  <Divider />
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.nav}>
          <div>
            <Link to="/">
              <img className={classes.logo} src={Logo} alt="Logo Placeholder" />
            </Link>
          </div>
          {/* <div className={classes.navLink}>
            <div className={classes.link}>
              <Link
                to="/"
                style={{ color: "#3A8040", textDecoration: "underline" }}
              >
                Home
              </Link>
            </div>
            <div className={classes.link} style={{ marginLeft: "15%" }}>
              Shop
            </div>
            <div className={classes.link} style={{ marginLeft: "15%" }}>
              Sale{" "}
            </div>
          </div> */}
          <div className={classes.navContact}>
            <div style={{ marginTop: "5px" }}>
              <CallIcon fontSize="default" />
            </div>
            <div>
              <div>
                {" "}
                <b>Call To</b> +977 1234567895
              </div>
              <div>email : thehighlifeonline@gmail.com</div>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              buttonRef={(node) => {
                this.mobileMoreAnchorEl = node;
              }}
              className={classes.mobileViewMenuIconButton}
              aria-owns={this.open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={() => {
                this.setState({ open: !this.state.open });
              }}
            >
              <MenuIcon className={classes.mobileViewMenuIcon} />
            </IconButton>
          </div>
        </div>
        {this.renderMobileView(classes)}
      </>
    );
  }
}

export default withStyles(useStyles)(AppNav);
