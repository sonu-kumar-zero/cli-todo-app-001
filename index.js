#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { v4 as uuid } from "uuid";
import { globalLinkCreation } from "./utils/link-setup.js";
import { initApplication } from "./utils/init-application.js";
import { saveTodos, loadTodos } from "./utils/todo-file-handler.js";
import {
  getDueDateString,
  getProiorityColor,
} from "./utils/some-utils-functions.js";
import { commandLineDirectCommands } from "./utils/direct-command-line.js";

globalLinkCreation();
initApplication();

commandLineDirectCommands();

console.clear();
console.log(
  chalk.bgBlackBright(
    "------------------------------------------------------------------------------------"
  )
);
console.log(
  chalk.bgBlackBright(
    "----------------------------------------Welcome-------------------------------------"
  )
);
console.log(
  chalk.bgBlackBright(
    "------------------------------------------------------------------------------------"
  )
);

// Main menu
async function main() {
  const todos = loadTodos();
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        "Add Todo",
        "List Todos",
        "Filter by Status",
        "Filter by Priority",
        "Mark as Done",
        "Delete Todo",
        "Change Priority",
        "Exit",
      ],
    },
  ]);

  switch (action) {
    case "Add Todo": {
      console.clear();
      const { task } = await inquirer.prompt({
        name: "task",
        message: "Enter todo:",
      });

      const { priority } = await inquirer.prompt({
        name: "priority",
        type: "list",
        message: "Select priority",
        choices: ["High", "Medium", "Low"],
      });

      const today = new Date().toISOString().split("T")[0];

      const { dueDate } = await inquirer.prompt({
        name: "dueDate",
        message: "Enter due date (YYYY-MM-DD), or leave blank:",
        default: today,
      });

      todos.push({
        id: uuid(),
        task,
        done: false,
        priority,
        dueDate: dueDate || null,
      });

      saveTodos(todos);
      console.log(chalk.green("Todo added!"));
      break;
    }

    case "List Todos": {
      console.clear();
      console.log(chalk.bgGreen("All Todos"));
      if (todos.length === 0) {
        console.log(chalk.gray("No todos."));
      }
      todos.forEach((todo) => {
        if (!todo.priority) todo.priority = "Medium";
      });
      const doneTodos = todos.filter((todo) => todo.done === true);
      const unDoneTodos = todos.filter((todo) => todo.done === false);

      console.log(chalk.bgRed("todo remains to complete"));

      unDoneTodos.forEach((todo, i) => {
        const status = todo.done ? chalk.green("[✓]") : chalk.red("[ ]");
        const priorityColor = getProiorityColor(todo);
        console.log(
          `${i + 1}. ${status} ${todo.task} ${chalk.gray(
            "(Priority:"
          )} ${priorityColor}${chalk.gray(")")} ${getDueDateString(todo)}`
        );
      });

      if (doneTodos.length > 0) console.log(chalk.bgGreen("Completed todos"));

      doneTodos.forEach((todo, i) => {
        const status = todo.done ? chalk.green("[✓]") : chalk.red("[ ]");
        const priorityColor = getProiorityColor(todo);
        console.log(
          `${i + 1}. ${status} ${todo.task} ${chalk.gray(
            "(Priority:"
          )} ${priorityColor}${chalk.gray(")")} ${getDueDateString(todo)}`
        );
      });
      break;
    }

    case "Filter by Priority": {
      const { selectedPriority } = await inquirer.prompt({
        type: "list",
        name: "selectedPriority",
        message: "Select priority to filter:",
        choices: ["High", "Medium", "Low"],
      });

      const filtered = todos.filter((t) => t.priority === selectedPriority);

      if (filtered.length === 0) {
        console.log(chalk.gray(`No ${selectedPriority} priority todos.`));
      } else {
        console.log(
          chalk.bgGreen(
            `=> ${filtered.length} todos with ${selectedPriority} priority:`
          )
        );
        filtered.forEach((t, i) => {
          const status = t.done ? chalk.green("[✓]") : chalk.red("[ ]");

          const priorityColor = getProiorityColor(t);

          console.log(
            `=> ${i + 1}. ${status} ${t.task} ${chalk.gray(
              "(Priority:"
            )} ${priorityColor}${chalk.gray(")")}`
          );
        });
      }
      break;
    }

    case "Filter by Status": {
      const { statusChoice } = await inquirer.prompt({
        type: "list",
        name: "statusChoice",
        message: "View which tasks?",
        choices: ["Completed", "Pending"],
      });

      const isDone = statusChoice === "Completed";
      const filteredByStatus = todos.filter((t) => t.done === isDone);

      if (filteredByStatus.length === 0) {
        console.log(chalk.gray(`No ${statusChoice.toLowerCase()} tasks.`));
      } else {
        filteredByStatus.forEach((t, i) => {
          const status = t.done ? chalk.green("[✓]") : chalk.red("[ ]");

          const priorityColor = getProiorityColor(t);

          console.log(
            `=> ${i + 1}. ${status} ${t.task} ${chalk.gray(
              "(Priority:"
            )} ${priorityColor}${chalk.gray(")")}`
          );
        });
      }
      break;
    }

    case "Mark as Done": {
      const undoneTodos = todos.filter((todo) => todo.done === false);
      const { indexDone } = await inquirer.prompt({
        type: "list",
        name: "indexDone",
        message: "Select todo to mark as done:",
        choices: undoneTodos.map((todo) => ({
          name: `${todo.done ? "✓ " : ""}${todo.task}`,
          value: todo.id,
        })),
      });
      todos.map((todo) => {
        if (todo.id === indexDone) todo.done = true;
      });
      saveTodos(todos);
      console.log(chalk.green("Todo marked as done!"));
      break;
    }

    case "Delete Todo": {
      const { indexDel } = await inquirer.prompt({
        type: "list",
        name: "indexDel",
        message: "Select todo to delete:",
        choices: todos.map((todo) => ({
          name: `${todo.task} (${todo.done ? "done" : "not done"})`,
          value: todo.id,
        })),
      });
      const newTodos = todos.filter((todo) => todo.id !== indexDel);
      saveTodos(newTodos);
      console.log(chalk.red("Todo deleted!"));
      break;
    }

    case "Change Priority": {
      const { indexUpdate } = await inquirer.prompt({
        type: "list",
        name: "indexUpdate",
        message: "Select todo to update priority:",
        choices: todos.map((todo) => ({
          name: `${todo.task} current-priority:${todo.priority ?? "Medium"}`,
          value: todo.id,
        })),
      });
      const { newPriority } = await inquirer.prompt({
        name: "newPriority",
        type: "list",
        message: "Select new priority",
        choices: ["High", "Medium", "Low"],
      });

      todos.map((todo) => {
        if (todo.id === indexUpdate) todo.priority = newPriority;
      });
      saveTodos(todos);
      console.log(chalk.green(`Todo priority updated to ${newPriority}`));
      break;
    }

    case "Exit":
      console.log(chalk.blue("Goodbye!"));
      process.exit(0);
  }

  // Call main again
  main();
}

main();
