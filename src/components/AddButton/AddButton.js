import React from "react";
import addIcon from "../../assests/addIcon.png";
import styles from "./AddButton.module.css";

export const AddButton = ({ setOpen }) => {
  return (
    <button className={styles.addButton} onClick={() => setOpen(true)}>
      <img src={addIcon} alt="Add new" className={styles.icon} />
    </button>
  );
};
