import React, { useState } from "react";

function Contact({ showToast }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        showToast("Message sent successfully! We'll respond within 24 hours.", "success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 1500);
    } else {
      setErrors(newErrors);
      showToast("Please fix the errors in the form", "error");
    }
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "3rem 2rem",
  };

  const contactInfoStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  };

  const infoCardStyle = {
    textAlign: "center",
    padding: "1.5rem",
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1>Get in Touch</h1>
        <p style={{ color: "#94a3b8", fontSize: "1.125rem" }}>
          Have questions? We'd love to hear from you.
        </p>
      </div>

      {/* Contact Information */}
      <div style={contactInfoStyle}>
        <div className="card" style={infoCardStyle}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📍</div>
          <h3 style={{ color: "#059669", marginBottom: "0.5rem" }}>Visit Us</h3>
          <p style={{ color: "#94a3b8" }}>123 Tech Street<br />San Francisco, CA 94105</p>
        </div>

        <div className="card" style={infoCardStyle}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📧</div>
          <h3 style={{ color: "#059669", marginBottom: "0.5rem" }}>Email Us</h3>
          <p style={{ color: "#94a3b8" }}>support@foodguard.ai<br />info@foodguard.ai</p>
        </div>

        <div className="card" style={infoCardStyle}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📞</div>
          <h3 style={{ color: "#059669", marginBottom: "0.5rem" }}>Call Us</h3>
          <p style={{ color: "#94a3b8" }}>+1 (555) 123-4567<br />Mon-Fri, 9am-6pm</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="card">
        <h2 style={{ color: "#059669", marginBottom: "2rem", textAlign: "center" }}>Send a Message</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? "error" : ""}`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {errors.name}
              </p>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? "error" : ""}`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {errors.email}
              </p>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`input-field ${errors.subject ? "error" : ""}`}
              placeholder="How can we help?"
            />
            {errors.subject && (
              <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {errors.subject}
              </p>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`input-field ${errors.message ? "error" : ""}`}
              placeholder="Tell us more about your inquiry..."
              rows="5"
            />
            {errors.message && (
              <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn"
            disabled={isSubmitting}
            style={{ width: "100%", padding: "1rem" }}
          >
            {isSubmitting ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <div className="loader loader-sm" />
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;