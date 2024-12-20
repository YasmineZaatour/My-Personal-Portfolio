import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { MdEmail } from 'react-icons/md';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import './Contact.css';

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs
      .sendForm(
        'service_ni5o9oh',
        'template_bkt3af5',
        form.current,
        'Qo82SHekv0bStmpGR'
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setStatus('success');
        },
        (error) => {
          console.error('Email sending failed:', error);
          setStatus('error');
        }
      );
  };

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <div className="contact__option">
            <MdEmail className="contact__option-icon"/>
            <h4>Email</h4>
            <h5>zaatouryasmine2003@gmail.com</h5>
            <a href="mailto:yasminezaatour@gmail.com">Send a message</a>
          </div>

          <div className="contact__social-links">
            <a href="https://www.linkedin.com/in/yasminezaatour/" className="contact__social-link">
              <BsLinkedin />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/YasmineZaatour" className="contact__social-link">
              <BsGithub />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <form ref={form} onSubmit={sendEmail} className="contact__form">
          <div className="form__input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              placeholder="Your Name"
              required 
            />
          </div>
          <div className="form__input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              placeholder="name@example.com"
              required 
            />
          </div>
          <div className="form__input-group">
            <label htmlFor="subject">Subject</label>
            <input 
              type="text" 
              name="subject" 
              id="subject"
              placeholder="Subject"
              required 
            />
          </div>
          <div className="form__input-group">
            <label htmlFor="message">Message</label>
            <textarea 
              name="message" 
              id="message" 
              rows="7"
              placeholder="Your message here..."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && <p className="success">Message sent successfully!</p>}
          {status === 'error' && <p className="error">Error sending message</p>}
        </form>
      </div>

      <div className="footer__love">
        <p>Made with <FaHeart className="heart-icon" /> by Yasmine Zaatour</p>
      </div>
    </section>
  );
};

export default ContactForm;