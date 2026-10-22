# HireHubb – Smart Job Hiring Platform

HireHubb is a full-stack MERN Job Portal platform where students can explore and apply for jobs, and recruiters can post and manage job listings.

# Live Demo
- Frontend (Vercel): https://hire-hubb.vercel.app
- Backend API (Render): https://hirehubb.onrender.com

 # Features:-
 
 Student
 
User Authentication (Signup/Login)
Browse Jobs
Search Jobs
Apply for Jobs
Update Profile
View Applied Jobs

 Recruiter

Create Company Profile
Post New Jobs
View Applicants
Manage Job Listings

 
# Role-Based Access Control
Every protected route goes through two checks on the backend:

1. `isAuthenticated` - verifies the JWT from the httpOnly cookie (401 if missing, invalid or expired).
2. `authorizeRoles(...roles)` - looks up the user's role and returns 403 if the role is not allowed.

```js
router.route("/post").post(isAuthenticated, authorizeRoles("recruiter"), postJob);
```

| Action | Student | Recruiter |
|---|---|---|
| Browse / view jobs | Yes | Yes |
| Apply for a job, view applied jobs | Yes | No |
| Register / view / update company | No | Yes (own companies only) |
| Post a job, view posted jobs | No | Yes (own companies only) |
| View applicants, update application status | No | Yes (own jobs only) |

Ownership checks: a recruiter can only access companies they registered and jobs they posted. Accessing another recruiter's data returns 403.

# Tech Stack

 Frontend:-
   
React.js
Vite
Tailwind CSS
Redux Toolkit
Axios
React Router DOM

 Backend:-

Node.js
Express.js
MongoDB (Atlas)
Mongoose

# JWT Authentication
Bcrypt
Multer (File Upload)

 
 # Project Structure
HireHubb
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   └── utils
│
├── frontend
│   ├── components
│   ├── redux
│   ├── hooks
│   └── pages
