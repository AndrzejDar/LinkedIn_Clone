import React, { useState, useEffect } from "react";
import { FaEllipsisH, FaThumbsUp, FaHeart } from "react-icons/fa";

import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase from "firebase/compat/app";
import PostComment from "./PostComment";
import PostActions from "./PostActions";
import OptionDropdown from "./OptionDropdown";
import OptionModal from "./OptionModal";

const Post = ({ post, setPosts, id }) => {
  const user = useSelector(selectUser);
  const postRef = db.collection("posts").doc(post.id);
  // console.log("RENDERUJE OD NOWA KOMPONENT" + post.data?.text);
  //   console.log(post.data?.interactions?.likes.length);
  const [liked, setLiked] = useState();
  const [comment, setComment] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  useEffect(() => {
    //check if post was liked by current user
    {
      post?.data?.interactions.likes.includes(user.uid)
        ? setLiked(true)
        : setLiked(false);
    }
  }, []);

  const onInteraction = async () => {
    console.log("kliklem");
    //check if post is not liked by user
    if (!post.data.interactions.likes.find((i) => i === user.uid)) {
      //if not add user ti liked list

      postRef
        .update({
          interactions: {
            likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
          },
        })
        .catch((err) => alert(err));
      setLiked(true);
    } else {
      //if already liked -> unlike
      //remove user id slpicing by index

      const index = post.data.interactions.likes.indexOf(user.uid);
      postRef.update({
        interactions: {
          likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
        },
      });
      setLiked(false);
    }
  };

  const onComment = () => {
    setCommenting(!commenting);
  };

  const onCommentLike = (id, id2 = 0, layer = 1) => {
    //check if commment liked by the user then add or remove id from interaction array of that comment
    postRef.get().then((arry) => {
      let commentArry = arry.data().comments[id];
      postRef.update({
        comments: firebase.firestore.FieldValue.arrayRemove(commentArry),
      });
      if (layer === 1) {
        commentArry.interactions.includes(user.uid)
          ? (commentArry.interactions = [
              ...commentArry?.interactions.filter((record) => {
                return record != user.uid;
              }),
            ])
          : (commentArry.interactions = [
              ...commentArry?.interactions,
              user.uid,
            ]);
      } else {
        commentArry.responses[id2]?.interactions.includes(user.uid)
          ? (commentArry.responses[id2].interactions = [
              ...commentArry?.responses[id2]?.interactions?.filter((record) => {
                return record != user.uid;
              }),
            ])
          : (commentArry.responses[id2].interactions = [
              ...commentArry?.responses[id2]?.interactions,
              user.uid,
            ]);
      }
      postRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentArry),
      });
    });
  };

  const onSubCommentSubmit = (commentId, subComment) => {
    //fetch whole comment array - update it and replace in db (firestore dont allow changing specific record inside array)
    postRef.get().then((arry) => {
      let commentArry = arry.data().comments[commentId];
      //deleting old data
      postRef.update({
        comments: firebase.firestore.FieldValue.arrayRemove(commentArry),
      });
      //preparing new
      commentArry.responses = [
        ...commentArry.responses,
        {
          author: {
            avatar: user.avatar,
            name: user.displayName,
            position: user.title,
            publication_date: firebase.firestore.Timestamp.now(),
          },
          interactions: [],
          comment: subComment,
        },
      ];
      //saving new data
      postRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentArry),
      });
    });
  };
  const onCommentSubmit = (e) => {
    e.preventDefault();
    console.log("submit commenta" + comment);

    postRef
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          author: {
            avatar: user.avatar,
            name: user.displayName,
            position: user.title,
            publication_date: firebase.firestore.Timestamp.now(),
          },
          comment: comment,
          interactions: [],
          responses: [],
        }),
      })
      .catch((err) => alert(err));
    setComment("");
    setCommenting(false);
  };

  const onOption = () => {};

  return post.id ? (
    <div className="feed_post frame" key={id}>
      <div
        className="feed_post-options"
        tabIndex="0"
        onBlur={() => {
          setOptionsOpen(false)
        }}

        onClick={() => {
          setOptionsOpen(!optionsOpen);
        }}
      >
        <FaEllipsisH />
        <OptionModal
          open={optionsOpen}
          options={[
            { action: 1, label: "option 1" },
            { action: 2, label: "option 2" },
            { action: 3, label: "option 3" },
          ]}
        />
        {/* <OptionDropdown label={<FaEllipsisH />} options={[{value: 1, label:'label 1'},{value: 2, label:'label 2'},{value: 3, label:'label 3'},]} /> */}
      </div>
      <div className="feed_post-header">
        <div className="feed_post-avatar">
          <img src={post.data?.author?.avatar} />
        </div>
        <div className="feed_post-header-details">
          <span>{post.data.author?.name}</span>
          <span>{post.data.author?.position}</span>
          <span>
            {new Date(
              post.data.author?.publication_date?.seconds * 1000
            ).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="feed_post-body">
        <p>{post.data.text}</p>
        <div className="feed_post-media">
          <img src={post.data.media} />
        </div>
      </div>
      <div className="feed_post-footer">
        <div className="interactions">
          <div className="like-interactions">
            {post.data.interactions?.likes.length > 0 ? (
              <>
                <span>{post.data?.interactions.likes.length}</span>{" "}
                <FaHeart style={{ color: "red" }} />
              </>
            ) : (
              ""
            )}
            {/* {post.data.interactions?.hearts ? <FaThumbsUp /> : ""} */}
          </div>
          <div className="sharing-interactions">
            <span>
              {post.data.comments?.length} comments · {post?.shares?.length}{" "}
              udostępnienia
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <PostActions
          liked={liked}
          onInteraction={onInteraction}
          onComment={onComment}
        />
        <div className="comments-section">
          {commenting ? (
            <div className="add-comment">
              <div className="avatar">
                <img src="../img/face.jpg" />
              </div>
              <div className="add-comment-field">
                <form onSubmit={(e) => onCommentSubmit(e)}>
                  <input
                    type="text"
                    placeholder="Dodaj komentarz"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></input>
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="comment-feed">
            <select id="Najistotniejsze" name="sorting">
              <option value="top">Najistotniejsze</option>
              <option value="newest">najnowsze</option>
            </select>
            <div className="comment-feed-comments">
              {post.data.comments?.length > 0
                ? post.data.comments
                    .sort((a, b) => {
                      return (
                        b.author.publication_date - a.author.publication_date
                      );
                    })
                    .map((comment, id) => (
                      <PostComment
                        className="comment"
                        comment={comment}
                        layer={1}
                        onCommentLike={onCommentLike}
                        onSubCommentSubmit={onSubCommentSubmit}
                        liked={comment.interactions?.includes(user.uid)}
                        commentId={id}
                      />
                    ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Post;
