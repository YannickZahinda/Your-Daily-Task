# Your Daily Tasks

A modern, responsive Task Manager (TODO app) built with **React**, **TypeScript**, and **Tailwind CSS**, following a provided design and best practices in frontend architecture, testing, and tooling.

This project was built as part of a technical assessment to demonstrate:

- UI/UX implementation skills
- React + TypeScript mastery
- State management and data fetching
- Testing strategy
- Code structure and maintainability

---

## ✨ Features

- 📋 **Full CRUD operations for tasks** (Create, Read, Update, Delete) — fully functional via the DummyJSON API  
- 🌗 **Dark / Light theme** with smooth transitions  
- 🌍 **Internationalization (i18n)** support
  - English 🇬🇧
  - French 🇫🇷
- ✅ **Task progress tracking** (mark tasks as done)
- 📱 **Fully responsive UI**, faithful to the provided design
- ⚡ Optimistic updates and proper loading states
- 🧪 **Unit & component tests** using Jest + React Testing Library
- 🔁 **API integration** using [DummyJSON Todos API](https://dummyjson.com/docs/todos)
- 🚀 **CI pipeline** running tests on Pull Requests

**Coming soon in the sidebar:** Dashboard, Search, Inbox, Calendar, and additional features.

---

## 🧱 Tech Stack

- React 18 + TypeScript  
- Vite for fast builds and DX  
- Tailwind CSS for styling  
- TanStack Query (React Query) for server-state management  
- Zustand for client-side state management  
- React Router for routing  
- TanStack Table for task listing  
- Jest & React Testing Library for testing  
- GitHub Actions for CI  
- Shadcn-inspired UI patterns for accessibility and reusability  

---

## 🔌 API

All CRUD operations are handled using the **DummyJSON Todos API**:

**Endpoints used:**

- Fetch todos: `GET /todos?limit=30`  
- Create todo: `POST /todos/add`  
- Update todo: `PUT /todos/{id}`  
- Delete todo: `DELETE /todos/{id}`

---

## 🧪 Testing

Includes:

- Unit tests for API logic  
- Component tests for key UI elements  
- Tests focused on behavior, not implementation details  

**Run tests locally:**
```bash
npm run test 
```


🔁 Continuous Integration

A GitHub Actions workflow is configured to:

Run all tests on every Pull Request

Prevent merging if tests fail

🚀 Deployment

[ Live Demo](https://your-daily-task.netlify.app/)

Build command:

npm run build

# Installation

git clone https://github.com/YannickZahinda/Your-Daily-Task

cd your-daily-tasks

npm install

Run the app locally

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