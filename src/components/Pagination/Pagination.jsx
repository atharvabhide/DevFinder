import React, { useState } from 'react';
import styles from './Pagination.module.css'
import {GrFormNext} from 'react-icons/gr'
import {GrFormPrevious} from 'react-icons/gr'

export const Pagination = ({ currentPage, totalPages, onPageChange }) =>  {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
    onPageChange(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
      onPageChange(currentPageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageNumber < totalPages) {
      setCurrentPageNumber(currentPageNumber + 1);
      onPageChange(currentPageNumber + 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={handlePreviousPage} disabled={currentPageNumber === 1} >
        {/*Add this line disabled={currentPageNumber === 1} once pagination is sorted */}
        <GrFormPrevious size={25} />
      </button>
      
      <p>Page {currentPageNumber} of {totalPages}</p>
      <button className={styles.btn} onClick={handleNextPage} disabled={currentPageNumber === totalPages} > 
      {/*Add this line disabled={currentPageNumber === totalPages} once pagination is sorted */}
        <GrFormNext size={25} />
      </button>
      <div>
        
      </div>
    </div>
  );
}






