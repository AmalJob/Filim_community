import React, { useEffect } from "react";
import { Checkbox } from "@mui/material";
import "./Post.css";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import Favorite from "@mui/icons-material/Favorite";
import { useState } from "react";
import axios from "axios";




const user = localStorage.getItem("userInfo")
const User = JSON.parse(user)

console.log("kkk",User.user._id);

export default function Post({ post }) {
  console.log(post._id);
 
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = "http://localhost:3000/assets/";

  useEffect(() => {
    setIsLiked(post.likes.includes(User.user._id));
  }, [User.user._id, post.likes]);


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`);
      setUser(res.data);
    };



    fetchUser();
  }, []);


  const likeHandler = async () => {
    try {
   
      await axios.put("/posts/" + post._id + "/like", {
        userId: User.user._id,
      
      })
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader className="cardHeader"
        avatar={
          <Avatar  sx={{ bgcolor: "red" }} aria-label="recipe">
            <img className="postProfileImage" src={user.profilePicture ||PF + "person/noAvatar.png"} alt="" />
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={<Typography fontWeight={500}>{User.name}</Typography>}
        subheader="September 14, 2016"
      />

      <Typography sx={{ mb: 2, ml: 3 }}>hii all</Typography>
      <CardMedia
        component="img"
        height="20%"
        image="data:image/jpeg;base64,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"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <hr className="hrtag"></hr>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={post.likes.includes(User.user._id) ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder />}
            checkedIcon={post.likes.includes(User.user._id) ?<FavoriteBorder /> : <Favorite sx={{ color: "red" }} />}
            onClick={likeHandler}
          />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <span>{like}People like it</span>
      </CardActions>
    </Card>
  );
}
