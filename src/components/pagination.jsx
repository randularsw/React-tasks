import React from 'react';

const Pagination = (props) => {
    const { count, pageSize, currentPage, onPageChange } = props;
    const pageCount = Math.ceil(count / pageSize);
    console.log(currentPage);
    if (pageCount === 1) return null;
    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                        <a style={{ cursor: 'pointer' }} className="page-link" onClick={() => onPageChange(page)}>{page}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;