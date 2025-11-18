// Contact Component
//
// TO MAKE THE CONTACT FORM FUNCTIONAL:
// 1. Replace the placeholder email addresses and social links with your actual information
// 2. For the contact form, you can use services like:
//    - Formspree: https://formspree.io/ (recommended)
//    - Netlify Forms: if hosting on Netlify
//    - EmailJS: https://www.emailjs.com/
//
// Example with Formspree:
// 1. Sign up at formspree.io and get your form endpoint
// 2. Replace the handleSubmit function with:
//    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
//      method: 'POST',
//      headers: { 'Content-Type': 'application/json' },
//      body: JSON.stringify(formData)
//    });

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CursorButton from "../Cursor/CursorButton";
import ShinyText from "@/TextAnimations/ShinyText/ShinyText";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus(
          "Message sent successfully! I'll get back to you soon."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(""), 5000);
    }
  };

  const contactInfo = [
    {
      label: "Email",
      value: "lingaeshrajan@gmail.com", // Replace with your actual email
      href: "mailto:lingaeshrajan@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "Linngeshwar B",
      href: "https://www.linkedin.com/in/linngeshwar-b-766397290/",
    },
    {
      label: "GitHub",
      value: "github.com/Linngeshwar",
      href: "https://github.com/Linngeshwar",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen bg-black text-white py-20 px-4 sm:px-8 overflow-x-hidden relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 px-2">
            Let's{" "}
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <ShinyText
            duration={1.5}
            text="Have a project in mind or just want to say hi? I'd love to hear from you!"
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl w-full"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <CursorButton
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-white text-black hover:bg-transparent hover:text-white border-2 border-white"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <motion.div
                      className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full mr-3"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </CursorButton>

              {submitStatus && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center text-sm ${
                    submitStatus.includes("successfully")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {submitStatus}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 w-full"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                Get in Touch
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                I'm always open to discussing new opportunities, interesting
                projects, or potential collaborations. Whether you have a
                question or just want to connect, feel free to reach out!
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl hover:border-gray-600 transition-all duration-300 group w-full"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
                      {contact.label}
                    </p>
                    <p className="text-sm sm:text-base text-white font-medium group-hover:text-gray-300 transition-colors duration-300 truncate">
                      {contact.value}
                    </p>
                  </div>
                  <motion.div
                    className="ml-auto text-gray-400 group-hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 p-6 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl w-full"
            >
              <h4 className="text-lg sm:text-xl font-semibold mb-3 text-white">
                Quick Response
              </h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                I typically respond to messages within 24 hours. For urgent
                matters, feel free to reach out via email or LinkedIn for faster
                communication.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-12 sm:mt-20"
        >
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-500"></div>
            <span className="text-sm">Thanks for visiting!</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-500"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
