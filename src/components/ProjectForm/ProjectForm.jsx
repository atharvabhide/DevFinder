import React, { useState } from "react";
import styles from "./ProjectForm.module.css";
import { useAxios } from "../../utils/useAxios";
import { baseURL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";

export const ProjectForm = () => {
  const api = useAxios();
  const navigate = useNavigate();

  const dummyData = {
    title: "Title of my asdasdlife",
    description: "This is some descriptionnnnnn",
    demoLink: "https://github.com/atharvabhide/DevFinder/tree/dev/backend",
    sourceLink: "https://github.com/atharvabhide/DevFinder/tree/dev/backend",
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [sourceLink, setSourceLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = async () => {
    setTags([...tags, newTag]);
    setNewTag("");
  };

  const addProject = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("demoLink", demoLink);
    formData.append("sourceLink", sourceLink);
    formData.append("featuredImage", selectedFile);
    formData.append("tags", tags);
    console.log(tags);

    const imageData = new FormData();
    imageData.append("image", selectedFile);

    const responseNSFW = await api.post(
      `${baseURL}project-api/image/mod/`,
      imageData
    );
    console.log(responseNSFW);

    if (responseNSFW.data.prediction != "image is nsfw") {
      const response = await api.post(
        `${baseURL}project-api/projects/create/`,
        formData
      );
      console.log(response);
      if (response.status === 201) {
        navigate(`/account`);
      } else {
        console.log("error: couldn't add project");
      }
    } else {
      toast.error("No NSFW images allowed");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p className={styles.formTitle}>Add Project</p>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
          <textarea
            className={styles.bio}
            name="Bio"
            id=""
            cols="30"
            rows="10"
            placeholder="About"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>

          <div className={styles.uploadContainer}>
            <label style={{ marginLeft: "-0.5em" }}>Project Image</label>
            <input
              type="file"
              placeholder="Project Image"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setSelectedFile(e.target.files[0]);
              }}
              required
            />
          </div>
          <input
            type="url"
            className={styles.inputField}
            placeholder="Demo Link"
            onChange={(e) => {
              setDemoLink(e.target.value);
            }}
          />
          <input
            type="url"
            className={styles.inputField}
            placeholder="Source Code"
            onChange={(e) => {
              setSourceLink(e.target.value);
            }}
          />

          {/* <label htmlFor="newTag">Tags:</label> */}
          <div style={{ display: "flex", width: "100%" }}>
            <input
              type="text"
              id={styles.newTag}
              value={newTag}
              className={styles.inputField}
              placeholder="Add Tags (React, Django, Flutter, etc)"
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              className={styles.tagButton}
              type="button"
              onClick={handleAddTag}
            >
              <TiTick size={22} style={{ color: "#fff" }} />
            </button>
          </div>

          <div className={styles.displayTags}>
            {tags.map((tag, index) => (
              <span
                key={index}
                className="tag"
                style={{ marginLeft: "0.5rem" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <br />

          <input
            type="submit"
            className={styles.submitButton}
            value="Submit"
            onClick={addProject}
          />
        </form>
      </div>
      <Toaster />
    </>
  );
};
