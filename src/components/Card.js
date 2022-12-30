import PropTypes from 'prop-types';

function Card({ title, children }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className='d-flex justify-content-between'>
                    <div>{title}</div>
                    {children && <div>{children}</div>}
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element
}

Card.defaultProps = {
    title: 'Title',
    children: null
}

export default Card;