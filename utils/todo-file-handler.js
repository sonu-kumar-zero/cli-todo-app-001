import fs from "fs";
import os from "os";
import path from "path";

export const FILE = path.join(os.homedir(), "custom-todo-cli", "todos-data.json");

// Load todos
export function loadTodos() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

// Save todos
export function saveTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}
