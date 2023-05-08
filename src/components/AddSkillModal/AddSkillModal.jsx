import React from "react";
import styles from './AddSkillModal.module.css'
import { RxCross2 } from "react-icons/rx";

export const AddSkillModal = (props) => {
    if (!props.show){
      return null;
  }
    return (
      <div className={styles.modal} onClick={props.onClose}>
              <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                  <div className={styles.modalHeader}>
                      <div className={styles.modalTitle}>
                          Add Skill
  
                      </div>
                      <div className={styles.modalContent}>
                          <input className={styles.inputField} type="text" placeholder='Enter skill name' onChange={(e) => {props.setNewSkill(e.target.value)}}/>
  
                      </div>
                      <div className={styles.modalFooter}>
                          <button className={styles.modalButton} id={styles.deleteButton} onClick={props.onAdd}>Add</button>
                          <button className={styles.modalButton} id={styles.cancelButton} onClick={props.onClose}>Cancel</button>
                      </div>
  
                      <button className={styles.closeButton} onClick={props.onClose}><RxCross2 size={20}/></button>
  
                  </div>
  
              </div>
          </div>
    )
  }