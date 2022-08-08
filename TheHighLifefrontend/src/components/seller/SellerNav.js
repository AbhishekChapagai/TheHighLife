import {
  Button,
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
import { Link } from "react-router-dom";
import Logo from "../../assets/img/highlife.PNG";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = (theme) => ({
  sellerNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    background: "white",
    paddingTop: "25px",
  },
  logo: {
    height: "100px",
    objectFit: "contain",
  },
  links: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  link: {
    textDecoration: "none",
    marginLeft: "5%",
    color: "#698362",
    "&:hover": {
      textDecoration: "underline",
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
    width: "100px",
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
});

class SellerNav extends React.Component {
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
                      {/* <Link to="/">Home</Link> */}
                      Category
                    </ListItem>

                    <Divider />
                    <ListItem button className={classes.btntransition}>
                      {/* <Link>Shop</Link> */}
                      Product
                    </ListItem>
                    <Divider />
                    <ListItem button className={classes.btntransition}>
                      {/* <Link>Sale</Link> */}
                      Profile
                    </ListItem>
                    <Divider />

                    {!localStorage.getItem("type") === undefined ||
                    localStorage.getItem("type") === "admin" ? (
                      <>
                        <ListItem button className={classes.btntransition}>
                          {/* <Link>Sale</Link> */}
                          Verify Seller
                        </ListItem>
                        <Divider />
                      </>
                    ) : null}

                    <ListItem button className={classes.btntransition}>
                      {/* <Link>Sale</Link> */}
                      Logout
                    </ListItem>
                  </List>
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
        <div className={classes.sellerNav}>
          <div>
            <Link to="/seller/home">
              <img className={classes.logo} src={Logo} alt="Logo Placeholder" />
            </Link>
          </div>
          <div className={classes.links}>
            <Link to="/seller/home" className={classes.link}>
              <b>Category</b>
            </Link>
            <Link to="/seller/product" className={classes.link}>
              <b>Product</b>
            </Link>
            <Link to="/seller/profile" className={classes.link}>
              <b>Profile</b>
            </Link>

            {!localStorage.getItem("type") === undefined ||
            localStorage.getItem("type") === "admin" ? (
              <Link to="/seller/users/verify" className={classes.link}>
                <b>Verify </b>
              </Link>
            ) : null}

            <Button
              className={classes.link}
              style={{
                textTransform: "none",
                background: "#698362",
                color: "white",
              }}
              component={Link}
              to={`${
                !localStorage.getItem("type") === undefined ||
                localStorage.getItem("type") === "admin"
                  ? "/admin/login"
                  : "/seller/login"
              }`}
              onClick={() => {
                localStorage.removeItem("JWTSeller");
                localStorage.removeItem("type");
              }}
            >
              Logout
            </Button>
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

export default withStyles(useStyles)(SellerNav);
