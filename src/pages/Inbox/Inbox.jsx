import React from "react";
import styles from "./Inbox.module.css";
import { InboxCard } from "../../components/InboxCard/InboxCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useAxios } from "../../utils/useAxios";
import { OpenMessage } from "./OpenMessage/OpenMessage";
import { Link } from "react-router-dom";
import dhanya from "../../assets/dhanya2.jpg";

export const Inbox = () => {
  const { currentUUID } = useContext(AuthContext);
  console.log(currentUUID);

  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);

  const api = useAxios();

  const fetchMessages = async () => {
    const response = await api.get(
      `user-api/profiles/${currentUUID}/messages/`
    );
    console.log(response);
    setMessages(response.data);
    console.log(messages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const [showModal, setShowModal] = useState(
    Array(messages.length).fill(false)
  );

  /* 
  // const [selectedFile, setSelectedFile] = useState();
  // const checkNSFW = async () => {
  //   const formData = new FormData();
  //   formData.append("image", selectedFile);
  //   console.log(formData);
  //   for (const pair of formData.entries()) {
  //     console.log(`${pair[0]}, ${pair[1]}`);
  //   }
  //   for (const value of formData.values()) {
  //     console.log("value ", value);
  //   }
  //   try {
  //     const response = await axios.post("http://localhost:8000/project-api/image/mod/", formData);
  //     console.log(response);
  //   } catch (err) {
  //       // console.log("error: ", err);
  //   }
  // }
  */
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>New Messages</div>
        <br />
        <div className={styles.messageList}>
          {messages?.map((items, index) => (
            <>
              <div
                onClick={() => {
                  const newModalState = [...showModal];
                  newModalState[index] = true;
                  setShowModal(newModalState);
                }}
                className={styles.cardContainer}
              >
                <InboxCard
                  key={items.id}
                  imageURL={dhanya}
                  username={items.name}
                  subject={items.subject}
                  content={items.body}
                  time={items.createdAt}
                />
              </div>
              <OpenMessage
                onClose={() => {
                  const newModalState = [...showModal];
                  newModalState[index] = false;
                  setShowModal(newModalState);
                }}
                show={showModal[index]}
                name={items.name}
                subject={items.subject}
                message={items.body}
              />
            </>
          ))}
        </div>
      </div>

      {/* <input type="file" onChange={(e) => {console.log(e.target.files[0]); setSelectedFile(e.target.files[0])}}/>
    <button onClick={checkNSFW}>
      Upload!
    </button> */}
    </>
  );
};
