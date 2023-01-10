import PropTypes from 'prop-types';

function Pagination({ currentPage, numberOfPages, limit, onClick }) {
    const currentSet = Math.ceil(currentPage/limit);
    const lastSet = Math.ceil(numberOfPages/limit);
    const startPage = limit * (currentSet - 1) + 1;
    const numberofPageForSet = currentSet === lastSet ? numberOfPages%limit : limit

    return (
    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            {currentSet !== 1 &&
                <li className="page-item">
                    <div className="page-link cursor-pointer"
                        onClick={() => onClick(startPage - limit)}>
                            Previous
                    </div>
                </li>
            }
            {
                Array(numberofPageForSet).fill(startPage)
                    .map((value, index) => value + index)
                    .map((pageNumber) => {
                        return (
                            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                <div className="page-link cursor-pointer" onClick={() => {
                                    onClick(pageNumber);
                                }}>{pageNumber}</div>
                            </li>
                        )
                    })
            }
            {
                currentSet !== lastSet &&
                    <li className="page-item">
                        <div className="page-link cursor-pointer" 
                            onClick={() => onClick(startPage + limit)}>
                                Next
                        </div>
                    </li>
            }
        </ul>
    </nav>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    numberOfPages: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    limit: PropTypes.number,
}

Pagination.defaultProps = {
    currentPage: 1,
    limit: 5
}

export default Pagination;