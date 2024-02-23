// React and Third-Party Libraries
import React, { useRef } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Constants and Utils
import {
  attachFileButtonStyles,
  buttonStyles,
} from "../../../../constants/stylesConstants";

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
  const fileInputRef = useRef(null);

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.container}>
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
            <div>
              <input
                className={styles.fileInputField}
                ref={fileInputRef}
                type='file'
                name='file'
                style={{ display: "none" }}
                accept='image/*' // Accepts all image types
                onChange={handleFileChange}
              />
              <Button
                variant='outlined'
                style={attachFileButtonStyles}
                startIcon={<CloudUploadIcon />}
                onClick={handleFileUploadClick}>
                add screenshot
              </Button>
            </div>
          </div>
        )}
        <Button
          style={buttonStyles}
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
