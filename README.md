# LingoCritters 🦉🐢🦜

A bilingual learning app designed to help children ages 5–7 learn two languages through animal-guided lessons.

---

## Overview

LingoCritters is a web-based educational app built for bilingual children and their families. Learning two languages at once can be challenging for kids — LingoCritters makes it feel natural and fun through interactive lessons guided by three animal characters: Ollie the Owl, Teo the Turtle, and Pico the Parrot. Parents and guardians stay in control by managing their child's account, tracking progress, and switching language pairs at any time.

> LingoCritters is designed to be used with a parent or guardian present.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js / React | Frontend framework and routing |
| AWS RDS | Database for storing user accounts, progress, and lesson data |
| HuggingFace API | AI-powered pronunciation feedback for Pico's speaking lessons |
| Tailwind CSS | Styling and responsive design |

---

## Pages & Features

### Home
- Introduces LingoCritters and its mission
- Showcases the three animal guides
- Language pair selector for families to choose their two languages
- Call to action buttons — Login and Get Started

### About
- Mission statement and app purpose
- Meet the critter guides — Ollie, Teo, and Pico
- Information for parents and guardians

### Login
- Email and password authentication
- Redirects to dashboard based on user role

### Register
- Full name, email, and password fields
- Role selector — Child or Parent / Guardian
- Password confirmation validation

### Learn
The core educational page with three lesson modes:
- 📖 **Reading with Ollie** — word cards that flip between both selected languages
- ✏️ **Writing with Teo** — letter tracing practice
- 🎙️ **Speaking with Pico** — AI-powered pronunciation feedback via HuggingFace

> The app is fully functional without AI. HuggingFace enhances Pico's speaking lessons but is not required for the core experience.

### Dashboard
Personalized view based on who is logged in:
- **Child view** — earned stars, completed lessons, critter buddy, continue learning button
- **Parent view** — child progress across all 3 lesson types, language pair switcher, manage child accounts
- **Admin view** — all users and activity, manage lesson content, platform usage overview

### Contact
- Contact form with name, email, phone, and message fields
- FAQ accordion covering common questions

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine
- npm (comes with Node.js)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/lingocritters.git
```

2. Navigate into the project folder
```bash
cd lingocritters/my-next-app
```

3. Install dependencies
```bash
npm install
```

4. Run the development server
```bash
npm run dev
```

5. Open your browser and go to
```
http://localhost:3000
```

---

## Project Status

Nearly complete. Core pages and lesson structure are built. AWS RDS integration and HuggingFace API connection are in progress.

---

## Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   ├── learn/
│   ├── about/
│   ├── contact/
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── auth/
│   ├── critters/
│   ├── lessons/
│   └── ui/
├── hooks/
└── lib/
```

---

*LingoCritters — Where every word opens a new world.*
