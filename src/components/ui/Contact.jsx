"use client";

import { useState } from "react";

const faqs = [
    { question: "What is LingoCritters?", answer: "LingoCritters is a bilingual learning app that helps children learn two languages through animal-guided lessons." },
    { question: "Who is LingoCritters for?", answer: "LingoCritters is built for bilingual children and their families. It is meant to be used with a parent or guardian." },
    { question: "Can I change my child's language pair?", answer: "Yes, parents can change the language pair at any time from the dashboard." },
    { question: "Do I need an account to use LingoCritters?", answer: "Yes, you will need to create an account to track your child's progress and save their lessons." },
];

function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState(null);

    function toggle(index) {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <div>
            {faqs.map((faq, index) => (
                <div key={index}>
                    <button onClick={() => toggle(index)}>
                        {faq.question}
                    </button>
                    {openIndex === index && <p>{faq.answer}</p>}
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

    return (
        <div>
            <h1>Contact Us</h1>
            <p>Have a question or concern? We would love to hear from you.</p>

            {submitted ? (
                <p>Thanks for reaching out! We will get back to you soon.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="johndoe@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder="704-000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        placeholder="Leave your message here.."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />

                    <button type="submit">Send Message</button>
                </form>
            )}

            <h2>Frequently Asked Questions</h2>
            <FAQAccordion />
        </div>
    );
}