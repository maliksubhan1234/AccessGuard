# Access Guard 🛡️

Access Guard is a secure, lightweight REST API authentication system built with Node.js, Express, and MongoDB. It implements robust **Access Token** and **Refresh Token** mechanics (JWT) alongside salted password hashing to provide a secure foundation for user management and session controls.

---

##  Features

* **Secure Authentication:** Dual-token mechanism utilizing short-lived Access Tokens (10 mins) and long-lived Refresh Tokens (7 days).
* **Token Rotation & Validation:** Stores the active refresh token in MongoDB to ensure secure session validation and single-device lifecycle tracking.
* **Password Hashing:** Uses `bcryptjs` with a cost factor of 10 for industry-standard password protection.
* **Complete User CRUD:** Full support for creating, reading, updating, and deleting user records protected behind verification middleware.

---

##  Tech Stack

* **Runtime Environment:** Node.js (ES Modules)
* **Framework:** Express.js
* **Database:** MongoDB via Mongoose
* **Security:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs`

---

##  Prerequisites

Before setting up the project locally, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16.x or higher recommended)
* [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)

---

##  Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/access-guard.git](https://github.com/your-username/access-guard.git)
   cd access-guard
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory of the project and populate it with your local credentials:

Code snippet
PORT=8000
MONGO_URI=mongodb://localhost:27017/ag
JWT_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
Start the server:

Bash
# Make sure your package.json has "type": "module" and appropriate start scripts
npm run dev