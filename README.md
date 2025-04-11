# Cardly Connect Hub

A modern business card management application built with React, TypeScript, and Tailwind CSS.

## Features

- **Digital Business Card Management**: Store and organize your business cards digitally
- **Card Scanning**: Scan physical business cards to extract information
- **Contact Management**: Organize and manage your contacts efficiently
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Modern UI**: Built with Shadcn UI components for a polished look and feel

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: React Query
- **Routing**: React Router
- **Form Handling**: React Hook Form, Zod
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cardly-connect-hub.git
   cd cardly-connect-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # Base UI components
│   ├── layout/       # Layout components
│   ├── cards/        # Card-related components
│   ├── contacts/     # Contact-related components
│   └── auth/         # Authentication components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and libraries
├── pages/            # Page components
└── App.tsx           # Main application component
```

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run build:dev` - Build the application for development
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## Testing

To run tests:

```bash
npm test
# or
yarn test
```

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for the accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
