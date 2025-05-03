import chalk from "chalk";
import fs from "fs";
import { FILE, loadTodos, saveTodos } from "./todo-file-handler.js";
import path from "path";

// init application
export function initApplication() {

  const dir = path.dirname(FILE);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create file with an empty array if it doesn't exist
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([], null, 2));
    console.log("Todo file created at:", FILE);
  }

  const allTodos = loadTodos();
  const newTodos = allTodos.map((todo) => {
    const obj = todo;
    if (!obj.id) {
      obj.id = uuid();
    }
    if (!obj.dueDate) {
      obj.dueDate = null;
    }
    return obj;
  });

  saveTodos(newTodos);
}
