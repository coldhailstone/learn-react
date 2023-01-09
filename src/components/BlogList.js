import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

function BlogList({ isAdmin }) {
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

    if (loading) {
        return <LoadingSpinner />
    }

    if (!posts.length) {
        return <div>'No blog posts found'</div>
    }

    const renderBlogList = () => {
        return (
            posts.filter((post) => isAdmin || post.publish).map((post) => {
                return (
                    <Card key={post.id} title={post.title} onClick={() => navigate(`/blogs/${post.id}`)}>
                        <div>
                            {isAdmin ? <button 
                                className='btn btn-danger btn-sm' 
                                onClick={(e) => deleteBlog(e, post.id)}
                            >
                                Delete
                            </button> : null}
                        </div>
                    </Card>
                )
            })
        )
    }

    return (
        <div>
            {renderBlogList()}
            <Pagination />
        </div>
    )
}

BlogList.propTypes = {
    isAdmin: PropTypes.bool
};

BlogList.defaultProps = {
    isAdmin: false
}

export default BlogList;