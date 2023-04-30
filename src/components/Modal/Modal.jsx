import React from 'react'
import styles from './Modal.module.css'
import {RxCross2} from 'react-icons/rx'

export const Modal = (props) => {
    if (!props.show){
        return null;
    }
  return (
    <>
        <div className={styles.modal} onClick={props.onClose}>
            <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitle}>
                        Alert!

                    </div>
                    <div className={styles.modalContent}>
                        <p>Are you sure you want to delete this project?</p>

                    </div>
                    <div className={styles.modalFooter}>
                        <button className={styles.modalButton} id={styles.deleteButton}>Delete</button>
                        <button className={styles.modalButton} id={styles.cancelButton} onClick={props.onClose}>Cancel</button>
                    </div>

                    <button className={styles.closeButton} onClick={props.onClose}><RxCross2 size={20}/></button>

                </div>

            </div>
        </div>
    </>
  )
}

