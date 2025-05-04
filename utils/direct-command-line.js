import { loadTodos, saveTodos } from "./todo-file-handler.js";
import { v4 as uuid } from "uuid";
import chalk from "chalk";
import { helpSection } from "./directCommands/help.js";

export function commandLineDirectCommands() {
  const args = process.argv.slice(2);

  // Support direct command-line "add" like: todo add "task text" p-High d-2025-05-03
  if (args[0] === "add") {
    const task = args.find(
      (arg) => !arg.startsWith("p-") && !arg.startsWith("d-") && arg !== "add"
    );
    const priorityArg = args.find((arg) => arg.startsWith("p-"));
    const dueDateArg = args.find((arg) => arg.startsWith("d-"));

    if (!task) {
      console.error(chalk.red("Error: Task description is required."));
      process.exit(1);
    }

    const priority = priorityArg ? priorityArg.replace("p-", "") : "Medium";
    const dueDate = dueDateArg ? dueDateArg.replace("d-", "") : null;

    const todos = loadTodos();

    todos.push({
      id: uuid(),
      task,
      done: false,
      priority,
      dueDate,
    });

    saveTodos(todos);
    console.log(
      chalk.green(
        `Added: "${task}" with priority ${priority}${
          dueDate ? ` and due ${dueDate}` : ""
        }`
      )
    );
    process.exit(0); // Prevent going into the interactive main menu
  }

  // Help command: todo help
  if (args[0] === "help" || args[0] === "--help" || args[0] === "-h") {
    helpSection();
    process.exit(0);
  }
}
