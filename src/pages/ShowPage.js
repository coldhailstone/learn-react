import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

function ShowPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    
    const getPost = async (id) => {
        const response = await axios.get(`http://localhost:3001/posts/${id}`)
        setPost(response.data)
        setLoading(false)
    };

    useEffect(() => {
        getPost(id);
    }, [id])

    const printDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <div className='d-flex'>
                <h1 className='flex-grow-1'>{post.title}</h1>
                {isLoggedIn ? <div>
                    <Link className='btn btn-primary' to={`/blogs/${id}/edit`}>Edit</Link>
                </div> : null}
            </div>
            <small className='text-muted'>
                Created At: {printDate(post.createdAt)}
            </small>
            <hr />
            <p>{post.body}</p>
        </div>
    );
}

export default ShowPage;