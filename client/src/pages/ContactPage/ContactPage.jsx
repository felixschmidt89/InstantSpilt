import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ContactPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ContactPage = () => {
  const { groupCode } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    messageType: "",
    feedback: "",
  });
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // controlled component to handle user form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create an initial requestData object with common form data
      const requestData = {
        ...formData,
        groupCode,
      };

      // If it exists: Send the attached file to a different endpoint
      if (file) {
        // Create a new FormData object to prepare the file for upload
        const fileData = new FormData();
        // Append the file to the FormData object with the key "file"
        fileData.append("file", file);

        const responseFile = await axios.post(`${apiUrl}/files`, fileData);

        // Add the file's ObjectId to the requestData for referencing
        requestData.fileId = responseFile.data.savedFile._id;
      }

      // Post the feedback data
      const responseForm = await axios.post(`${apiUrl}/feedbacks`, requestData);
      // Set the feedback message from the server
      setFeedbackMessage(responseForm.data.message);
      // Hide the form after successful submission
      setShowForm(false);
    } catch (error) {
      console.error("Error creating feedback:", error);
      setFeedbackMessage("Error creating feedback. Please try again.");
    }
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - contact' />
      <PiratePx COUNT_IDENTIFIER={"contact"} />
      <InAppNavigationBar back={true} />
      <h1>Leave a message</h1>
      {showForm ? (
        <div className={styles.container}>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div>
              <label htmlFor='name'>
                <strong>name*</strong>
              </label>
              <div>
                <input
                  className={styles.inputField}
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='required'
                  required
                  autoFocus
                />
              </div>
            </div>
            <div>
              <label htmlFor='email'>email</label>
              <div>
                <input
                  className={styles.inputField}
                  type='text' // so that the field is *really* optional
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='optional'
                />
              </div>
            </div>
            <div>
              <label htmlFor='messageType'>type</label>
              <div>
                <select
                  className={styles.select}
                  id='messageType'
                  name='messageType'
                  value={formData.messageType}
                  onChange={handleInputChange}>
                  <option value='' selected disabled>
                    Select message type
                  </option>

                  <option value='Just wanted to say hi'>
                    Just wanted to say hi
                  </option>
                  <option value='issue/bug'>issue / bug</option>
                  <option value='feedback'>feedback</option>
                  <option value='feature request'>feature request</option>
                  <option value='else'>else</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor='feedback'>
                <strong>message*</strong>
              </label>
              <div>
                <textarea
                  className={`${styles.inputField} ${styles.textArea}`}
                  id='feedback'
                  name='feedback'
                  value={formData.feedback}
                  onChange={handleInputChange}
                  placeholder='required'
                  rows='4'
                  required
                />
              </div>
            </div>
            {formData.messageType === "Issue/Bug" && (
              <div>
                <label htmlFor='file'>Add a screenshot</label>
                <div>
                  <input
                    className={styles.fileInputField}
                    type='file'
                    name='file'
                    accept='image/*' // Accepts all image types
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
            <button className={styles.button} type='submit'>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>{feedbackMessage}</p>
        </div>
      )}
    </main>
  );
};

export default ContactPage;
