import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./FeedbackPage.module.css/";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import { Helmet } from "react-helmet-async";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function FeedbackPage() {
  const { groupCode } = useParams();

  // states to set user input data, to display form and message from server
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    messageType: "",
    feedback: "",
  });

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

  // On form submission: Post feedback, hide the form and render message from server instead
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        ...formData,
        groupCode,
      };

      const response = await axios.post(`${apiUrl}/feedbacks`, requestData);

      setFeedbackMessage(response.data.message);
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error("Error creating feedback:", error);
      setFeedbackMessage("Error creating feedback. Please try again.");
    }
  };

  return (
    <main>
      <Helmet>
        <title>InstantSplit - Contact</title>
        <meta name='fragment' content='!' />
      </Helmet>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h1>Leave a message</h1>
      {showForm ? (
        <div className={styles.container}>
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
                  type='text' // so that field is *really* optional
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
}
