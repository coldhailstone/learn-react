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
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const limit = 5;

    useEffect(() => {
        getPosts();
        setNumberOfPages(Math.ceil(numberOfPosts/limit))
    }, [numberOfPosts]);

    const getPosts = async (page = 1) => {
        setCurrentPage(page)

        let params = {
            _page: page,
            _limit: limit,
            _sort: 'id',
            _order: 'desc'
        }

        if (!isAdmin) {
            params.publish = true
        }

        const response = await axios.get('http://localhost:3001/posts', {
            params
        })
        setNumberOfPosts(response.headers['x-total-count'])
        setPosts(response.data);
        setLoading(false)
    }

    const deleteBlog = async (e, id) => {
        e.stopPropagation();

        await axios.delete(`http://localhost:3001/posts/${id}`)
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
    }

    if (loading) {
        return <LoadingSpinner />
    }

    if (!posts.length) {
        return <div>'No blog posts found'</div>
    }

    const renderBlogList = () => {
        return (
            posts.map((post) => {
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
            {numberOfPages > 1 && <Pagination 
                currentPage={currentPage} 
                numberOfPages={numberOfPages} 
                onClick={getPosts} />
            }
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