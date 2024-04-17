 <div align=start>
        <img src="https://res.cloudinary.com/abdelmonaime/image/upload/v1713343179/tiktok_clone/favicon_oq7jud.png" alt="Journey waypoints" height="80">
 </div>

# Videoly

Videoly is a full-featured clone of TikTok, designed to demonstrate the capabilities of modern web technologies including Next.js, TypeScript, Redux Toolkit, and MongoDB. This application allows users to upload, share, and view short video clips, similar to the popular TikTok platform.

## Features

- Video upload and streaming
- User authentication and profile management
- Real-time interactions (likes, comments)
- Follow/unfollow functionality
- Search functionality for users and videos
- Responsive design suitable for all devices

## Technologies

- **Next.js**: Server-side rendering and static site generation
- **TypeScript**: Type safety across the application
- **Redux Toolkit**: State management
- **MongoDB**: Database for storing user data and video metadata

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (Local installation or MongoDB Atlas)
- Yarn or npm

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/chourafiDev/videoly.git
    cd videoly
    ```

2. **Install dependencies**

    ```bash
    yarn install
    ```

    or

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env.local` file in the root directory and add the following variables:

    ```plaintext
    MONGODB_URI=<Your-MongoDB-URI>
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
    ```

4. **Run the development server**

    ```bash
    yarn dev
    ```

    or

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Development

- **Code Linting**: Run `yarn lint` or `npm run lint` to enforce a consistent code style.
- **Type Checking**: TypeScript is used for type checking. Run `yarn type-check` or `npm run type-check` to detect type errors.

### Production

Build the application for production usage:

```bash
yarn build
npm start
