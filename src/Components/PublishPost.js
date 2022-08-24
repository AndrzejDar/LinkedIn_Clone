import React, {useState} from "react";
import "./PublishPost.scss";
import TypeSelection from "./TypeSelection";
import {
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineNewspaper,
} from "react-icons/hi";
import {AiOutlineSend} from 'react-icons/ai'
import firebase from 'firebase/compat/app'
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";


const PublishPost = ({ className, db }) => {
  
  const user = useSelector(selectUser);

  const [input,setInput] = useState('');
  const [inputMedia,setInputMedia] = useState('');

  const addPost=(e)=>{
    e.preventDefault();

    db.collection('posts').add({
      author:{
        avatar: user.avatar? user.avatar : "../img/default_avatar.jpg",
        name: user.displayName,
        position: user.title,
        publication_date: firebase.firestore.FieldValue.serverTimestamp(),//insert loged user
      },
      text: input,
      media: inputMedia? inputMedia: '',
      interactions: {
        likes: [],
        hearts: [],
      }
    })

    setInput('');
  }


  return (
    <div className={className + " publishPost__container"}>
      <div className="publishPost__content">
        <div className="publishPost__avatar">
          <img src={user.avatar} />
        </div>
        <div className="publishPost__input">
          <form onSubmit={(e)=>{addPost(e)}}>
            <input type="text" value={input} onChange={e=>setInput(e.target.value)} placeholder="Zacznij publikację" />
            <button type="submit"><AiOutlineSend /></button>
          </form>
        </div>
      </div>
      <div className="publishPost__type_selection">
        <TypeSelection text="Zdjęcie" icon={<HiOutlinePhotograph />} />
        <TypeSelection text="Wideo" icon={<HiOutlineVideoCamera />} />
        <TypeSelection text="Napisz artykuł" icon={<HiOutlineNewspaper />} />
      </div>
    </div>
  );
};

export default PublishPost;
