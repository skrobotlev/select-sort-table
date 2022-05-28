import React, { FC, Fragment } from "react";
import '../global.scss';

const styles: any = {
  main: {
    border: "1px solid #dddddd",
    textAlign: "center",
    padding: 8,
    paddingLeft: 0,
    width: "100%"
  },
  page: {
    border: "1px solid #dddddd",
    padding: 8,
    cursor: "pointer",
    paddingLeft: "10px",
  },
};

interface TablePaginationProps {
  currentPage: number;
  pages: number;
  setPage: Function;
  pageLimit: number;
  classes?: any;
}

const TablePagination: FC<TablePaginationProps> = ({
  currentPage,
  pages,
  setPage,
  pageLimit,
}) => {
  const numPages = Math.ceil(pages / pageLimit);
  console.log(numPages, 'numPages')
  const getPaginationNumbers = () => {
    const blocks = [];
    for (let i = 0; i <= numPages; i++) {
      blocks.push(i);
    }
    return blocks;
  };

  const renderPageBlocks = () => {
    const getPageNumbers = getPaginationNumbers();
    console.log(getPageNumbers, 'getPageNumbers')
    return getPageNumbers.map((pageNum) => (

      <a
        key={pageNum}
        className="table-pagination-page"
        onClick={() => setPage(pageNum)}
        style={
          pageNum === currentPage ? { backgroundColor: "lightBlue" } : undefined
        }
      >
        {pageNum + 1}
      </a>
    ));
  };

  const goToPrevPage = () => {
    if (currentPage >= 1) {
      setPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages - 1) {
      setPage(currentPage + 1);
    }
  };

  const renderPrevPageBlocks = () => {
    return (
      <Fragment>
        <a key="first-page" className="table-pagination-page" onClick={() => setPage(1)}>
          &#171;
        </a>
        <a key="prev-page" className="table-pagination-page" onClick={goToPrevPage}>
          &#8592;
        </a>
      </Fragment>
    );
  };

  const renderNextPageBlocks = () => {
    return (
      <Fragment>
        <a key="next-page" className="table-pagination-page" onClick={goToNextPage}>
          &rarr;
        </a>
        <a
          key="last-page"
          className="table-pagination-page"
          onClick={() => setPage(numPages - 1)}
        >
          &raquo;
        </a>
      </Fragment>
    );
  };

  return (
    <div className="table-pagination-main">
      {numPages > 1 ? renderPrevPageBlocks() : null}
      {numPages > 1 ? renderPageBlocks() : null}
      {numPages > 1 ? renderNextPageBlocks() : null}
    </div>
  );
};

export default TablePagination;
