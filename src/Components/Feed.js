import React, { useState, useEffect } from "react";
import "./Feed.scss";
import { FaEllipsisH, FaThumbsUp, FaHeart } from "react-icons/fa";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineSwap,
  AiOutlineSend,
} from "react-icons/ai";
import PublishPost from "./PublishPost";
import { db } from "../firebase";
import Post from "./Post";

const Feed = () => {
  let initPosts = [
    {
      author: {
        avatar: "../img/face.jpg",
        name: "Imię Nazwisko",
        position: "Project anger",
        publication_date: "2020.20.20, 14:12",
      }, //docelowo link do profilu (zdjęcie, imie nazwisko, tytuł, czas publikacjki)
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum tempora consectetur maxime, eveniet, nihil nisi eaque, aut culpa amet dolorum? Nulla quam cupiditate earum. Placeat esse consequatur unde.",
      media: "../img/tmp_img.jpg",
      interactions: {
        likes: 10,
        hearts: 20,
      },
      comments: [
        {
          author: {
            avatar: "../img/face.jpg",
            name: "Imię Nazwisko",
            position: "Project anger",
            publication_date: "2020.20.20, 14:12",
          },
          comment: "temp comment1",
          interactions: [],
          response: [
            {
              author: {
                avatar: "../img/face.jpg",
                name: "Imię Nazwisko",
                position: "Project anger",
                publication_date: "2020.20.20, 14:12",
              },
              comment: "temp comment1.1",
            },
            {
              author: {
                avatar: "../img/face.jpg",
                name: "Imię Nazwisko",
                position: "Project anger",
                publication_date: "2020.20.20, 14:12",
              },
              comment: "temp comment1.2",
            },
          ],
        },
        {
          author: {
            avatar: "../img/face.jpg",
            name: "Imię Nazwisko",
            position: "Project anger",
            publication_date: "2020.20.20, 14:12",
          },
          comment: "temp comment2",
        },
        {
          author: {
            avatar: "../img/face.jpg",
            name: "Imię Nazwisko",
            position: "Project anger",
            publication_date: "2020.20.20, 14:12",
          },
          comment: "temp comment3",
        },
      ],
      shares: [
        {
          author: "author",
        },
        {
          author: "author2",
        },
        {
          author: "author3",
        },
      ],
    },
    {
      author: {
        avatar: "../img/face.jpg",
        name: "Imię Nazwisko 2",
      }, //docelowo link do profilu (zdjęcie, imie nazwisko, tytuł, czas publikacjki)
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum tempora consectetur maxime, eveniet, nihil nisi eaque, aut culpa amet dolorum? Nulla quam cupiditate earum. Placeat esse consequatur unde.",
      media: "../img/tmp_img.jpg",
      interactions: {
        likes: 12,
        hearts: 22,
      },
      comments: [
        {
          author: "author",
          comment:
            "temp comment1, Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum tempora consectetur maxime, eveniet, nihil nisi eaque, aut culpa amet dolorum? Nulla quam cupiditate earum. Placeat esse consequatur unde.",
        },
        {
          author: "author2",
          comment:
            "temp comment2, Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum tempora consectetur maxime, eveniet, nihil nisi eaque, aut culpa amet dolorum? Nulla quam cupiditate earum. Placeat esse consequatur unde.",
        },
        {
          author: "author3",
          comment: "temp comment3",
        },
      ],
      shares: [
        {
          author: "author",
        },
        {
          author: "author2",
        },
        {
          author: "author3",
        },
      ],
    },
  ]; //tmp data

  useEffect(() => {
    db.collection("posts")
      .orderBy("author.publication_date", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const [posts, setPosts] = useState([{ author: "", media: "", text: "asd" }]);

  return (
    <div className="feed_container">
      <PublishPost className="frame" db={db} />
      {console.log(posts)}
      {posts
      .sort((a,b)=>{
        // console.log(a.author);
        return b.data.author.publication_date?.seconds-a.data.author.publication_date?.seconds
      })
      .map((post, id) => (
          <Post post={post} setPosts={setPosts} id={id} />
      ))}
    </div>
  );
};

export default Feed;
