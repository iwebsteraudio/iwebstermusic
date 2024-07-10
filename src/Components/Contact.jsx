import React, { useState } from "react";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    contactEmail: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, contactNumber, contactEmail, message } = formData;

    try {
      const response = await fetch("http://localhost:9090/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          contactNumber,
          contactEmail,
          message,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Email sent successfully!");
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus("Error sending email");
    }

    setFormData({
      name: "",
      contactNumber: "",
      contactEmail: "",
      message: "",
    });
  };
  return (
    <form
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          {" "}
          Name{" "}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          name="name"
          type="text"
          placeholder="please enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="contactNumber"
        >
          Contact Number
        </label>
        <input
          className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 leading-tight focus:outline-non focus:shadow-outline"
          id="contactNumber"
          name="contactNumber"
          type="text"
          placeholder="Your Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="contactEmail"
        >
          Contact Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="contactEmail"
          name="contactEmail"
          type="email"
          placeholder="Your Contact Email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Contact;
