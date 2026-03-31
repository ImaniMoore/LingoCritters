# LingoCritters 🦉🐢🦜

A bilingual learning app designed to help children ages master two languages(English & Spanish) through interactive, animal-guided lessons.

---

## Overview

LingoCritters makes language acquisition natural and fun for young learners. Guided by three characters—**Ollie the Owl** and **Pico the Parrot**—children engage in reading and speaking exercises. The platform features a dual-portal system where parents manage accounts and track progress, while children are funneled directly into a gamified learning environment.

---

## Tech Stack

- **Frontend:** Next.js / React
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Database:** MySQL (hosted via Railway)
- **AI Integration:** Hugging Face Inference API
  - **Llama 3:** Dynamic story generation
  - **Kokoro:** Text-to-Speech (TTS) for oral lessons
- **Data Handling:** Hard-coded JSON for standardized reading curriculum

---

## Key Features

### Learn Portal

The core educational hub where children select their learning path:

- 📖 **Reading with Ollie:** Interactive word cards and stories powered by structured JSON data.
- 🎙️ **Speaking with Pico:** AI-powered speaking practice using Llama 3 for content generation and Kokoro for high-quality voice synthesis.

### Dashboard & Management

- **Child View:** Direct redirection to "Learn" mode upon login to keep the focus on education.
- **Parent View:** Secure login to create, monitor, and manage multiple child accounts.
- **Language Control:** Toggle and switch language pairs to customize the bilingual experience.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/ImaniMoore/LingoCritters.git](https://github.com/ImaniMoore/LingoCritters.git)
    ```

2.  **Install dependencies**

    ```bash
    cd lingocritters
    npm install
    ```

3.  **Configure Environment**
    Set up your `.env` file with your Railway MySQL credentials and Hugging Face API keys.

4.  **Launch Development Server**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:3000`.

---

_LingoCritters — Where every word opens a new world._
