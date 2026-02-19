#  DSA Tracker – Full Stack Application

A full stack DSA Tracker application built using **Next.js (Frontend)** and **Express + MongoDB (Backend)**.

This platform allows students to:

-  Register & Login securely (JWT-based authentication)
-  Explore topic-wise DSA problems
-  Access curated learning resources (YouTube, LeetCode, Codeforces, Articles)
-  Mark problems as completed
-  Persist progress across sessions

##  Tech Stack

###  Frontend
- Next.js (App Router)
- Tailwind CSS
- Context API (Authentication)
- Fetch API

###  Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (Password Hashing)


##  System Architecture

```
Frontend (Next.js)
      |
      | HTTP Requests
      ↓
Backend (Express API)
      |
      | Mongoose ODM
      ↓
MongoDB
```


##  Database Structure

###  Users Collection

```js
{
  name: String,
  email: String,
  password: String (hashed),
  completedProblems: [ObjectId]
}
```

###  Topics Collection

```js
{
  title: String,
  problems: [
    {
      title: String,
      youtubeLink: String,
      leetcodeLink: String,
      codeforcesLink: String,
      articleLink: String,
      difficulty: "Easy" | "Medium" | "Hard"
    }
  ]
}
```


##  Authentication Flow

1. User registers → Password hashed using bcrypt.
2. User logs in → JWT token generated.
3. Protected routes require JWT.
4. Progress stored per user in `completedProblems`.


##  Features

- Secure JWT Authentication
- Password hashing with bcrypt
- Topic-wise DSA categorization
- Difficulty tagging (Easy / Medium / Hard)
- Curated learning resources per problem
- Persistent progress tracking
- Clean MVC backend structure
- Scalable data modeling


#  How To Run The Project


## Clone Repository

```bash
git clone <your-repository-link>
cd dsa-tracker
```


##  Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/dsa-tracker
JWT_SECRET=supersecretkey
```

If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.


###  Start Backend

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```


##  Seed Database

To insert DSA topics into MongoDB:

```bash
node seed/seedTopics.js
```

You should see:

```
Topics Seeded Successfully
```


## 🔹 Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```


#  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/register        | Register user |
| POST   | /api/auth/login           | Login user |
| GET    | /api/topics               | Fetch all topics |
| PUT    | /api/progress/:problemId  | Toggle completion |


#  Design Decisions

- Topics stored globally
- User progress stored separately
- Avoided data duplication
- MVC architecture for backend
- Modular frontend structure
- JWT-based protected routes


#  Future Improvements

- Leaderboard system
- Daily streak tracking
- Search & filter functionality
- Admin panel for adding topics
- Analytics dashboard

# Author

Divyansh Verma  
Full Stack Developer  


#  Notes

- Backend and frontend run as separate services.
- MongoDB must be running locally or via Atlas.
- Seed script must be executed before first use.
- Ensure backend runs before starting frontend.

#  Thank You
