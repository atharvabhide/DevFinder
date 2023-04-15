import React from 'react'
import styles from './SearchBar.module.css'
import { GoSearch } from 'react-icons/go'

export const SearchBar = () => {
    const IconStyle = {color: "white"}
  return (
    <div className={styles.headerSearch}>
            <input type="text" placeholder='Search' className={styles.headerInput} />
            <GoSearch style={IconStyle} />
    </div>
  )
}
