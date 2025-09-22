# Tawasol Client

A React frontend for the Tawasol social media application built with Vite and Redux Toolkit.

## Features

- 🔐 User authentication (register/login)
- 👤 User profiles with image upload
- 📝 Create, view, and delete posts
- 💬 Comment on posts
- ❤️ Like/unlike posts
- 👥 Browse developers
- 📱 Responsive design

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/tawasol-client.git
   cd tawasol-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment variables (if needed):

   ```bash
   # Create .env file for custom backend URL
   VITE_SERVER_URL=http://localhost:5000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## Project Structure

```
src/
├── components/          # React components
│   ├── Posts/          # Post-related components
│   ├── ProfileForms/   # Profile form components
│   ├── ProfileInfo/    # Profile display components
│   └── Users/          # Authentication components
├── redux/              # Redux store and slices
│   └── modules/        # Feature-specific reducers
├── utils/              # Utility functions
└── assets/             # Static assets
```

## API Integration

This client connects to the Tawasol server API. Make sure the backend is running on `http://localhost:5000` or update the server URL in `src/utils/index.js`.

## Deployment

### GitHub Pages

1. Update the `base` path in `vite.config.js` to match your repository name
2. Run deployment:
   ```bash
   npm run deploy
   ```
