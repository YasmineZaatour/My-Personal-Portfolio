import React, { useRef, useState } from 'react';
import axios from 'axios';
import './Contact.css';
import { MdEmail } from 'react-icons/md';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();

  //const sendEmail = (e) => { 
  //e.preventDefault();
  //  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
  //    .then(() => {
  //      e.target.reset();
  //      alert('Message sent successfully!');
  //    }, (error) => {
  //      console.log(error);
  //      alert('Failed to send message.');
  //    });
 // };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await axios.post('http://localhost:5001/api/contact', formData);
      
      if (response.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Show success message to user
        alert('Thank you for your message! Please check your email for confirmation.');
      }
    } catch (error) {
      setStatus('error');
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

        <form ref={form} onSubmit={handleSubmit} className="contact__form">
          <div className="form__input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form__input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.subject}
              onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
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

export default Contact;
