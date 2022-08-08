import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import axoisInstance, { headers } from "../../utils/axois";
var hdate = require("human-date");

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "25px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Comment = ({ product, setProduct, uid, form }) => {
  const [text, setText] = useState("");

  const classes = useStyles();

  const comment = (e) => {
    e.preventDefault();
    const obj = {
      productId: product._id,
      text: text,
      userId: uid,
    };

    axoisInstance
      .put("/product/comment", obj, {
        headers: headers,
      })
      .then((res) => {
        setText("");
        axoisInstance
          .get("/product/showall")
          .then((res) => {
            setProduct(res.data);
          })
          .catch((err) => {
            console.log(err);
            alert(err.response?.data?.message);
          });
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  };

  const deleteComment = (id) => {
    const obj = {
      productId: product._id,
      commentId: id,
    };
    axoisInstance
      .put("/product/uncomment", obj, {
        headers: headers,
      })
      .then((res) => {
        axoisInstance
          .get("/product/showall")
          .then((res) => {
            setProduct(res.data);
          })
          .catch((err) => {
            console.log(err);
            // alert(err.response?.data?.message);
          });
      })
      .catch((err) => {
        console.log(err?.response.data);
      });
  };

  return (
    <div>
      {form && (
        <form noValidate onSubmit={comment}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="comment"
            label="Comment"
            name="comment"
            autoComplete="comment"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#3A8040",
              color: "white",
              textTransform: "none",
            }}
            disabled={!text}
          >
            Comment
          </Button>
        </form>
      )}
      <hr />
      <br />

      {product.comments.map((comment) => (
        <Card key={comment._id} className={classes.root}>
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              {hdate.prettyPrint(comment.created)}
            </Typography>
            <Typography variant="body2" component="p">
              {comment.text}
            </Typography>
          </CardContent>

          {form && uid === comment.postedBy && (
            <CardActions>
              <Button size="small" onClick={() => deleteComment(comment._id)}>
                Delete
              </Button>
            </CardActions>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Comment;
