import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const [confirmationMessage, setConfirmationMessage] = useState(""); // For storing confirmation message
  const [messageVisible, setMessageVisible] = useState(false); // For controlling visibility
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let response = await fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let text = await response.text();
    console.log(data, text);

    // Set the confirmation message based on server response
    if (response.ok) {
      setConfirmationMessage("Your message has been sent successfully to the Database!");
    } else {
      setConfirmationMessage("There was an error sending your message. Please try again.");
    }

    // Show confirmation message
    setMessageVisible(true);

    // Reset form and hide confirmation message after 2 seconds
    reset(); // Reset form after submission

    setTimeout(() => {
      setMessageVisible(false); // Hide confirmation message after 2 seconds
      setConfirmationMessage(""); // Clear message content
    }, 2000);
  };

  return (
    <div className="container" id="formbox">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="box">
          <h1>Contact Us</h1>

          <label>
            Name {errors.name && <span className="error-message"> {errors.name.message}</span>}
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            {...register("name", { required: { value: true, message: "Name is required" } })}
          />

          <label>
            Email {errors.email && <span className="error-message"> {errors.email.message}</span>}
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
          />

          <label>
            Message {errors.Message && <span className="error-message"> {errors.Message.message}</span>}
          </label>
          <textarea
            type="text"
            placeholder="Enter your message"
            name="Message"
            {...register("Message", { required: { value: true, message: "Message is required" } })}
          />

          <button>Submit</button>
        </section>
      </form>

      {/* Display confirmation message */}
      <div className={`confirmation-message ${messageVisible ? "show" : ""}`}>
        {confirmationMessage}
      </div>
    </div>
  );
};

export default ContactForm;
