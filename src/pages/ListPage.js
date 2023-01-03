import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

function ListPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = async () => {
        const response = await axios.get('http://localhost:3001/posts')
        setPosts(response.data);
        setLoading(false)
    }

    const deleteBlog = async (e, id) => {
        e.stopPropagation();

        await axios.delete(`http://localhost:3001/posts/${id}`)
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
    }

    useEffect(() => {
        getPosts();
    }, []);

    const renderBlogList = () => {
        if (loading) {
            return <LoadingSpinner />
        }

        if (!posts.length) {
            return <div>'No blog posts found'</div>
        }

        return (
            posts.map((post) => {
                return (
                    <Card key={post.id} title={post.title} onClick={() => navigate('/blogs/edit')}>
                        <div>
                            <button 
                                className='btn btn-danger btn-sm' 
                                onClick={(e) => deleteBlog(e, post.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </Card>
                )
            })
        )
    }

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h1>Blogs</h1>
                <div>
                    <Link to="/blogs/create" className='btn btn-success'>
                        Create New
                    </Link>
                </div>
            </div>
            {renderBlogList()}
        </div>
    )
}

export default ListPage;