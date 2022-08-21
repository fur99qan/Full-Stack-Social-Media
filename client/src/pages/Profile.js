import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext'

function Profile() {

    const [username, setUserName] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const navigate = useNavigate()
    const { authState } = useContext(AuthContext);
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:3001/auth/basicinfo/${id}`)
            .then((response) => {
                setUserName(response.data.username)
            });

        axios
            .get(`http://localhost:3001/posts/byuserId/${id}`)
            .then((response) => {
                console.log(response.data)
                setListOfPosts(response.data)
            })

    }, [])

    const likeAPost = (postId) => {
        axios
            .post(
                "http://localhost:3001/likes",
                { PostId: postId },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            )
            .then((response) => {
                setListOfPosts(
                    listOfPosts.map((post) => {
                        if (post.id === postId) {
                            if (response.data.liked) {
                                return { ...post, Likes: [...post.Likes, 0] };
                            } else {
                                const likesArray = post.Likes;
                                likesArray.pop();
                                return { ...post, Likes: likesArray };
                            }
                        } else {
                            return post;
                        }
                    })
                );

                if (likedPosts.includes(postId)) {
                    setLikedPosts(
                        likedPosts.filter((id) => {
                            return id !== postId;
                        })
                    );
                } else {
                    setLikedPosts([...likedPosts, postId]);
                }
            });
    };



    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1>Username:{username}</h1>
                {authState.username === username && <button onClick={() => { navigate('/changepassword') }}>Change My Password</button>}
            </div>
            <div className='listOfPosts'>
                {listOfPosts.map((value, key) => {
                    return (
                        <div key={key} className="post">
                            <div className="title"> {value.title} </div>
                            <div
                                className="body"
                                onClick={() => {
                                    navigate(`/post/${value.id}`);
                                }}
                            >
                                {value.postText}
                            </div>
                            <div className="footer">
                                <div className="username">{value.username}</div>
                                <div className="buttons">
                                    <ThumbUpAltIcon
                                        onClick={() => {
                                            likeAPost(value.id);
                                        }}
                                        className={
                                            likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                                        }
                                    />
                                    <label> {value.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Profile