import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { Chip } from '@mui/material';

function Post() {

    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [newComment, setNewComment] = useState('');
    const [commentAdded, setCommentAdded] = useState(0);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/posts/byId/${id}`)
            .then((response) => {
                setPostObject(response.data)
            })
    }, [id])

    useEffect(() => {
        axios
            .get(`http://localhost:3001/comments/${id}`)
            .then((response) => {
                setComments(response.data)
            })
    }, [id, commentAdded])

    const addComment = () => {
        axios
            .post('http://localhost:3001/comments', {
                commentBody: newComment,
                PostId: id,
            },
                {
                    headers: {
                        accessToken: localStorage.getItem('accessToken')
                    }
                }
            )
            .then((response) => {
                if (response.data.error) console.log(response.data.error)
                setCommentAdded(commentAdded + 1);
                setNewComment('');
            })
    }

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        return val.id !== id;
                    })
                );
            });
    };

    const deletePost = (id) => {
        axios
            .delete(`http://localhost:3001/posts/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                console.log(response.data);
                navigate('/');
            });
    }

    const editPost = (option) => {
        if (option === 'title') {
            let newTitle = prompt("Enter New Title:");
            axios.put('http://localhost:3001/posts/title', { newTitle: newTitle, id: id },
                {
                    headers: { accessToken: localStorage.getItem("accessToken") },
                }
            ).then((response) => {
                console.log(response.data)
                setPostObject({ ...postObject, title: newTitle })
            })
        } else {
            let newText = prompt("Enter New Body:")
            axios.put('http://localhost:3001/posts/postText', { newText: newText, id: id },
                {
                    headers: { accessToken: localStorage.getItem("accessToken") },
                }
            ).then((response) => {
                console.log(response.data)
                setPostObject({ ...postObject, postText: newText })
            })
        }

    }

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div
                        className="title"
                        onClick={() => {
                            if (authState.username === postObject.username) {
                                editPost("title");
                            }
                        }}
                    >
                        {postObject.title}
                    </div>
                    <div
                        className="body"
                        onClick={() => {
                            if (authState.username === postObject.username) {
                                editPost("body");
                            }
                        }}
                    >
                        {postObject.postText}
                    </div>
                    <div className="footer">
                        <Link className="link" to={`/profile/${postObject.UserId}`}>{postObject.username}</Link>

                        <br />
                        <div className='buttons'>
                            {authState.username === postObject.username && <Chip color='error' icon={<DeleteIcon />} label="Delete Post" onClick={() => {
                                deletePost(postObject.id)
                            }}
                            />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input
                        type="text"
                        placeholder="Comment..."
                        autoComplete="off"
                        value={newComment}
                        onChange={(event) => {
                            setNewComment(event.target.value);
                        }}
                    />
                    <button onClick={addComment}> Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className="comment">
                                {comment.commentBody}
                                <label> Username: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button
                                        onClick={() => {
                                            deleteComment(comment.id);
                                        }}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post