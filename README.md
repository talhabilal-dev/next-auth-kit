# Next Auth Kit

A comprehensive authentication kit for Next.js projects, built with TypeScript and MongoDB. This kit provides a robust foundation for custom authentication flows, including login, registration, email verification, password reset, and a sample dashboard with a sidebar. All authentication APIs and pages are included, along with middleware for route protection.

![Alt text](https://res.cloudinary.com/dvdktrhsz/image/upload/v1749547779/Screenshot_from_2025-06-10_14-12-09_umykjs.png)

## Features

- **Custom Authentication**: Easily extendable authentication logic tailored to your needs.
- **Login & Registration**: Ready-to-use pages and APIs for user login and registration.
- **Email Verification**: Secure email verification flow with token-based validation.
- **Password Reset**: Complete password reset functionality with email notifications.
- **Sample Dashboard**: Includes a sample dashboard page with a responsive sidebar.
- **Middleware Protection**: Middleware to protect routes and ensure authenticated access.
- **MongoDB Integration**: Uses MongoDB for user data storage and session management.
- **TypeScript Support**: Fully typed for safety and developer experience.

## Login Page

![login](https://res.cloudinary.com/dvdktrhsz/image/upload/v1749547776/Screenshot_from_2025-06-10_13-54-32_s7ta2g.png)

## Registration Page

![register](https://res.cloudinary.com/dvdktrhsz/image/upload/v1749547776/Screenshot_from_2025-06-10_14-10-45_jwewpf.png)

## Dashboard Page

![dashboard](https://res.cloudinary.com/dvdktrhsz/image/upload/v1749547776/Screenshot_from_2025-06-10_14-10-02_kqjwyy.png)

## Reset Password Page

![reset](https://res.cloudinary.com/dvdktrhsz/image/upload/v1749547776/Screenshot_from_2025-06-10_14-11-28_isw7sr.png)

![reset](https://res.cloudinary.com/dvdktrhsz/image/upload/v1749547776/Screenshot_from_2025-06-10_14-11-45_yzvx8w.png)

## Email Verification Page

![verify](https://res.cloudinary.com/dvdktrhsz/image/upload/v1749547778/Screenshot_from_2025-06-10_14-11-57_rwcy5w.png)

## Getting Started

### Prerequisites

- Node.js >= 16.x
- MongoDB instance (local or cloud)
- [Next.js](https://nextjs.org/) >= 13.x

### Installation

```bash
git clone https://github.com/talhabilal-dev/next-auth-kit.git
cd next-auth-kit
npm install
```

### Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
TOKEN_SECRET=your_jwt_secret
DOMAIN=http://localhost:3000
FROM_EMAIL_DOMAIN=your@email.com
NODE_ENV=development
```

### Running the App

```bash
npm run dev
```

## Customization

- Update the UI components to match your branding.
- Extend the user model in `/models/userModel.ts` as needed.
- Modify middleware logic for custom access control.

## License

MIT

---

**Contributions welcome!** Please open issues or pull requests for improvements.
