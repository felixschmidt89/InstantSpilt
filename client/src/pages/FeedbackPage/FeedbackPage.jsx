import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./FeedbackPage.module.css/";

import NavigateButton from "../../components/NavigateButton/NavigateButton";

export default function FeedbackPage() {
  const { groupCode } = useParams();

  console.log(groupCode);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requestType: "", // Add requestType to the form data
    feedback: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setFormData({
      name: "",
      email: "",
      requestType: "", // Reset requestType as well
      feedback: "",
    });
  };

  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h1>Leave a message</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>
            <strong>Name*</strong>
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
            />
          </div>
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <div>
            <input
              className={styles.inputField}
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='optional'
            />
          </div>
        </div>
        <div>
          <label htmlFor='messageType'>
            <strong>Type*</strong>
          </label>
          <div>
            <select
              className={styles.select}
              id='messageType'
              name='messageType'
              value={formData.messageType}
              onChange={handleInputChange}
              required>
              <option value=''>Select message type</option>
              <option value='Just wanted to say hi'>
                Just wanted to say hi{" "}
              </option>
              <option value='Issue/Bug'>Issue / Bug</option>
              <option value='Feedback'>Feedback</option>
              <option value='Feature Request'>Feature Request</option>
              <option value='Else'>Else</option>
            </select>
          </div>
        </div>
        <div>
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
              rows='10'
              required
            />
          </div>
        </div>
        <button className={styles.button} type='submit'>
          Submit
        </button>
      </form>
    </main>
  );
}
