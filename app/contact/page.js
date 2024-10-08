"use client";
import React, { useContext, useRef } from "react";
import { Context } from "../context/appContext";
import styles from "../page.module.css";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Footer from "../components/footer";

const Contact = () => {
  const { actions } = useContext(Context);
  const form = useRef();
  const SERVICE_ID = "service_o3myacg";
  const TEMPLATE_ID = "template_go8zpg1";
  const PUBLIC_KEY = "EZAsJeSfRQ2eI208S";

  // Function to send an email
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      (result) => {
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    e.target.reset();
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.contactDiv}>
        <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
          <div className={styles.contactFormDiv}>
            <div className={styles.formCol}>
              <input
                type="text"
                id="nameInput"
                name="name"
                className={styles.formControl}
                placeholder="Name"
              />
            </div>
            <div className={styles.formCol}>
              <input
                type="text"
                id="emailInput"
                name="email"
                className={styles.formControl}
                placeholder="Email address"
              />
            </div>
          </div>
          <div className={styles.contactFormDiv}>
            <div className={styles.formCol}>
              <input
                type="text"
                id="subjectInput"
                name="subject"
                className={styles.formControl}
                placeholder="Subject"
              />
            </div>
          </div>
          <div className={styles.contactFormDiv}>
            <div className={styles.formColFull}>
              <textarea
                id="contactTextArea"
                name="message"
                className={styles.formControl}
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          {/* <img src="/img/CCEA99.png" alt="CCEA Logo" className={styles.contactLogo} /> */}
          <div className={styles.formColFull}>
            <button className={styles.sendButton} type="submit">
              Send
            </button>
          </div>
        </form>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
