import { range } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Pagination as ReactStrapPagination, PaginationItem, PaginationLink } from 'reactstrap';

export const Pagination = ({ currentPage, totalPages, uri, queryParams }) => {
    return (
        <ReactStrapPagination>
            {
                range(0, totalPages).map(page => {
                    {
                        return page + 1 === currentPage ?
                            <PaginationItem key={page} active>
                                <PaginationLink href={`${uri}?page=${page + 1}&${queryParams ? queryParams : ""}`}>
                                    {page + 1}
                                </PaginationLink>
                            </PaginationItem>
                            : <PaginationItem key={page}>
                                <PaginationLink href={`${uri}?page=${page + 1}&${queryParams ? queryParams : ""}`}>
                                    {page + 1}
                                </PaginationLink>
                            </PaginationItem>
                    }
                })
            }
        </ReactStrapPagination>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    uri: PropTypes.string.isRequired,
    queryParams: PropTypes.string
}
