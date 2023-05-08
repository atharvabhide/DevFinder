import React from 'react'
import styles from './SearchBar.module.css'
import { GoSearch } from 'react-icons/go'

export const SearchBar = (props) => {
    const IconStyle = {color: "white"}
  return (
    <div className={styles.headerSearch}>
            <input type="text" placeholder='Search' className={styles.headerInput} onChange={(e) => {props.setSearchQuery(e.target.value)}}/>
            <GoSearch style={IconStyle} />
    </div>
  )
}
