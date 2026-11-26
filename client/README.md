# 🚀 HirePilot AI

### Your AI Copilot for the Next Career Move

HirePilot AI is an AI-powered job discovery and career assistance platform designed to help job seekers find relevant opportunities, explore companies, discover HR contacts, and manage their job search more efficiently.

Built with **React, Vite, Node.js, and Express**, HirePilot brings job search data from multiple sources into one simple dashboard.

---

## ✨ Features

- 🔍 **Smart Job Search** — Search job opportunities by designation, keywords, and location.
- 🌐 **Multiple Job Sources** — Fetch job listings using JSearch and SerpAPI integrations.
- 📅 **Job Posting Filters** — Filter opportunities based on posting date.
- 🏢 **Company Contact Discovery** — Find company and HR contact information using Hunter.
- 💾 **Save Jobs** — Save interesting job opportunities for later.
- 🔗 **Direct Apply Links** — Open the original job application page.
- 📱 **Responsive Dashboard** — Designed to work across desktop and mobile screens.
- ⚡ **Fast Development Experience** — Powered by Vite and modern JavaScript tooling.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- REST API

### Integrations
- JSearch API
- SerpAPI
- Hunter API

---

## 📂 Project Structure

```text
HirePilot-Ai/
│
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/                  # Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   └── ...
│
├── scripts/                 # Utility scripts
├── package.json
├── package-lock.json
├── LICENSE
└── README.md
```

---

## ⚙️ Getting Started

Follow these steps to run HirePilot AI locally.

### 1. Clone the repository

```bash
git clone https://github.com/Rahul-shastri67/HirePilot.ai.git
```

### 2. Navigate to the project

```bash
cd HirePilot-Ai
```

### 3. Install backend dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add your API keys:

```env
PORT=5000

JSEARCH_API_KEY=your_jsearch_api_key
HUNTER_API_KEY=your_hunter_api_key
SERPAPI_API_KEY=your_serpapi_api_key
```

Replace the placeholder values with your own API keys.

**Important:** Never commit your `.env` file or expose API keys in the frontend.

### 5. Start the backend

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 6. Start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Vite will provide a local frontend URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser to use HirePilot AI.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend status |
| GET | `/api/jobs/search` | Search job opportunities |
| GET | `/api/companies/:domain/contacts` | Find company contacts |

### Example: Search Jobs

```http
GET /api/jobs/search?query=React Developer&location=Noida&days=7
```

### Example: Backend Health Check

```http
GET http://localhost:5000/api/health
```

---

## 🔐 Security

- API keys are stored in environment variables.
- Sensitive configuration should not be committed to GitHub.
- Third-party API credentials should only be used on the backend.

---

## 🗺️ Roadmap

The following features are planned for future development:

- [ ] User registration and login
- [ ] JWT-based authentication
- [ ] User profile management
- [ ] Resume and profile image upload
- [ ] Personalized job preferences
- [ ] Salary, experience, and work-mode filters
- [ ] Application tracking dashboard
- [ ] AI-generated HR application emails
- [ ] Email verification and password recovery
- [ ] Improved mobile experience

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your changes.
5. Open a Pull Request.

---

## 👨‍💻 Author

**Rahul Shastri**

- GitHub: [Rahul-shastri67](https://github.com/Rahul-shastri67)
- Portfolio: [My Portfolio](https://rahul-shastri67.github.io/My-Portfolio/)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/rahul-shastri-b690ba2b8/)

---

## 📄 License

This project is licensed under the terms of the [LICENSE](LICENSE) file.

---

<p align="center">
  <strong>HirePilot AI — Find opportunities. Build your future. 🚀</strong>
</p>