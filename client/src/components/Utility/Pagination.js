import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const paginationInfo = {
  pageIndex: 0,
  itemsPerPage: 10,
  totalItems: 0,
};

export default function Pagination({ paginationData, onChangePaginationData }) {
  const handlePageChange = (evt) => {
    onChangePaginationData(evt.selected);
  };

  return (
    <div className="mt-3">
      <ReactPaginate
        // Tag content
        previousLabel={<ArrowBackIosIcon />}
        nextLabel={<ArrowForwardIosIcon />}
        breakLabel="..."
        // List class
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        breakClassName="page-item"
        // Item in list class
        pageLinkClassName="page-link border-0 mx-2"
        previousLinkClassName="page-link pe-0 border-0"
        nextLinkClassName="page-link px-1 border-0"
        breakLinkClassName="page-link border-0 mx-2"
        // General
        containerClassName="pagination align-items-center"
        activeClassName="active"
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        // Pagination main config
        pageCount={Math.ceil(
          paginationData.totalItems / paginationData.itemsPerPage
        )}
        onPageChange={handlePageChange}
        forcePage={paginationData.pageIndex}
      />
    </div>
  );
}
