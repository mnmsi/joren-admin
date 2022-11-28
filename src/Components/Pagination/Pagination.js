import React from 'react'
import ReactPaginate from 'react-paginate'
const Pagination = (props) => {
    let activePage = 0
    if (props.pageFirstShow) {
        if (props.pageFirstShow === 1) {
            activePage = 0
        } else {
            activePage = props.pageFirstShow - 1
        }
    }
    return (
        <div className={`pagination-wrapper`}>
            <ReactPaginate
                previousLabel={`Prv`}
                nextLabel='Nxt'
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                pageCount={props.pageCount}
                pageRangeDisplayed={1}
                onPageChange={props.handlePageClick}
                forcePage={activePage}
            />
        </div>
    )
}

export default Pagination
