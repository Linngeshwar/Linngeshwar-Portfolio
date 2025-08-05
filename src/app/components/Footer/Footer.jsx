"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Linngeshwar",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/linngeshwar-b-766397290/",
    },
    {
      name: "Email",
      url: "mailto:lingaeshrajan@gmail.com",
    },
  ];

  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Left side - Name and tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              Linngeshwar B
            </h3>
            <p className="text-gray-400 text-sm">
              Full Stack Developer & Problem Solver
            </p>
          </motion.div>

          {/* Center - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
                title={social.name}
              >
                {social.name}
              </motion.a>
            ))}
          </motion.div>

          {/* Right side - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-right"
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} Linngeshwar B. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Built with Next.js & Framer Motion
            </p>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        />

        {/* Back to top hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-sm group"
          >
            <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">
              ↑
            </span>{" "}
            Back to top
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
