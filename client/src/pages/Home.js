import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:3001/posts')
            .then((response) => {
                setListOfPosts(response.data)
            })
    }, [])

    const likeAPost = (postId) => {
        axios
            .post('http://localhost:3001/likes', {
                PostId: postId,
            },
                {
                    headers: {
                        accessToken: localStorage.getItem('accessToken')
                    }
                }
            )
            .then((response) => {
                console.log(response);
                setListOfPosts(listOfPosts.map((post) => {
                    console.log(post.Likes)
                    if (post.id === postId) {
                        if (response.data.liked === true) {
                            return ({ ...post, Likes: [...post.Likes, 'like added'] })
                        }
                        else {
                            const likeArray = post.Likes
                            likeArray.pop()
                            return ({ ...post, Likes: likeArray })
                        }

                    }

                }))
            })

    }

    const navigate = useNavigate()

    return (
        <div className="App">
            {
                listOfPosts.map((value, key) => {
                    return (
                        <div
                            key={key}
                            className='post'
                        >
                            <div
                                className='title'
                                onClick={() => {
                                    navigate(`post/${value.id}`)
                                }}
                            >
                                {value.title}
                            </div>
                            <div
                                className='body'
                                onClick={() => {
                                    navigate(`post/${value.id}`)
                                }}
                            >
                                {value.postText}
                            </div>
                            <div className='footer'>{value.username}
                                <button onClick={() => { likeAPost(value.id) }}>Like</button>
                                <label>{value.Likes.length}</label>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Home;
