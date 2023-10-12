// DONE adding only meaningful necessary comments

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./FeedbackPage.module.css";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

// Define the API URL using environment variable
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * React component for the Feedback Page.
 *
 * Handles user feedback submissions, allowing them to leave different message types
 * and optionally add image files for screenshots when reporting a bug.
 *
 */
export default function FeedbackPage() {
  const { groupCode } = useParams();

  // Define states to handle user input data & file, form visibility, and server response
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

        const responseFile = await axios.post(`${apiUrl}/files`, fileData, {
          // specify binary file content type
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Add the file's ObjectId to the requestData for referencing
        requestData.fileId = responseFile.data.data.savedFile._id;
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
      {/* Set page title and meta tags */}
      <HelmetMetaTagsNetlify title='InstantSplit - Contact' />
      {/* Navigation button to go back to main*/}

      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h1>Leave a message</h1>
      {/* Check if the form should be displayed */}

      {showForm ? (
        <div className={styles.container}>
          {/* Form for user feedback, with multipart/form-data encoding for file upload */}
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div>
              <label htmlFor='name'>
                <strong>Name*</strong>
              </label>
              <div>
                {/* Mandatory input field for the user's name */}
                <input
                  className={styles.inputField}
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='required'
                  required
                />
              </div>
            </div>
            <div>
              {/* Optional input field for the user's email (optional) */}

              <label htmlFor='email'>Email</label>
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
              {/* Mandatory dropdown for selecting the message type */}
              <label htmlFor='messageType'>Type</label>
              <div>
                <select
                  className={styles.select}
                  id='messageType'
                  name='messageType'
                  value={formData.messageType}
                  onChange={handleInputChange}>
                  <option value=''>Select message type</option>
                  <option value='Just wanted to say hi'>
                    Just wanted to say hi
                  </option>
                  <option value='Issue/Bug'>Issue / Bug</option>
                  <option value='Feedback'>Feedback</option>
                  <option value='Feature Request'>Feature Request</option>
                  <option value='Else'>Else</option>
                </select>
              </div>
            </div>
            <div>
              {/* Mandatory textarea for the user's feedback message */}

              <label htmlFor='feedback'>
                <strong>Message*</strong>
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
            {/* Render optional input field for uploading a screenshot (if the message type is Issue/Bug) */}
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
            {/* Submit button for the feedback form */}
            <button className={styles.button} type='submit'>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>
          {/* Display feedback message from the server */}
          <p>{feedbackMessage}</p>
        </div>
      )}
    </main>
  );
}
