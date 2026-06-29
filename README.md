# Next Auth Kit 🔐

A production-ready, full-stack authentication system built with **Next.js 15**, **TypeScript**, and **MongoDB**. This project provides a complete authentication solution with JWT-based token management, automatic token refresh, email verification, password reset functionality, and a responsive dashboard with a modern dark purple gradient theme.

## Project Overview

Next Auth Kit is a comprehensive authentication boilerplate designed to provide developers with a secure, scalable foundation for Next.js applications requiring user authentication. It implements industry-standard security practices including password hashing, JWT token authentication with automatic refresh, email verification, and protected route middleware. The system is built with the Next.js 15 App Router, React 19, and TypeScript for full type safety.

This project solves the complex problem of implementing secure authentication from scratch by providing:
- A dual-token authentication system (access + refresh tokens)
- Three-level automatic token refresh (middleware, API, and client-side)
- Email-based user verification and password recovery
- Protected routes with automatic redirection
- A beautiful, responsive dashboard UI

**Target Audience**: Developers building Next.js applications that require secure user authentication, startups needing a robust auth foundation, and teams looking for a production-ready authentication starter kit.

## Key Features

### Authentication & Security
- **User Registration** - Complete signup flow with form validation and email verification
- **User Login** - Secure authentication with JWT access and refresh tokens
- **Email Verification** - Account activation via time-limited email tokens (10 minutes)
- **Password Reset** - Complete forgot password flow with secure token-based reset
- **Change Password** - Authenticated users can securely update their password
- **Logout** - Secure session termination that clears both access and refresh tokens
- **Remember Me** - Persistent login with extended refresh token lifetime (7 days vs 30 days)
- **Automatic Token Refresh** - Seamless token renewal at middleware, API, and client levels
- **Protected Routes** - Middleware-based route protection with automatic redirection
- **Password Hashing** - bcryptjs with 10 salt rounds for secure password storage
- **JWT Authentication** - Token-based authentication using the Jose library (HS256 algorithm)

### User Interface & Experience
- **Responsive Dashboard** - Full-featured sidebar layout with mobile hamburger menu
- **Modern Dark Theme** - Stunning dark purple gradient design throughout
- **Toast Notifications** - Real-time user feedback using Sonner
- **Form Validation** - Client-side validation with detailed error messages
- **Loading States** - Visual feedback during async operations
- **Password Visibility Toggle** - Eye icon to show/hide password input
- **Mobile-First Design** - Fully responsive across all screen sizes
- **Smooth Animations** - Transitions, transforms, and hover effects
- **Accessible UI** - Semantic HTML and ARIA labels where appropriate

### Technical Features
- **Next.js 15** - Latest React framework with App Router and Turbopack
- **React 19** - Latest React features and optimizations
- **TypeScript** - Full type safety across the entire application
- **MongoDB** - NoSQL database with Mongoose ODM
- **Server Actions** - API routes using Next.js 15 Route Handlers
- **Middleware Authentication** - Request-level authentication and token refresh
- **Cookie-Based Storage** - HttpOnly, secure cookies for token storage
- **Email Service** - Transactional emails via Resend API
- **Vercel Analytics** - Built-in analytics integration

## Main Functional Areas

### 1. **Public Pages**
- **Welcome Page** (`/`) - Landing page with hero section, feature highlights, and CTAs
- **Login Page** (`/user/login`) - User signin with remember me option
- **Register Page** (`/user/register`) - User signup with comprehensive validation
- **Email Verification Request** (`/user/verify`) - Page to request verification email
- **Email Verification Confirmation** (`/user/verify-token`) - Token-based email verification
- **Forgot Password** (`/user/reset-password`) - Request password reset link
- **Reset Password** (`/user/reset-password/verify`) - Set new password with token

### 2. **Protected Dashboard**
- **Dashboard Home** (`/user/dashboard`) - Main dashboard with sidebar navigation
- **Settings** (`/user/dashboard/settings`) - User settings area
- **Security Settings** (`/user/dashboard/settings/security`) - Change password functionality

### 3. **API Endpoints**
All authentication endpoints follow RESTful conventions and return JSON with `success` boolean flags:
- `POST /api/users/register` - Create new user account
- `POST /api/users/login` - Authenticate user and issue tokens
- `POST /api/users/logout` - Clear authentication cookies
- `GET /api/users/profile` - Get authenticated user data
- `POST /api/users/change-password` - Update user password (requires current password)
- `POST /api/users/user-verify` - Verify email with token
- `POST /api/users/user-verify/sent` - Send verification email
- `POST /api/users/forgot-password/sent` - Send password reset email
- `POST /api/users/forgot-password/verify` - Reset password with token
- `POST /api/users/token` - Refresh access token using refresh token

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 6.0
- **Styling**: Tailwind CSS 4.2
- **Icons**: Lucide React 1.7
- **Notifications**: Sonner 2.0
- **Fonts**: Geist Sans & Geist Mono (Google Fonts)
- **Analytics**: Vercel Analytics 2.0

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js 15 (Route Handlers)
- **Database**: MongoDB
- **ORM**: Mongoose 9.4
- **Authentication**: JWT (Jose library 6.2)
- **Password Hashing**: bcryptjs 3.0
- **Email Service**: Resend 6.10

### Development Tools
- **Package Manager**: pnpm
- **Build Tool**: Turbopack (Next.js 15)
- **Linting**: ESLint (Next.js config)
- **Type Checking**: TypeScript compiler

### Deployment
- **Platform**: Vercel (optimized for Next.js)
- **Environment**: Production and Development configurations

## Project Architecture

### High-Level Architecture

This application follows a **layered architecture** pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                        │
│  (React Components, Pages, Client-Side Logic)          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Middleware Layer                       │
│  (Authentication, Token Refresh, Route Protection)     │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   API Layer (Route Handlers)            │
│  (Business Logic, Request/Response Handling)           │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Service/Helper Layer                       │
│  (Utilities: Token Management, Email, DB Connection)   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Data Layer                            │
│  (Mongoose Models, Database Operations)                │
└─────────────────────────────────────────────────────────┘
```

### Folder Organization

- **`/src/app`** - Next.js App Router pages and API routes
  - **`/api/users`** - RESTful API endpoints for user operations
  - **`/user`** - User-facing pages (auth forms, dashboard)
  - **`layout.tsx`** - Root layout with fonts, analytics, and toast provider
  - **`page.tsx`** - Welcome/landing page
  - **`globals.css`** - Global styles with Tailwind imports

- **`/src/components`** - Reusable React components
  - **`dashboardSideBar.tsx`** - Sidebar navigation with mobile support
  - **`dashboard.tsx`** - Main dashboard content area
  - **`security.tsx`** - Security settings form
  - **`setting.tsx`** - General settings component
  - **`/ui`** - UI library components (Sonner toaster)

- **`/src/helpers`** - Utility functions and shared logic
  - **`apiUtils.ts`** - Client-side API wrapper with auto token refresh
  - **`decodeToken.ts`** - JWT token decoding utility
  - **`mailer.ts`** - Email sending service with Resend
  - **`refreshToken.ts`** - Server-side token refresh logic

- **`/src/lib`** - Core library code
  - **`db.ts`** - MongoDB connection with singleton pattern

- **`/src/models`** - Mongoose database models
  - **`userModel.ts`** - User schema with validation rules

- **`/src/types`** - TypeScript type definitions
  - **`index.ts`** - Centralized type exports

- **`/src/proxy.ts`** - Middleware for authentication and token management

- **`/email`** - Email templates
  - **`template.tsx`** - React email component for verification and reset emails

### Rendering Strategy

- **Server Components**: Default for all pages, used for initial rendering and SEO
- **Client Components**: Used for interactive forms, dashboard, and state management (marked with `"use client"`)
- **API Routes**: Server-side Route Handlers for all backend operations

### Data Flow

1. **User Action** → Client component receives input
2. **Client Validation** → Form validation on the client side
3. **API Request** → Fetch call to Next.js Route Handler
4. **Middleware Check** → Authentication middleware validates tokens
5. **Route Handler** → Business logic execution, database operations
6. **Database** → Mongoose queries to MongoDB
7. **Response** → JSON response with success/error
8. **Client Update** → UI updates based on response, toast notifications

## How the Application Works

### Complete User Flow

#### 1. **Registration Flow**
1. User navigates to `/user/register`
2. User fills out form (firstname, lastname, username, email, password, confirmPassword)
3. Client-side validation checks all fields (length, format, password match)
4. Form submits to `POST /api/users/register`
5. Backend validates email doesn't exist
6. Password is hashed with bcrypt (10 rounds)
7. User document created in MongoDB with `isVerified: false`
8. Verification email sent via Resend with hashed token (10-minute expiry)
9. User redirected to login page with success message
10. User checks email and clicks verification link
11. Link navigates to `/user/verify-token?token=...&type=email`
12. Token submitted to `POST /api/users/user-verify`
13. Backend finds user by token and checks expiry
14. User's `isVerified` set to `true`, token fields cleared
15. User can now log in

#### 2. **Authentication Flow (Login)**
1. User navigates to `/user/login`
2. User enters email, password, and optionally checks "Remember Me"
3. Client validates email format and password length
4. Form submits to `POST /api/users/login`
5. Backend finds user by email (with password field explicitly selected)
6. bcrypt compares submitted password with hashed password
7. Backend checks if user is verified (`isVerified === true`)
8. If authenticated:
   - Access token created (JWT, 1-hour expiry) with user data
   - Refresh token created (JWT, 7-day or 30-day expiry based on Remember Me)
   - Both tokens set as httpOnly, secure cookies
9. User data returned in response
10. Client redirects to `/user/dashboard`
11. Middleware validates tokens on subsequent requests

#### 3. **Automatic Token Refresh Flow**

**Middleware Level (Most Common)**:
1. User requests a protected route (e.g., `/user/dashboard`)
2. Middleware (`src/proxy.ts`) intercepts request
3. Checks for `token` and `refreshToken` cookies
4. If access token exists, verifies it with `jwtVerify()`
5. If access token is expired but refresh token is valid:
   - Calls `refreshAccessToken()` helper
   - Generates new access token with userId
   - Sets new access token cookie
   - Request continues to page
6. If both tokens are invalid, redirects to `/user/login`

**API Level (Client-Triggered)**:
1. Client makes API call that returns 401 Unauthorized
2. `apiCall()` helper function catches 401 response
3. Automatically calls `POST /api/users/token`
4. Backend verifies refresh token
5. Fetches full user data from database
6. Generates new access token with complete user data
7. Sets new access token cookie
8. Original API request is retried automatically
9. If refresh fails, user redirected to login

**Client-Side Level (Manual)**:
1. Component calls `useAuthRefresh()` hook
2. Hook provides `refreshToken()` function
3. Function calls `POST /api/users/token`
4. New access token issued or user redirected to login

#### 4. **Password Reset Flow**
1. User clicks "Forgot Password" on login page
2. Navigates to `/user/reset-password`
3. Enters email address
4. Submits to `POST /api/users/forgot-password/sent`
5. Backend finds user by email
6. Generates hashed reset token (10-minute expiry)
7. Token saved to user document (`forgetToken`, `forgetTokenExpiry`)
8. Email sent with reset link
9. User checks email and clicks link
10. Link navigates to `/user/reset-password/verify?token=...`
11. User enters new password
12. Submits to `POST /api/users/forgot-password/verify`
13. Backend validates token and expiry
14. Password hashed and saved, token fields cleared
15. User redirected to login with success message

#### 5. **Dashboard Access Flow**
1. Authenticated user navigates to `/user/dashboard`
2. Middleware validates tokens (refreshes if needed)
3. Dashboard page renders with sidebar
4. Sidebar fetches user profile via `GET /api/users/profile`
5. Profile endpoint decodes JWT token to get userId
6. User data fetched from MongoDB and returned
7. Sidebar displays username, email, and avatar initials
8. User can navigate to settings, change password, or logout

#### 6. **Change Password Flow**
1. User navigates to `/user/dashboard/settings/security`
2. Fills out form (current password, new password, confirm password)
3. Submits to `POST /api/users/change-password`
4. Backend decodes JWT to get userId
5. Fetches user with password field
6. Verifies current password with bcrypt
7. Checks new password is different from current
8. Hashes new password and saves
9. Success message shown, user remains logged in

#### 7. **Logout Flow**
1. User clicks "Logout" in sidebar
2. Client calls `POST /api/users/logout`
3. Backend sets both `token` and `refreshToken` cookies to empty with past expiry
4. Cookies cleared from browser
5. Client redirects to `/user/login`

### Request Lifecycle

**For Protected Routes**:
```
Client Request
    ↓
Middleware (src/proxy.ts)
    ↓
Token Validation
    ↓
[If expired] → Token Refresh → Continue
[If invalid] → Redirect to Login
    ↓
Route Handler / Page Component
    ↓
Response
```

**For API Routes**:
```
Client Fetch
    ↓
Route Handler (/api/users/*)
    ↓
Database Connection (connectDB)
    ↓
Business Logic
    ↓
Database Query (Mongoose)
    ↓
JSON Response (with success flag)
    ↓
Client Updates UI
```

### Database Interactions

All database operations use **Mongoose** ODM:

1. **Connection**: `connectDB()` establishes connection with global caching
2. **Models**: `User` model defines schema with validation
3. **Queries**: 
   - `.findOne()` - Find user by email or ID
   - `.findById()` - Find user by MongoDB ObjectId
   - `.save()` - Create or update user document
   - `.select('+password')` - Explicitly include password field (hidden by default)
   - `.select('+verificationToken +verificationTokenExpiry')` - Include token fields

### Email Integration

1. Email service uses **Resend** API
2. Email types: `VERIFY` (email verification) or `FORGOT_PASSWORD` (password reset)
3. Token generation: User ID hashed with bcrypt (10 rounds)
4. Token saved to user document with 10-minute expiry
5. Email template (`email/template.tsx`) renders React component
6. Email includes clickable link with token in URL query parameter
7. Links point to frontend routes that handle token submission

## Folder Structure

```
next-auth-kit/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # Backend API routes
│   │   │   └── users/                # User-related endpoints
│   │   │       ├── login/            # POST: User authentication
│   │   │       ├── register/         # POST: User registration
│   │   │       ├── logout/           # POST: Clear auth cookies
│   │   │       ├── profile/          # GET: User profile data
│   │   │       ├── change-password/  # POST: Update password
│   │   │       ├── token/            # POST: Refresh access token
│   │   │       ├── user-verify/      # POST: Verify email token
│   │   │       │   └── sent/         # POST: Send verification email
│   │   │       └── forgot-password/
│   │   │           ├── sent/         # POST: Send reset email
│   │   │           └── verify/       # POST: Reset password with token
│   │   ├── user/                     # User-facing pages
│   │   │   ├── login/                # Login page
│   │   │   ├── register/             # Registration page
│   │   │   ├── verify/               # Email verification request
│   │   │   ├── verify-token/         # Email verification handler
│   │   │   ├── reset-password/       # Password reset request
│   │   │   │   └── verify/           # Password reset handler
│   │   │   └── dashboard/            # Protected dashboard
│   │   │       └── settings/
│   │   │           └── security/     # Change password page
│   │   ├── layout.tsx                # Root layout (fonts, analytics)
│   │   ├── page.tsx                  # Landing page
│   │   └── globals.css               # Global styles
│   ├── components/                   # React components
│   │   ├── dashboardSideBar.tsx      # Sidebar navigation
│   │   ├── dashboard.tsx             # Dashboard main content
│   │   ├── security.tsx              # Security settings form
│   │   ├── setting.tsx               # General settings
│   │   └── ui/
│   │       └── sonner.tsx            # Toast notification wrapper
│   ├── helpers/                      # Utility functions
│   │   ├── apiUtils.ts               # Client API wrapper with auto-refresh
│   │   ├── decodeToken.ts            # JWT decoding helper
│   │   ├── mailer.ts                 # Email sending service
│   │   └── refreshToken.ts           # Token refresh logic
│   ├── lib/                          # Core libraries
│   │   └── db.ts                     # MongoDB connection
│   ├── models/                       # Mongoose models
│   │   └── userModel.ts              # User schema
│   ├── types/                        # TypeScript types
│   │   └── index.ts                  # Type definitions
│   └── proxy.ts                      # Authentication middleware
├── email/                            # Email templates
│   └── template.tsx                  # Verification/reset email
├── public/                           # Static assets
├── .env.local                        # Environment variables (gitignored)
├── .env.example                      # Environment variable template
├── package.json                      # Dependencies and scripts
├── pnpm-lock.yaml                    # Package lock file
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
└── CLAUDE.md                         # Developer documentation
```

### Key Directory Purposes

- **`/src/app/api/users`**: All user authentication endpoints. Each subdirectory contains a `route.ts` file with exported HTTP method handlers (POST, GET).

- **`/src/app/user`**: Client-facing authentication pages. Each subdirectory contains a `page.tsx` file that exports a React component.

- **`/src/components`**: Reusable UI components. The `dashboardSideBar.tsx` handles navigation, user profile display, and logout functionality.

- **`/src/helpers`**: Pure utility functions used across the application. These have no side effects and can be unit tested easily.

- **`/src/lib`**: Core infrastructure code. Currently contains database connection logic with singleton pattern for connection reuse.

- **`/src/models`**: Mongoose schemas defining the database structure and validation rules.

- **`/src/types`**: Centralized TypeScript interfaces and types for type safety across the application.

- **`/src/proxy.ts`**: Custom middleware file (not the standard `middleware.ts` location) that intercepts all requests for authentication checks.

## Major Components / Modules

### 1. **Authentication Module** (`/src/app/api/users`)

**Responsibility**: Handle all user authentication operations including registration, login, logout, email verification, and password management.

**Key Files**:
- `login/route.ts` - Authenticates users, issues JWT tokens
- `register/route.ts` - Creates new users, sends verification emails
- `logout/route.ts` - Clears authentication cookies
- `profile/route.ts` - Returns authenticated user data
- `change-password/route.ts` - Updates user password (requires current password)
- `token/route.ts` - Refreshes access tokens

**Interactions**: 
- Connects to database via `src/lib/db.ts`
- Uses `User` model from `src/models/userModel.ts`
- Calls `sendEmail()` from `src/helpers/mailer.ts`
- Generates JWT tokens using Jose library

### 2. **Middleware Module** (`/src/proxy.ts`)

**Responsibility**: Intercept all requests to validate authentication status, automatically refresh expired tokens, and protect routes.

**Key Functionality**:
- Defines public paths (login, register, home, etc.)
- Checks token validity on every request
- Automatically refreshes expired access tokens
- Redirects authenticated users away from auth pages
- Redirects unauthenticated users to login

**Interactions**:
- Imports `refreshAccessToken()`, `isTokenExpired()`, `isRefreshTokenValid()` from `src/helpers/refreshToken.ts`
- Reads cookies from request
- Sets cookies on response
- Runs before every route (except `_next`, `api`, `static`, `favicon.ico`)

### 3. **User Interface Module** (`/src/components`)

**Responsibility**: Provide reusable UI components for the dashboard and settings.

**Key Components**:
- **`dashboardSideBar.tsx`**: 
  - Renders navigation menu with Dashboard and Settings
  - Fetches user profile on mount
  - Handles mobile menu toggle
  - Manages logout functionality
  - Displays user avatar/initials
- **`dashboard.tsx`**: Main dashboard content area
- **`security.tsx`**: Change password form with validation
- **`setting.tsx`**: General user settings

**Interactions**:
- Fetches data from `/api/users/profile`
- Posts logout request to `/api/users/logout`
- Uses Lucide React icons
- Implements responsive design with Tailwind

### 4. **Email Service Module** (`/src/helpers/mailer.ts` + `/email/template.tsx`)

**Responsibility**: Send transactional emails for verification and password reset.

**Key Functionality**:
- Generates secure hashed tokens from user IDs
- Saves tokens to user document with 10-minute expiry
- Sends emails via Resend API
- Uses React email templates

**Email Types**:
- `VERIFY`: Email verification after registration
- `FORGOT_PASSWORD`: Password reset request

**Interactions**:
- Connects to database
- Updates user model with token fields
- Calls Resend API
- Renders React email component

### 5. **Database Module** (`/src/lib/db.ts` + `/src/models/userModel.ts`)

**Responsibility**: Manage MongoDB connection and define data schemas.

**Connection Logic** (`db.ts`):
- Implements singleton pattern
- Uses global caching to prevent multiple connections
- Throws error if `MONGODB_URI` not defined

**User Model** (`userModel.ts`):
- Defines schema with validation rules:
  - firstname (2-30 chars)
  - lastname (2-30 chars)
  - username (3-30 chars, unique)
  - email (unique, valid format)
  - password (6+ chars, select: false)
  - bio (optional, max 160 chars)
  - isVerified (boolean)
  - isAdmin (boolean)
  - verificationToken/Expiry (select: false)
  - forgetToken/Expiry (select: false)
  - createdAt (timestamp)

**Interactions**:
- Used by all API routes
- Queries performed with Mongoose methods
- Validation runs on save operations

### 6. **Client Utilities Module** (`/src/helpers/apiUtils.ts`)

**Responsibility**: Provide client-side API wrapper with automatic token refresh.

**Key Functions**:
- **`apiCall()`**: Wraps fetch with automatic 401 handling
  - Includes credentials (cookies)
  - Retries once on 401 after token refresh
  - Redirects to login if refresh fails
- **`useAuthRefresh()`**: React hook for manual token refresh
  - Returns `refreshToken()` function
  - Handles errors and redirects

**Interactions**:
- Used by all client components making API calls
- Calls `/api/users/token` for refresh
- Manages client-side redirects

## Database

### ORM: Mongoose 9.4

Mongoose is used as the ODM (Object Document Mapper) for MongoDB.

### Connection Strategy

**File**: `src/lib/db.ts`

The connection uses a **singleton pattern** with global caching:

```typescript
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}
```

This prevents multiple connections from being created during Next.js hot reloading in development.

**Configuration**:
- `bufferCommands: false` - Disables Mongoose buffering for immediate errors
- Connection string from `process.env.MONGODB_URI`

### Schema Organization

**File**: `src/models/userModel.ts`

**User Schema Fields**:

| Field | Type | Validation | Notes |
|-------|------|------------|-------|
| firstname | String | Required, 2-30 chars, trim | User's first name |
| lastname | String | Required, 2-30 chars, trim | User's last name |
| bio | String | Optional, max 160 chars, trim | User biography |
| username | String | Required, 3-30 chars, unique, trim | Unique username |
| email | String | Required, unique, lowercase, valid format | User email |
| password | String | Required, 6+ chars, select: false | Hashed password (bcrypt) |
| isVerified | Boolean | Default: false | Email verification status |
| isAdmin | Boolean | Default: false | Admin privilege flag |
| verificationToken | String | select: false | Hashed email verification token |
| verificationTokenExpiry | Date | select: false | Token expiration (10 minutes) |
| forgetToken | String | select: false | Hashed password reset token |
| forgetTokenExpiry | Date | select: false | Token expiration (10 minutes) |
| refreshToken | String | select: false | Current refresh token (not currently used) |
| createdAt | Date | Default: Date.now | Account creation timestamp |

**Security Features**:
- Password field has `select: false` - must be explicitly included in queries
- Token fields have `select: false` - prevents accidental exposure
- Unique indexes on email and username for data integrity

### Model Pattern

The model uses Mongoose's recommended pattern for Next.js:

```typescript
const User: Model<IUser> = models.User
  ? (models.User as Model<IUser>)
  : model<IUser>("User", userSchema);
```

This prevents "Model already compiled" errors during hot reloading.

### Query Patterns

**Finding Users**:
```typescript
// Basic query (password excluded)
const user = await User.findOne({ email });

// With password (for authentication)
const user = await User.findOne({ email }).select("+password");

// With verification tokens
const user = await User.findOne({
  verificationToken: token,
  verificationTokenExpiry: { $gt: new Date() }
});
```

**Creating Users**:
```typescript
const newUser = new User({
  firstname,
  lastname,
  username,
  email,
  password: hashedPassword,
});
await newUser.save();
```

**Updating Users**:
```typescript
user.isVerified = true;
user.verificationToken = undefined;
user.verificationTokenExpiry = undefined;
await user.save();
```

## API Documentation

All API endpoints follow RESTful conventions and return JSON responses with a `success` boolean flag.

### Authentication Endpoints

#### **POST** `/api/users/register`
**Purpose**: Create a new user account

**Request Body**:
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response** (201 Created):
```json
{
  "message": "User registered successfully.",
  "success": true
}
```

**Errors**:
- 400: All fields required
- 409: User already exists
- 500: Failed to send verification email

**Related Files**: `src/app/api/users/register/route.ts`, `src/app/user/register/page.tsx`

---

#### **POST** `/api/users/login`
**Purpose**: Authenticate user and issue access/refresh tokens

**Authentication**: None (public endpoint)

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "rememberMe": false
}
```

**Response** (200 OK):
```json
{
  "message": "User logged in successfully.",
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "isVerified": true,
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Cookies Set**:
- `token` (access token, 1 hour expiry)
- `refreshToken` (7 days or 30 days based on rememberMe)

**Errors**:
- 400: Email and password required
- 404: User not found
- 401: Invalid password
- 403: User not verified

**Related Files**: `src/app/api/users/login/route.ts`, `src/app/user/login/page.tsx`

---

#### **POST** `/api/users/logout`
**Purpose**: Clear authentication cookies and end session

**Authentication**: None (clears cookies regardless)

**Request Body**: None

**Response** (200 OK):
```json
{
  "message": "User logged out successfully.",
  "success": true
}
```

**Cookies Cleared**: `token`, `refreshToken`

**Related Files**: `src/app/api/users/logout/route.ts`, `src/components/dashboardSideBar.tsx`

---

#### **POST** `/api/users/token`
**Purpose**: Refresh access token using refresh token

**Authentication**: Refresh token (from cookie)

**Request Body**: None (uses cookie)

**Response** (200 OK):
```json
{
  "message": "Access token refreshed successfully.",
  "success": true
}
```

**Cookies Set**: `token` (new access token, 1 hour)

**Errors**:
- 401: Refresh token not found or invalid
- 404: User not found
- 403: User not verified

**Related Files**: `src/app/api/users/token/route.ts`, `src/helpers/apiUtils.ts`, `src/helpers/refreshToken.ts`

---

### User Data Endpoints

#### **GET** `/api/users/profile`
**Purpose**: Get authenticated user profile data

**Authentication**: Required (access token)

**Request Body**: None

**Response** (200 OK):
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstname": "John",
    "lastname": "Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "Software developer",
    "isVerified": true,
    "createdAt": "2025-01-15T10:30:00.000Z"
  },
  "success": true
}
```

**Errors**:
- 401: Unauthorized (no token or invalid token)
- 404: User not found

**Related Files**: `src/app/api/users/profile/route.ts`, `src/components/dashboardSideBar.tsx`

---

#### **POST** `/api/users/change-password`
**Purpose**: Update user password (requires current password)

**Authentication**: Required (access token)

**Request Body**:
```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass456"
}
```

**Response** (200 OK):
```json
{
  "message": "Password changed successfully.",
  "success": true
}
```

**Errors**:
- 401: Unauthorized
- 400: Current password and new password required
- 400: Current password incorrect
- 400: New password must be different
- 404: User not found

**Related Files**: `src/app/api/users/change-password/route.ts`, `src/app/user/dashboard/settings/security/page.tsx`

---

### Email Verification Endpoints

#### **POST** `/api/users/user-verify/sent`
**Purpose**: Send email verification link to user

**Authentication**: None (public endpoint)

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Response** (200 OK):
```json
{
  "message": "Verification email sent successfully.",
  "success": true
}
```

**Errors**:
- 400: Email required or invalid format
- 404: Email not found

**Related Files**: `src/app/api/users/user-verify/sent/route.ts`, `src/app/user/verify/page.tsx`

---

#### **POST** `/api/users/user-verify`
**Purpose**: Verify email using token from link

**Authentication**: None (uses token from email)

**Request Body**:
```json
{
  "token": "hashed_token_from_email"
}
```

**Response** (200 OK):
```json
{
  "message": "User verified successfully.",
  "success": true
}
```

**Errors**:
- 400: Token required, invalid, or expired
- 400: User already verified

**Related Files**: `src/app/api/users/user-verify/route.ts`, `src/app/user/verify-token/page.tsx`

---

### Password Reset Endpoints

#### **POST** `/api/users/forgot-password/sent`
**Purpose**: Send password reset link to email

**Authentication**: None (public endpoint)

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Response** (200 OK):
```json
{
  "message": "Reset password email sent successfully.",
  "success": true
}
```

**Errors**:
- 400: Email required or invalid format
- 404: Email not found

**Related Files**: `src/app/api/users/forgot-password/sent/route.ts`, `src/app/user/reset-password/page.tsx`

---

#### **POST** `/api/users/forgot-password/verify`
**Purpose**: Reset password using token from email

**Authentication**: None (uses token from email)

**Request Body**:
```json
{
  "token": "hashed_token_from_email",
  "password": "NewSecurePass789"
}
```

**Response** (200 OK):
```json
{
  "message": "Password reset successfully.",
  "success": true
}
```

**Errors**:
- 400: Token required, invalid, or expired

**Related Files**: `src/app/api/users/forgot-password/verify/route.ts`, `src/app/user/reset-password/verify/page.tsx`

---

## Authentication & Authorization

### Authentication Method: JWT (JSON Web Tokens)

This application uses **dual-token authentication** with automatic refresh capabilities.

### Token Structure

#### **Access Token** (Short-Lived)
- **Lifetime**: 1 hour
- **Storage**: httpOnly cookie named `token`
- **Contents**:
  ```typescript
  {
    userId: string,
    username: string,
    email: string,
    isVerified: boolean,
    iat: number,  // issued at
    exp: number   // expiration
  }
  ```
- **Purpose**: Used for authenticating API requests and accessing protected pages
- **Library**: Jose (HS256 algorithm)
- **Secret**: `process.env.TOKEN_SECRET`

#### **Refresh Token** (Long-Lived)
- **Lifetime**: 7 days (default) or 30 days (with "Remember Me")
- **Storage**: httpOnly cookie named `refreshToken`
- **Contents**:
  ```typescript
  {
    userId: string,
    iat: number,
    exp: number
  }
  ```
- **Purpose**: Used only to generate new access tokens
- **Library**: Jose (HS256 algorithm)
- **Secret**: `process.env.REFRESH_TOKEN_SECRET` (different from access token secret)

### Cookie Configuration

All authentication cookies use secure settings:

```typescript
{
  httpOnly: true,      // Prevents JavaScript access (XSS protection)
  secure: true,        // HTTPS only
  sameSite: "none",    // Allows cross-origin requests
  maxAge: 3600         // 1 hour (in seconds)
}
```

### Login Flow

1. User submits credentials to `POST /api/users/login`
2. Backend validates email and password
3. Backend checks `isVerified === true`
4. If authenticated:
   - Access token generated with full user data
   - Refresh token generated with just userId
   - Both tokens set as secure httpOnly cookies
5. User data returned (excluding password)
6. Client redirects to dashboard

### Token Refresh Flow (Three Levels)

#### **1. Middleware Level (Automatic)**

**File**: `src/proxy.ts`

**Trigger**: Every request to protected routes

**Process**:
1. Middleware intercepts request
2. Checks if access token exists and is valid
3. If access token expired but refresh token valid:
   - Calls `refreshAccessToken()` helper
   - Verifies refresh token with `jwtVerify()`
   - Generates new access token (simplified, with userId only)
   - Sets new access token cookie
   - Request continues
4. If both tokens invalid, redirects to login

**Advantages**: Seamless, user never sees token expiration

#### **2. API Level (Client-Triggered)**

**File**: `src/app/api/users/token/route.ts`

**Trigger**: Client receives 401 response

**Process**:
1. Client helper (`apiCall()`) catches 401
2. Calls `POST /api/users/token`
3. Backend verifies refresh token
4. Fetches full user data from database
5. Generates new access token with complete user data
6. Sets new access token cookie
7. Client retries original request

**Advantages**: Full user data in token, handles expired tokens in API calls

#### **3. Client-Side Level (Manual)**

**File**: `src/helpers/apiUtils.ts`

**Trigger**: Component explicitly calls hook

**Process**:
1. Component uses `useAuthRefresh()` hook
2. Hook provides `refreshToken()` function
3. Function calls `POST /api/users/token`
4. New token issued or redirect to login

**Advantages**: Allows proactive refresh before token expires

### Protected Routes

**Middleware Configuration**: `src/proxy.ts`

**Public Paths** (no authentication required):
- `/` - Landing page
- `/user/login` - Login page
- `/user/register` - Registration page
- `/user/verify-token` - Email verification handler
- `/user/reset-password` - Password reset request
- `/user/reset-password/verify` - Password reset handler
- `/user/verify` - Email verification request

**Protected Paths** (authentication required):
- `/user/dashboard` - Main dashboard
- `/user/dashboard/settings` - User settings
- `/user/dashboard/settings/security` - Security settings
- All other routes not explicitly public

**Middleware Matcher**:
```typescript
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"]
};
```

Excludes: Next.js internals, API routes (handled within each route), static files, favicon

### Authentication Flow in Middleware

```
Request to /user/dashboard
    ↓
Middleware Intercepts
    ↓
Check for tokens
    ↓
├─ No tokens → Redirect to /user/login
├─ Access token valid → Continue
├─ Access token expired, refresh token valid
│   ├─ Refresh access token
│   └─ Continue with new token
└─ Both tokens invalid → Redirect to /user/login
```

### Session Handling

**Session Duration**:
- Without "Remember Me": User stays logged in for 7 days (refresh token lifetime)
- With "Remember Me": User stays logged in for 30 days (refresh token lifetime)
- Access token refreshed automatically every hour while refresh token is valid

**Session Termination**:
- Manual logout clears both tokens
- Refresh token expiration logs user out
- Invalid/tampered tokens trigger logout

### Authorization

**Current Implementation**: Basic role-based flag

**Roles**:
- `isVerified`: User has verified their email (required for login)
- `isAdmin`: User has admin privileges (field exists but not actively used)

**Future Enhancement**: The `isAdmin` field in the User model can be used to implement role-based access control for admin-only features.

## Configuration

### Environment Variables

**File**: `.env.local` (create from `.env.example`)

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `TOKEN_SECRET` | Secret for signing access tokens | `your_random_secret_string_here` |
| `REFRESH_TOKEN_SECRET` | Secret for signing refresh tokens (must be different) | `another_random_secret_string` |
| `RESEND_API_KEY` | API key for Resend email service | `re_xxxxxxxxxxxxxxxxxxxxx` |
| `FROM_EMAIL_DOMAIN` | Domain for sending emails | `noreply@yourdomain.com` |
| `DOMAIN` | Application URL | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |

#### Notes

- **TOKEN_SECRET and REFRESH_TOKEN_SECRET must be different** for security
- Generate secrets using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `FROM_EMAIL_DOMAIN` must be verified in your Resend dashboard
- `DOMAIN` used in email links for verification and password reset

### Runtime Configuration

**Next.js Config**: `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],  // Allowed image domains
  },
};
```

### TypeScript Configuration

**File**: `tsconfig.json`

Key settings:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,              // Enable all strict type checking
    "moduleResolution": "bundler",
    "jsx": "react-jsx",          // React 19 JSX transform
    "paths": {
      "@/*": ["./src/*"]         // Path alias for imports
    }
  }
}
```

### Build Configuration

**Turbopack**: Enabled by default in development via `--turbopack` flag

**PostCSS**: `postcss.config.mjs`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### Tailwind CSS

**File**: `src/app/globals.css`

```css
@import "tailwindcss";
```

Tailwind CSS 4.2 uses native CSS imports. No separate `tailwind.config.js` file needed with the new version.

## Installation

### Prerequisites

- **Node.js**: Version 18 or higher
- **Package Manager**: pnpm (recommended), npm, or yarn
- **MongoDB**: Cloud Atlas account or local MongoDB instance
- **Resend Account**: For email functionality (free tier available)

### Step 1: Clone Repository

```bash
git clone https://github.com/talhabilal-dev/next-auth-kit.git
cd next-auth-kit
```

### Step 2: Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### Step 3: Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and fill in your values:
```bash
# Database
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_database

# JWT Secrets (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
TOKEN_SECRET=your_generated_token_secret
REFRESH_TOKEN_SECRET=your_generated_refresh_token_secret

# Email Service
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL_DOMAIN=yourdomain.com

# App Configuration
DOMAIN=http://localhost:3000
NODE_ENV=development
```

### Step 4: Database Setup

**Option A: MongoDB Atlas (Cloud)**

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or allow all: 0.0.0.0/0)
5. Get connection string and add to `.env.local`

**Option B: Local MongoDB**

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/next-auth-kit`

### Step 5: Email Service Setup

1. Create account at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Verify your domain (or use Resend's test domain)
3. Generate API key
4. Add API key to `.env.local`

### Step 6: Run Development Server

Using pnpm:
```bash
pnpm dev
```

Or using npm:
```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Step 7: Verify Installation

1. Open browser to `http://localhost:3000`
2. Click "Sign Up" and create an account
3. Check your email for verification link
4. Verify email and log in
5. Access dashboard

### Production Build

Build for production:
```bash
pnpm build
```

Start production server:
```bash
pnpm start
```

## Available Scripts

All scripts are defined in `package.json` and run with `pnpm` (or `npm`):

### **`pnpm dev`**
**Command**: `next dev --turbopack`

Starts the development server with Turbopack for faster builds.
- Server runs on `http://localhost:3000`
- Hot module replacement enabled
- TypeScript errors shown in terminal and browser
- File changes trigger automatic recompilation

### **`pnpm build`**
**Command**: `next build`

Creates an optimized production build.
- Compiles TypeScript to JavaScript
- Optimizes React components
- Generates static pages where possible
- Creates `.next` directory with build output
- Shows build size analysis

### **`pnpm start`**
**Command**: `next start`

Starts the production server using the build from `pnpm build`.
- Requires running `pnpm build` first
- Server runs on `http://localhost:3000` by default
- Serves optimized production code

### **`pnpm lint`**
**Command**: `next lint`

Runs ESLint with Next.js configuration.
- Checks for code quality issues
- Enforces Next.js best practices
- Reports errors and warnings
- Can be run before commits

## Dependencies

### Core Framework
- **next** (16.2.2) - React framework with App Router, server components, and Turbopack
- **react** (19.2.4) - UI library with latest features including Server Components
- **react-dom** (19.2.4) - React rendering for web

### Authentication & Security
- **jose** (6.2.2) - JWT creation and verification (ES modules, TypeScript-first, recommended over jsonwebtoken)
- **bcryptjs** (3.0.3) - Password hashing (10 rounds) with salt generation

### Database
- **mongoose** (9.4.1) - MongoDB ODM with schema validation, type safety, and middleware hooks

### Email
- **resend** (6.10.0) - Modern email API for transactional emails with React templates

### UI & Styling
- **tailwindcss** (4.2.2) - Utility-first CSS framework with JIT compiler
- **@tailwindcss/postcss** (4.2.2) - PostCSS plugin for Tailwind CSS 4
- **tailwind-merge** (3.5.0) - Utility for merging Tailwind classes without conflicts
- **lucide-react** (1.7.0) - Icon library with 1000+ icons (Shield, Lock, User, etc.)
- **sonner** (2.0.7) - Toast notification library with beautiful animations
- **next-themes** (0.4.6) - Theme management (currently unused, but available)

### Fonts
- **Geist Sans & Geist Mono** (via next/font/google) - Modern font family from Vercel

### Analytics
- **@vercel/analytics** (2.0.1) - Vercel Analytics for tracking page views and user metrics

### Development
- **typescript** (6.0.2) - TypeScript compiler for type checking
- **@types/node** (25.5.2) - Type definitions for Node.js APIs
- **@types/react** (19.2.14) - Type definitions for React
- **@types/react-dom** (19.2.3) - Type definitions for React DOM
- **@types/jsonwebtoken** (9.0.10) - Type definitions for JWT (used with jose)
- **prettier** (3.8.1) - Code formatter for consistent styling

### Why These Dependencies?

- **Jose over jsonwebtoken**: Modern, ES modules, smaller bundle, better TypeScript support
- **bcryptjs over bcrypt**: Pure JavaScript, no native dependencies, easier deployment
- **Mongoose**: Provides schema validation, type safety, and familiar MongoDB interface
- **Resend over nodemailer**: Modern API, React email templates, reliable delivery
- **Sonner**: Lightweight, beautiful, and better UX than react-hot-toast
- **Lucide React**: Tree-shakable, modern icons, consistent design
- **Tailwind CSS 4**: Latest version with native CSS support, no separate config file

## Development Notes

### Path Aliases

TypeScript is configured with path aliases for cleaner imports:

```typescript
// Instead of: import { User } from '../../models/userModel'
import { User } from '@/models/userModel'

// Instead of: import { connectDB } from '../../../lib/db'
import { connectDB } from '@/lib/db'
```

**Configuration**: `tsconfig.json` - `"@/*": ["./src/*"]`

### Shared Utilities

#### **Token Management** (`src/helpers/refreshToken.ts`)
- `refreshAccessToken()` - Refresh expired access token
- `isTokenExpired()` - Check if access token is expired
- `isRefreshTokenValid()` - Verify refresh token validity

#### **Token Decoding** (`src/helpers/decodeToken.ts`)
- `decodeToken()` - Extract payload from JWT in request cookies

#### **Client API Wrapper** (`src/helpers/apiUtils.ts`)
- `apiCall()` - Fetch wrapper with automatic token refresh
- `useAuthRefresh()` - React hook for manual token refresh

#### **Email Service** (`src/helpers/mailer.ts`)
- `sendEmail()` - Send verification or reset emails with tokens

### Custom Hooks

#### **`useAuthRefresh()`** (`src/helpers/apiUtils.ts`)
```typescript
const { refreshToken } = useAuthRefresh();
const success = await refreshToken();
```

Returns object with `refreshToken()` function that:
- Calls token refresh endpoint
- Returns true on success
- Redirects to login on failure

### Code Conventions

**Component Structure**:
- Client components marked with `"use client"` directive
- Server components (default) for static content
- TypeScript interfaces imported from `@/types`

**API Route Pattern**:
```typescript
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    // ... logic
    return NextResponse.json({ message, success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 500 });
  }
}
```

**Form Handling**:
- Controlled components with `useState`
- Client-side validation before submission
- Toast notifications for user feedback
- Loading states during async operations

**Error Handling**:
- API errors returned with `success: false` flag
- Client displays errors via toast notifications
- Form errors shown inline below inputs

### Reusable Patterns

**Protected API Route**:
```typescript
const payload = await decodeToken(req);
if (!payload) {
  return NextResponse.json(
    { error: "Unauthorized", success: false },
    { status: 401 }
  );
}
const userId = payload.userId;
```

**Database Query with Password**:
```typescript
const user = await User.findOne({ email }).select("+password");
```

**Token Generation**:
```typescript
const token = await new SignJWT({ userId, email })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("1h")
  .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));
```

## Deployment

### Vercel (Recommended)

Next Auth Kit is optimized for deployment on Vercel.

**Steps**:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   In Vercel dashboard, add all variables from `.env.local`:
   - `MONGODB_URI`
   - `TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`
   - `RESEND_API_KEY`
   - `FROM_EMAIL_DOMAIN`
   - `DOMAIN` (set to your Vercel domain, e.g., `https://your-app.vercel.app`)
   - `NODE_ENV` (set to `production`)

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically detects Next.js and configures build settings
   - Build command: `next build`
   - Output directory: `.next`

5. **Post-Deployment**
   - Update `DOMAIN` in environment variables to match your deployed URL
   - Update Resend email domain if using custom domain
   - Redeploy if environment variables changed

**Automatic Deployments**: Every push to main branch triggers a new deployment.

### Other Platforms

The application can be deployed to any platform supporting Next.js:

**Netlify**:
- Build command: `next build`
- Publish directory: `.next`
- Add environment variables in Netlify dashboard

**Railway**:
- Detects Next.js automatically
- Add environment variables in Railway dashboard
- Uses port from `PORT` environment variable

**DigitalOcean App Platform**:
- Build command: `pnpm install && pnpm build`
- Run command: `pnpm start`
- Add environment variables in App Platform dashboard

**Docker** (Self-Hosted):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Requirements

**Production Checklist**:
- ✅ `NODE_ENV=production`
- ✅ All environment variables configured
- ✅ MongoDB connection string with proper authentication
- ✅ Resend API key and verified domain
- ✅ `DOMAIN` set to production URL (used in email links)
- ✅ Secure secrets for `TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`

## Limitations

Based on the current codebase implementation, the following limitations exist:

### 1. **Email Token Expiry**
- Verification and password reset tokens expire after **10 minutes**
- No option to customize token lifetime
- Users must complete actions within this window or request a new link

### 2. **No OAuth Providers**
- Only email/password authentication is implemented
- No support for Google, GitHub, or other OAuth providers
- Social login would require additional integration

### 3. **Single Role System**
- `isAdmin` field exists but is not actively used
- No role-based access control (RBAC) implementation
- No permission system for different user types

### 4. **Limited Dashboard Functionality**
- Dashboard is mostly a UI shell
- No actual dashboard widgets or data visualizations
- Settings only include password change

### 5. **No Rate Limiting**
- No protection against brute force login attempts
- No rate limiting on API endpoints
- No CAPTCHA on registration or login forms

### 6. **No Account Deletion**
- Users cannot delete their own accounts
- No data export functionality
- No GDPR-compliant user data management

### 7. **Token Rotation**
- Refresh tokens are not rotated on use
- Same refresh token used for entire lifetime
- Potential security improvement: implement refresh token rotation

### 8. **No Profile Editing**
- Users cannot update firstname, lastname, username, or bio
- Only password can be changed
- No avatar upload functionality

### 9. **Email Template Simplicity**
- Basic HTML email templates
- No rich email design
- No email customization options

### 10. **No Multi-Factor Authentication (MFA)**
- No 2FA or MFA support
- Single factor authentication only

### 11. **Cookie SameSite Configuration**
- Current setting: `sameSite: "none"` for cross-origin support
- May need adjustment based on deployment architecture
- Production should review cookie security settings

### 12. **No Session Management UI**
- Users cannot see active sessions
- No ability to revoke specific sessions
- No "logout all devices" functionality

---

## Conclusion

**Next Auth Kit** is a production-ready authentication system that demonstrates modern best practices for building secure Next.js applications. It successfully implements:

- **Robust Security**: JWT-based dual-token authentication, automatic token refresh, password hashing, and httpOnly cookies
- **Complete Auth Flows**: Registration, login, logout, email verification, and password reset
- **Developer Experience**: TypeScript for type safety, clean architecture with separated concerns, reusable utilities, and path aliases
- **User Experience**: Responsive design, toast notifications, loading states, and smooth animations with a beautiful dark purple gradient theme
- **Scalability**: Middleware-based authentication, MongoDB with Mongoose, and optimized for Vercel deployment

This project provides a solid foundation for any Next.js application requiring user authentication. The codebase is well-structured, documented, and ready to be extended with additional features such as OAuth providers, role-based access control, or profile management.

**Built with**: Next.js 15, React 19, TypeScript 6, MongoDB, Tailwind CSS 4, and Jose JWT library.

**Repository**: [github.com/talhabilal-dev/next-auth-kit](https://github.com/talhabilal-dev/next-auth-kit)

**Author**: [Talha Bilal](https://x.com/talhabilaldev) • Software Engineer specializing in full-stack development

---

*For developer documentation and implementation details, see [CLAUDE.md](./CLAUDE.md).*
