# Your Daily Tasks

A modern, responsive Task Manager (TODO app) built with React, TypeScript, and Tailwind CSS, following a provided design and best practices in frontend architecture, testing, and tooling.

This project was built as part of a technical assessment to demonstrate:

UI/UX implementation skills

React + TypeScript mastery

State management and data fetching

Testing strategy

Code structure and maintainability

✨ Features

📋 Full CRUD operations for tasks (Create, Read, Update, Delete)

🌗 Dark / Light theme with smooth transitions

🌍 Internationalization (i18n) support

English 🇬🇧

French 🇫🇷

📱 Fully responsive UI, faithful to the provided design

⚡ Optimistic updates and proper loading states

🧪 Unit & component tests using Jest + React Testing Library

🔁 API integration using a dummy todo API

🚀 CI pipeline running tests on Pull Requests

🧱 Tech Stack

React 18 + TypeScript

Vite for fast builds and DX

Tailwind CSS for styling

TanStack Query (React Query) for server-state management

Zustand for client-side state management

React Router for routing

TanStack Table for task listing

Jest & React Testing Library for testing

GitHub Actions for CI

UI components are built with accessibility and reusability in mind.
Shadcn-inspired patterns are used where relevant.

🔌 API

All CRUD operations are handled using the DummyJSON Todos API:

🔗 https://dummyjson.com/docs/todos

Endpoints used:

Fetch todos

Create todo

Update todo

Delete todo

🧪 Testing

The project includes:

Unit tests for API logic

Component tests for key UI elements

Tests focused on behavior, not implementation details

Run tests locally:

npm run test

🔁 Continuous Integration

A GitHub Actions workflow is configured to:

Run all tests on every Pull Request

Prevent merging if tests fail

🚀 Deployment

The application can be deployed on Netlify (or similar platforms).

Build command
npm run build

Preview production build
npm run preview

🛠️ Local Development
Prerequisites

Node.js ≥ 18

npm

Installation
git clone https://github.com/<your-username>/your-daily-tasks.git
cd your-daily-tasks
npm install

Run the app
npm run dev


The app will be available at:

http://localhost:8080

📁 Project Structure (simplified)
src/
 ├─ api/            # API logic + tests
 ├─ components/     # Reusable UI components
 ├─ layout/         # App layout & navigation
 ├─ pages/          # Route-level components
 ├─ store/          # Zustand stores
 ├─ i18n/           # Translations (EN / FR)
 ├─ tests/          # Shared test utilities
 └─ App.tsx

💡 Bonus Considerations

Clean commit history

Strong separation of concerns

Scalable folder structure

Human-readable commit messages

No generated boilerplate left in the codebase

👤 Author

Yannick Mulikuza
Frontend / Full-Stack Developer
React • TypeScript • UI/UX