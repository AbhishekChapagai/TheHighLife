import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PinterestIcon from "@material-ui/icons/Pinterest";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import RedditIcon from "@material-ui/icons/Reddit";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appTop: {
    display: "flex",
    backgroundColor: "#f7f8f9",
    height: "auto",
    paddingTop: "10px",
    paddingBottom: "5px",
    alignItems: "center",
    justifyContent: "space-around",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  appTopDiv: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
    },
  },

  appTopSocial: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  facebook: {
    color: "#4867AC",
  },
  linked: {
    color: "#1D7BB6",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  pinterest: {
    color: "#BE392A",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  twitter: {
    color: "#33ADEE",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  instagram: {
    color: "#D55086",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  youtube: {
    color: "#EF4A37",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  reddit: {
    color: "#EF4A37",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
    },
  },
  covid: {
    color: "#3A8040",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const AppTop = () => {
  const classes = useStyles();
  return (
    <div className={classes.appTop}>
      <div className={classes.appTopDiv}>Welcome to The High Life</div>
      <div className={classes.appTopDiv}>
        <a
          href="https://www.worldometers.info/coronavirus/"
          target="_blank"
          rel="noreferrer"
          className={classes.covid}
        >
          Covid 19 updates
        </a>
      </div>
      <div className={classes.appTopSocial}>
        <FacebookIcon fontSize="small" className={classes.facebook} />
        <LinkedInIcon fontSize="small" className={classes.linked} />
        <PinterestIcon fontSize="small" className={classes.pinterest} />
        <TwitterIcon fontSize="small" className={classes.twitter} />
        <InstagramIcon fontSize="small" className={classes.instagram} />
        <YouTubeIcon fontSize="small" className={classes.youtube} />
        <RedditIcon fontSize="small" className={classes.reddit} />
      </div>
    </div>
  );
};

export default AppTop;
