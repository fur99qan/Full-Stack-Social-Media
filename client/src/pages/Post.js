import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {

    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [newComment, setNewComment] = useState('');
    const [commentAdded, setCommentAdded] = useState(0);

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
                        accessToken: sessionStorage.getItem('accessToken')
                    }
                }
            )
            .then((response) => {
                if (response.data.error) console.log(response.data.error)
                setCommentAdded(commentAdded + 1);
                setNewComment('');
            })
    }

    return (

        <div className='postPage'>
            <div className='leftSide'>
                <div className='post' id='individual'>
                    <div className='title'>{postObject.title}</div>
                    <div className='body'>{postObject.postText}</div>
                    <div className='footer'>{postObject.username}</div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input
                        autoComplete='false'
                        type='text'
                        placeholder='Enter Comment Here'
                        value={newComment}
                        onChange={(e) => { setNewComment(e.target.value) }}
                    />
                    <button
                        type='submit'
                        onClick={addComment}>
                        Submit Comment
                    </button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>{comment.commentBody}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post