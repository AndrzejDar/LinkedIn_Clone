import React from 'react';
import {
    AiOutlineLike,
    AiFillLike,
    AiOutlineComment,
    AiOutlineSwap,
    AiOutlineSend,
  } from "react-icons/ai";

  import './PostActions.scss';

const PostActions = ({liked, onInteraction, onComment}) => {
  return (
    <div className="actions">
    <span onClick={() => onInteraction()}>
      {liked ? <AiFillLike className="accent" /> : <AiOutlineLike />}
      Poleć
    </span>
    <span onClick={() => onComment()}>
      <AiOutlineComment />
      Skomentuj
    </span>
    <span className='disabled'>
      <AiOutlineSwap />
      Udostępnij
    </span>
    <span className='disabled'>
      <AiOutlineSend />
      Wyślij
    </span>
  </div>
  )
}

export default PostActions