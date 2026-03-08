<div align="center">

<br/>

```
████████╗ █████╗ ██╗     ███████╗███╗   ██╗████████╗██╗     ███████╗███╗   ██╗███████╗
╚══██╔══╝██╔══██╗██║     ██╔════╝████╗  ██║╚══██╔══╝██║     ██╔════╝████╗  ██║██╔════╝
   ██║   ███████║██║     █████╗  ██╔██╗ ██║   ██║   ██║     █████╗  ██╔██╗ ██║███████╗
   ██║   ██╔══██║██║     ██╔══╝  ██║╚██╗██║   ██║   ██║     ██╔══╝  ██║╚██╗██║╚════██║
   ██║   ██║  ██║███████╗███████╗██║ ╚████║   ██║   ███████╗███████╗██║ ╚████║███████║
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝
```

### *Where talent meets opportunity.*

<br/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

<br/>

> **TalentLens** is a full-stack MERN job portal that bridges the gap between ambitious candidates and forward-thinking companies — with a sleek, modern, and fast UI built for the next generation of hiring.

<br/>

[![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/TalentLens?style=social)](https://github.com/YOUR_USERNAME/TalentLens)
[![Forks](https://img.shields.io/github/forks/YOUR_USERNAME/TalentLens?style=social)](https://github.com/YOUR_USERNAME/TalentLens/fork)
[![Issues](https://img.shields.io/github/issues/YOUR_USERNAME/TalentLens?color=gold)](https://github.com/YOUR_USERNAME/TalentLens/issues)

</div>

---

## 📸 Preview

> *(Screenshots coming soon — UI is 🔥)*

| Landing Page | Job Listings | Recruiter Dashboard |
|:---:|:---:|:---:|
| ![landing](screenshots/landing.png) | ![jobs](screenshots/jobpage.png) | ![dashboard](screenshots/dashboard.png) |

---

## ⚡ What is TalentLens?

TalentLens is not just another job board. It's a **complete recruitment ecosystem** — built ground-up with a dark-themed, gold-accented UI that feels premium and modern.

- 🎯 **Candidates** can search, filter, browse, and apply to jobs effortlessly
- 🏢 **Recruiters** can post openings, manage listings, and accept/reject applicants in real time
- 🔒 **Auth** is JWT-secured with bcrypt-hashed passwords — no shortcuts
- ☁️ **Cloud-native** — resumes and company logos go directly to Cloudinary
- 🚀 **Blazing fast** — Vite-powered frontend, optimized Redux state

---

## ✨ Features

<details>
<summary><b>👤 For Candidates</b></summary>
<br/>

- 🔐 Secure Signup / Login with JWT
- 📋 Browse and search jobs by keyword, location, or category
- 📂 Upload resume (PDF) — stored on Cloudinary
- 💼 View detailed job descriptions
- ✅ Apply to jobs with one click
- 📊 Track all applied jobs and their statuses
- 🙍 Manage full profile — name, bio, skills, contact, resume

</details>

<details>
<summary><b>🏢 For Recruiters</b></summary>
<br/>

- 🏭 Register and setup company profile with logo
- 📝 Post new job openings with full details
- 📋 Manage all job listings from admin panel
- 👥 View all applicants per job
- ✅ Accept or ❌ Reject applicants — status updates instantly
- 🔍 See applicant resumes and contact info directly

</details>

<details>
<summary><b>⚙️ Platform-level</b></summary>
<br/>

- 🔑 JWT-based auth with HTTP-only cookies
- 🔒 Passwords hashed with bcrypt
- 📁 File uploads via Multer + Cloudinary
- ⚡ Redux Toolkit for global state
- 🎞️ Framer Motion animations throughout
- 📱 Fully responsive design
- 🌑 Dark theme with gold accent design system

</details>

---

## 🛠 Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **Redux Toolkit** | Global state management |
| **React Router v6** | Client-side routing |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Page & component animations |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |

### Backend
| Tech | Purpose |
|------|---------|
| **Node.js** | Runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Auth tokens |
| **bcrypt.js** | Password hashing |
| **Multer** | File upload middleware |
| **Cloudinary** | Cloud media storage |
| **Cookie-parser** | Cookie handling |
| **CORS** | Cross-origin requests |

---

## 📁 Project Structure

```
TalentLens/
│
├── 📦 frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── shared/          # Navbar, Footer
│       │   ├── ui/              # Reusable UI (shadcn components)
│       │   └── admin/           # Recruiter-side components
│       ├── hooks/               # Custom React hooks
│       ├── redux/               # Store, slices (auth, job, application, company)
│       ├── utils/               # Constants, helpers
│       └── main.jsx
│
└── 📦 backend/
    ├── controllers/             # Route handler logic
    │   ├── user.controller.js
    │   ├── job.controller.js
    │   ├── company.controller.js
    │   └── application.controller.js
    ├── models/                  # Mongoose schemas
    │   ├── user.model.js
    │   ├── job.model.js
    │   ├── company.model.js
    │   └── application.model.js
    ├── routes/                  # Express routers
    ├── middleware/
    │   ├── isAuthenticated.js   # JWT guard
    │   └── multer.js            # File upload config
    ├── utils/
    │   ├── db.js                # MongoDB connection
    │   └── cloudinary.js        # Cloudinary config
    └── index.js                 # Entry point
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) `>= 18.x`
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Cloudinary](https://cloudinary.com/) account

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/TalentLens.git
cd TalentLens
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/talentlens

JWT_SECRET=your_super_secret_key_here
JWT_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

Backend runs at → `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## 🔌 API Endpoints

<details>
<summary><b>👤 User Routes — <code>/api/v1/user</code></b></summary>

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | Login & get JWT cookie |
| GET | `/logout` | ✅ | Logout |
| PUT | `/profile/update` | ✅ | Update profile |

</details>

<details>
<summary><b>🏢 Company Routes — <code>/api/v1/company</code></b></summary>

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/register` | ✅ | Register company |
| GET | `/get` | ✅ | Get my companies |
| GET | `/get/:id` | ✅ | Get company by ID |
| PUT | `/update/:id` | ✅ | Update company |

</details>

<details>
<summary><b>💼 Job Routes — <code>/api/v1/job</code></b></summary>

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/post` | ✅ | Post a new job |
| GET | `/get` | ✅ | Get all jobs (with filters) |
| GET | `/getadminjobs` | ✅ | Get recruiter's own jobs |
| GET | `/get/:id` | ✅ | Get job by ID |

</details>

<details>
<summary><b>📋 Application Routes — <code>/api/v1/application</code></b></summary>

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/apply/:id` | ✅ | Apply to a job |
| GET | `/get` | ✅ | Get my applications |
| GET | `/:id/applicants` | ✅ | Get applicants for a job |
| POST | `/status/:id/update` | ✅ | Update application status |

</details>

---

## 🔐 Auth Flow

```
User fills Signup form
        ↓
POST /api/v1/user/register
        ↓
bcrypt hashes password → stored in MongoDB
        ↓
JWT token generated → sent as HTTP-only cookie
        ↓
Redux stores user info → Protected routes unlocked
```

---

## 🚀 Deployment (Coming Soon)

| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend deployment |
| **Render / Railway** | Backend deployment |
| **MongoDB Atlas** | Cloud database |
| **Cloudinary** | Media storage |

---

## 🗺 Roadmap

- [x] JWT Authentication
- [x] Candidate & Recruiter flows
- [x] Job listing & application system
- [x] Cloudinary file uploads
- [x] Dark-theme premium UI
- [x] Real-time applicant status update
- [ ] AI-powered job recommendations
- [ ] Resume parser
- [ ] Email notifications (Nodemailer)
- [ ] Company analytics dashboard
- [ ] Real-time chat (Socket.io)
- [ ] Mobile app (React Native)

---

## 👨‍💻 Author

<div align="center">

<br/>

**Ajay Thakur**

*CSE Student @ NIT Allahabad*

Built with 🔥 and a lot of `console.log()`s

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/YOUR_PROFILE)

</div>

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

```bash
# Fork the repo
git checkout -b feature/amazing-feature
git commit -m 'Add amazing feature'
git push origin feature/amazing-feature
# Open a Pull Request
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

<br/>

If TalentLens helped you or impressed you — drop a ⭐ on GitHub. It means a lot!

<br/>

*Made with ❤️ by Ajay · NIT Allahabad*

</div>