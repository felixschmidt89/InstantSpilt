// React and Third-Party Libraries
import React from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Components

// Styles
import styles from "./ContactForm.module.css";

/**
 * Component for rendering contact form
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.formData - Form data containing user input.
 * @param {Function} props.handleFileChange - Function to handle file input change.
 * @param {Function} props.handleInputChange - Function to handle input change.
 * @param {Function} props.handleFormSubmission - Function to handle form submission.
 *
 * @returns {JSX.Element} - React component. */
const ContactForm = ({
  formData,
  handleFileChange,
  handleInputChange,
  handleFormSubmission,
}) => {
  return (
    <div className={styles.container}>
      <h1>drop the team a line</h1>
      <form
        className={styles.formContainer}
        onSubmit={handleFormSubmission}
        encType='multipart/form-data'>
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
              autoFocus
            />
          </div>
        </div>
        <div>
          <label htmlFor='email'>email</label>
          <div>
            <input
              className={styles.inputField}
              type='text'
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
              <option value='' disabled>
                Select message type
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
            />
          </div>
        </div>
        {formData.messageType === "issue/bug" && (
          <div>
            <label htmlFor='file'>add a screenshot</label>
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
        <Button
          style={{
            padding: "0.2rem 0.5rem",
            fontSize: "1.6rem",
            marginTop: "0.5rem",
            fontFamily: "inherit",
          }}
          variant='contained'
          type='submit'
          endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
