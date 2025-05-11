import { useState } from 'react';

function Contact({ isActive }) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  });
  
  const [formValid, setFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Check if all fields have values
    const updatedData = { ...formData, [name]: value };
    const isValid = Object.values(updatedData).every(val => val.trim() !== '');
    setFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server here
    alert('Message sent! (This is a demo - no actual message was sent)');
    
    // Reset form
    setFormData({
      fullname: '',
      email: '',
      message: ''
    });
    setFormValid(false);
  };

  return (
    <article className={`contact ${isActive ? 'active' : ''}`} data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30971078.57173514!2d-43.17207635!3d-15.7934039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c59c7ebcc28cf%3A0x295a1506f2293e63!2sBrazil!5e0!3m2!1sen!2sbr!4v1649961504399!5m2!1sen!2sbr"
            width="400" 
            height="300" 
            loading="lazy" 
            title="Digital Nomad - Working from anywhere"
          ></iframe>
        </figure>
        <div className="digital-nomad-badge">
          <ion-icon name="globe-outline"></ion-icon>
          <span>Digital Nomad - Working from anywhere</span>
        </div>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input 
              type="text" 
              name="fullname" 
              className="form-input" 
              placeholder="Full name" 
              required 
              value={formData.fullname}
              onChange={handleInputChange}
            />
            <input 
              type="email" 
              name="email" 
              className="form-input" 
              placeholder="Email Address" 
              required 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <textarea 
            name="message" 
            className="form-input" 
            placeholder="Your Message" 
            required 
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>

          <button 
            className="form-btn" 
            type="submit" 
            disabled={!formValid}
          >
            <ion-icon name="paper-plane"></ion-icon>
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
}

export default Contact;