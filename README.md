# CleanCash Backend API Documentation

## Base URL
**Live API:** [CleanCash API](https://cleancash.vercel.app/)

## Authentication Routes
| Endpoint | Method | Middleware | Description |
|----------|--------|------------|-------------|
| `/register` | `POST` | None | Register a new user |
| `/login` | `POST` | None | Login user and return JWT token |
| `/validate-otp` | `POST` | None | Validate OTP for authentication |
| `/generate-otp` | `POST` | None | Generate OTP for user verification |
| `/create-user` | `POST` | `verifyJwt`, `verifyRole("admin")` | Create any user |

## Report Routes
| Endpoint | Method | Middleware | Description |
|----------|--------|------------|-------------|
| `/create-report` | `POST` | `verifyJwt`, `upload.single("image")` | Create a new report |
| `/get-report/:id` | `GET` | `verifyJwt` | Get a specific report by ID |
| `/get-all-report` | `GET` | `verifyJwt`, `verifyRole("admin")` | Get all reports (Admin only) |
| `/update-report/:id` | `PATCH` | `verifyJwt`, `verifyRole("officer")` | Update report status (Officer only) |
| `/get-report-by-user` | `GET` | `verifyJwt` | Get reports associated with the logged-in user |
| `/get-report-by-officer` | `GET` | `verifyJwt`, `verifyRole("officer")` | Get reports assigned to an officer |
| `/assign-report/:id` | `POST` | `verifyJwt`, `verifyRole("admin")`, `verifyRole("officer")` | Assign a report to an officer |
| `/get-report-for-officer` | `GET` | `verifyJwt`, `verifyRole("officer")` | Get reports assigned to an officer |

### Notes
- All protected routes require `verifyJwt` middleware.
- Role-based access control is enforced using `verifyRole(role)`. Admins and officers have specific permissions.
- Image uploads in reports are handled via `upload.single("image")` middleware.



**For User End Point**
```
https://cleancash.vercel.app/api/v1/users
```
- Example 
```
https://cleancash.vercel.app/api/v1/users/register
```
- it will create a user with name, email and password

**For Report End Points**
- Example 
```
https://cleancash.vercel.app/api/v1/report/create-report
```
- it will create a report with image, description, city, state, locality, pollutionType

## Error Handling
- API uses a global error handler that returns structured error messages using `ApiError` class.

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Setup environment variables in `.env`
4. Start the server: `npm start` or `nodemon` for development.

---
This documentation serves as a guide for backend API routes for CleanCash. 🚀

