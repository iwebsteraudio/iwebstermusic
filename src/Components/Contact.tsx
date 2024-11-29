import React, { useState } from "react";
import { postEmailWithRetry } from "../../api/Api.tsx";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    contactEmail: "",
    subject: "",
    date: "",
    message: "",
  });

  const [status, setStatus] = useState<string>("");
  const [errors, setErrors] = useState({
    contactNumber: "",
  });

  const phoneNumberRegex = /^\+?(\d{10,13})$/;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!phoneNumberRegex.test(formData.contactNumber)) {
      setErrors({
        ...errors,
        contactNumber: "Please enter a valid phone number.",
      });
      return;
    }

    setErrors({ ...errors, contactNumber: "" });
    try {
      const response = await postEmailWithRetry(formData);
      if (response.data) {
        setStatus("Email sent successfully!");
      } else {
        setStatus(`Error: ${response.data.message}`);
      }
    } catch (error: unknown) {
      setStatus("Error sending email");
    }

    setFormData({
      name: "",
      contactNumber: "",
      contactEmail: "",
      subject: "",
      date: "",
      message: "",
    });
  };

  return (
    <div className="shadow-md rounded-md flex items-center justify-center bg-white w-full p-4 sm:p-6 md:p-8">
      <form
        className="w-full sm:w-3/4 md:w-2/3 text-1 font-monaSans"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl sm:text-3xl font-extrabold italic text-center mb-6">
          GET IN TOUCH, TODAY.
        </h3>

        <div className="text-red-500">{status && <p>{status}</p>}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <input
            className="border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 py-2 px-3"
            id="name"
            name="name"
            type="text"
            placeholder="What's Your Name?"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col">
            <input
              className={`border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 py-2 px-3 ${
                errors.contactNumber ? "border-red-500" : ""
              }`}
              id="contactNumber"
              name="contactNumber"
              type="text"
              placeholder="Your Number?"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm">{errors.contactNumber}</p>
            )}
          </div>
          <input
            className="border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 py-2 px-3"
            id="contactEmail"
            name="contactEmail"
            type="email"
            placeholder="Your E-mail?"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
          <input
            className="border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 py-2 px-3"
            id="date"
            name="date"
            type="date"
            placeholder="What's Date is the Event?"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <input
            className="border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 w-full py-2 px-3"
            id="subject"
            name="subject"
            placeholder="What sort of event are you organising?"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            className="border-b border-gray-300 focus:border-black focus:outline-none transition-all duration-1000 w-full py-2 px-3"
            id="message"
            name="message"
            placeholder="Tell me about the event, any special requests?..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="bg-stone-200 hover:bg-stone-300 rounded px-10 py-3 w-full sm:w-auto"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
