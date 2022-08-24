import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaEllipsisH, FaThumbsUp, FaHeart } from "react-icons/fa";
import "./PostComment.scss";
import { selectUser } from "../features/userSlice";
import OptionModal from "./OptionModal";


const PostComment = ({
  className,
  comment,
  layer,
  onSubCommentSubmit,
  onCommentLike,
  liked,
  commentId,
}) => {
  const [subCommenting, setSubCommenting] = useState(false);
  const [subComment, setSubComment] = useState("");
  const [commentLiked, setCommentLiked] = useState(liked);
  const user = useSelector(selectUser);
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <div className={className} key={commentId}>
      <div className="comment-avatar">
        <img
          src={
            comment.author?.avatar
              ? comment.author.avatar
              : "../img/default_avatar.jpg"
          }
        />
      </div>
      <div className="comment-content">
        <div className="comment-content-frame">
          <div className="comment-options"
            tabIndex={0}
            onClick={()=>{ setOptionsOpen(!optionsOpen)}}
            onBlur={()=>{ setOptionsOpen(false)}}
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
          </div>
          <div className="comment-header">
            <div>
              <span>{comment.author?.name}</span>
              <span>
                {new Date(
                  comment.author?.publication_date.seconds * 1000
                ).toLocaleString()}
              </span>
            </div>
            <span>{comment.author?.position}</span>
          </div>
          <div className="comment-body">{comment.comment}</div>
        </div>
        <div className="comment-footer">
          <div
            onClick={() => onCommentLike(commentId)}
            style={liked ? { color: "#0a66c2", display: 'flex', 'flex-direction': 'row' } : {display: 'flex', 'flex-direction': 'row'}}
            
          >
            <span>like</span>
            <span>
              <FaThumbsUp />
            </span>
          </div>
          {layer === 1 ? (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setSubCommenting(!subCommenting)}
            >
              Odpowiedz
            </span>
          ) : (
            ""
          )}
        </div>
        {subCommenting ? (
          <div className="add-comment">
            <div className="avatar">
              <img
                src={user.avatar ? user.avatar : "../img/default_avatar.jpg"}
              />
            </div>
            <div className="add-comment-field">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubCommentSubmit(commentId, subComment);
                  setSubComment("");
                  setSubCommenting(false);
                }}
              >
                <input
                  type="text"
                  placeholder="Dodaj komentarz"
                  value={subComment}
                  onChange={(e) => setSubComment(e.target.value)}
                ></input>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        {comment.responses?.length > 0
          ? comment.responses.map((response, id) => (
              <PostComment
                className="subComment"
                comment={response}
                responses={response.responses}
                layer={layer + 1}
                onSubCommentSubmit={onSubCommentSubmit}
                onCommentLike={()=>onCommentLike(commentId, id, 2)}
                liked={response.interactions?.includes(user.uid)}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default PostComment;
