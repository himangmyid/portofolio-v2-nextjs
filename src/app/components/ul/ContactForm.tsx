"use client";
import { useContext, useState } from "react";
import { OverlayContext } from "@/app/components/ul/OverlayContext"; // Pastikan path benar!
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const overlayFinished = useContext(OverlayContext);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form) return;

    try {
      await emailjs.sendForm(
        "service_himang",
        "template_himang",
        form,
        "ZrcXPz2yUkSEYYBF6"
      );
      setStatus({ success: true, message: "Pesan berhasil dikirim!" });
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus({ success: false, message: "Pesan gagal dikirim. Silakan coba lagi." });
    }
  };

  return (
<>
      {overlayFinished && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-white text-center mb-6"
          >
           Contact
          </motion.h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="from_name" className="block text-sm font-medium text-white">
              Name
              </label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                className="mt-2 w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <label htmlFor="reply_to" className="block text-sm font-medium text-white">
              Email
              </label>
              <input
                type="email"
                id="reply_to"
                name="reply_to"
                className="mt-2 w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white">
              Your Message For Me?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-2 w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Write your message"
                required
              />
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Send Message
              </motion.button>
            </div>
          </form>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-6 p-4 rounded-lg text-center font-semibold ${
                status.success ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {status.message}
            </motion.div>
          )}
        </motion.div>
      )}
   </>
  );
}
