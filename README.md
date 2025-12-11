# LeadQ.AI - AI Lead Intelligence Suite Dashboard

A modern, responsive dashboard application built with React, TypeScript, Tailwind CSS, and Redux.

## Features

- **Home Page**: Landing page showcasing the LeadQ.AI product features
- **Dashboard**: Comprehensive dashboard with team performance metrics and analytics
- **Card Scanner**: Business card scanning and extraction interface
- **Navigation**: Responsive navbar with active route highlighting
- **State Management**: Redux Toolkit for centralized state management

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

## Project Structure

```
Dashboard_frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── DashboardContent.tsx
│   │   │   ├── TeamPerformanceOverview.tsx
│   │   │   └── TeamMemberCards.tsx
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   └── CardScanner.tsx
│   ├── store/
│   │   ├── slices/
│   │   │   └── dashboardSlice.ts
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

## Preview Production Build

Preview the production build:
```bash
npm run preview
```

## Dashboard Features

The Dashboard includes:

- **KPIs Section**:
  - Overview
  - Contacts Touched (142)
  - Meetings Completed (28)
  - Emails Drafted (35)
  - Conversion Rate

- **Follow-ups Section**:
  - Overdue (12)
  - Due Today (5)
  - Due This Week (18)
  - All Follow-ups

- **Upcoming Meetings Section**:
  - Today (3)

- **Team Performance**:
  - Team overview metrics
  - Individual team member performance cards

## Color Scheme

The application uses a dark theme with purple and blue accents:
- Primary colors: Purple shades (#9333ea, #7e22ce, etc.)
- Dark backgrounds: Dark blue/grey shades
- Accent colors: Blue, green, and purple for metrics

## License

This project is private and proprietary.

