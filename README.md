# Baby Assistant

A React-based web application for baby/parenting assistance with features for child management, milestone tracking, and AI-powered chat support.

## Features

- **Child Management**: Add and manage multiple children
- **Milestone Tracking**: Track developmental milestones by age
- **AI Chat**: Get parenting advice and development insights
- **Mobile-First Design**: Optimized for mobile devices
- **Modern UI**: Beautiful glass-morphism design with Tailwind CSS

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Date-fns** - Date manipulation utilities

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── chat/           # Chat-related components
│   ├── home/           # Home page components
│   ├── milestones/     # Milestone tracking components
│   └── ui/             # Basic UI components (Button, Card, etc.)
├── entities/           # Data models and mock data
│   ├── Child.js        # Child entity with CRUD operations
│   ├── User.js         # User entity
│   └── ...             # Other entity files
├── pages/              # Main page components
│   ├── home.jsx        # Home page
│   ├── chat.jsx        # Chat page
│   └── milestones.jsx  # Milestones page
├── App.jsx             # Main app component with routing
├── main.jsx            # React entry point
├── layout.js           # Layout component with navigation
├── utils.js            # Utility functions
└── index.css           # Global styles and Tailwind imports
```

## Development Notes

- This is a **frontend-only** application with mock data
- All data operations are simulated using in-memory storage
- The app is designed to be easily connected to a backend API
- Chat functionality is currently a placeholder (AI integration would be needed)

## Customization

- **Styling**: Modify `tailwind.config.js` for theme customization
- **Data**: Update mock data in `src/entities/` files
- **Routing**: Add new routes in `src/App.jsx`
- **Components**: Create new components in `src/components/`

## Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## License

This project is for educational and development purposes. 