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

    const navigate = useNavigate()

    return (
        <div className="App">
            {
                listOfPosts.map((value, key) => {
                    return (
                        <div
                            key={key}
                            className='post'
                            onClick={() => {
                                navigate(`post/${value.id}`)
                            }}>
                            <div className='title'>{value.title}</div>
                            <div className='body'>{value.postText}</div>
                            <div className='footer'>{value.username}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Home;
