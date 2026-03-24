"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is LingoCritters?",
    answer:
      "LingoCritters is a bilingual learning app that helps children learn two languages through animal-guided lessons.",
  },
  {
    question: "Who is LingoCritters for?",
    answer:
      "LingoCritters is built for bilingual children and their families. It is meant to be used with a parent or guardian.",
  },
  {
    question: "Can I change my child's language pair?",
    answer:
      "Yes, parents can change the language pair at any time from the dashboard.",
  },
  {
    question: "Do I need an account to use LingoCritters?",
    answer:
      "Yes, you will need to create an account to track your child's progress and save their lessons.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white border-4 border-deep-dark rounded-2xl shadow-comic overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full text-left px-6 py-4 font-black text-deep-dark text-lg flex justify-between items-center hover:bg-star-yellow transition-colors duration-150"
          >
            {faq.question}
            <span className="text-ollie-purple text-2xl font-black ml-4">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 border-t-4 border-deep-dark bg-warm-white">
              <p className="text-deep-dark font-semibold text-sm leading-relaxed opacity-70">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, phone, message });
    setSubmitted(true);
  }

  const inputClass =
    "w-full border-4 border-deep-dark rounded-xl px-4 py-3 text-deep-dark font-bold text-base bg-white focus:outline-none focus:border-ollie-purple transition-colors duration-150";
  const labelClass =
    "block text-deep-dark font-black text-sm uppercase tracking-wide mb-2";

  return (
    <>
      <main className="min-h-screen font-display overflow-x-hidden">
        {/* ── HERO ── */}
        <section className="relative bg-star-yellow py-24 px-6 text-center overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pico-orange rounded-full border-4 border-deep-dark opacity-20" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-ollie-purple rounded-full border-4 border-deep-dark opacity-15" />
          <h1 className="relative z-10 text-5xl md:text-6xl font-black text-deep-dark leading-tight mb-4">
            Contact Us
          </h1>
          <p className="relative z-10 text-deep-dark font-bold text-xl max-w-xl mx-auto opacity-80">
            Have a question or concern? We would love to hear from you.
          </p>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="bg-warm-white py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-deep-dark font-black text-4xl mb-10 text-center">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-ollie-purple border-4 border-deep-dark rounded-3xl p-10 text-center shadow-comic-xl">
                <p className="text-white font-black text-2xl mb-2">
                  Message Sent!
                </p>
                <p className="text-white font-semibold opacity-80">
                  Thanks for reaching out. We will get back to you soon.
                </p>
              </div>
            ) : (
              <div className="bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl">
                <div className="flex flex-col gap-6">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="johndoe@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone{" "}
                      <span className="text-deep-dark opacity-40 normal-case font-semibold">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="704-000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Leave your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className={inputClass}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="bg-ollie-purple text-white font-black text-lg rounded-2xl px-10 py-4 border-4 border-deep-dark shadow-comic-lg hover:translate-y-1 hover:shadow-comic transition-all duration-150 w-full"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-ollie-purple py-20 px-6">
          <h2 className="text-white font-black text-4xl mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <FAQAccordion />
        </section>
      </main>
    </>
  );
}
