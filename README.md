# 📝 CLI Todo App

A simple, interactive command-line Todo application built with Node.js. Easily manage tasks with priorities, due dates, and status filters — all from your terminal.

---

## 🚀 Features

- Add tasks with:
  - ✅ Priority (`High`, `Medium`, `Low`)
  - 📅 Due date (defaults to today)
- View todos:
  - 📌 All tasks
  - 🔍 Filter by priority or status
  - ⏰ Show overdue tasks
- ✅ Mark tasks as done
- ❌ Delete tasks
- 💾 Persistent local storage

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cli-todo-app.git
cd cli-todo-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Use as a global CLI
```bash
npm link
```

### 4. Now you can run the app from anywhere using
```bash
todo
```

## Build as Windows .exe (optional)
### Run command
```bash
npm run package
```
- This creates a standalone .exe file you can run without installing Node.js.

## Data Storage
### Todos are saved to:
```bash
C:\Users\<YourUsername>\custom-todo-cli\todos-data.json
```
- This file and folder are created automatically if they don’t exist.

## 🔧 Tech Stack
- Node.js
- Inquirer — for interactive prompts
- Chalk — for colored terminal output

## 📌 Planned Features
- Export todos to CSV
- Tagging support
- Filter by due date range (e.g., today, this week)
- Cloud sync with Firebase/Supabase

## 🧑‍💻 Author
Made with ❤️ by [Sonu Kumar](https://github.com/sonu-kumar-zero)

