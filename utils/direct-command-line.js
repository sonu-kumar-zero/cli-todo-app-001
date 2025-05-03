import { loadTodos, saveTodos } from "./todo-file-handler.js";
import { v4 as uuid } from "uuid";
import chalk from "chalk";

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
    console.log(chalk.cyan.bold("\nCustom Todo CLI - Help"));
    console.log(chalk.gray("Usage:"));
    console.log("  todo <command> [options]\n");

    console.log(chalk.yellow("Available Commands:"));
    console.log(chalk.green("  help") + "         Show this help message.");
    console.log(chalk.green("  add") + "          Add a new todo via prompt.");
    console.log(
      chalk.green("  add") +
        ' "task" p-<Priority> d-<DueDate>' +
        chalk.gray(
          '  # Quick add. e.g. todo add "Buy milk" p-High d-2025-05-04'
        )
    );
    console.log(
      chalk.green("  (no args)") + "     Launch interactive todo menu.\n"
    );

    console.log(chalk.yellow("Interactive Options:"));
    console.log("  - Add Todo");
    console.log("  - List Todos");
    console.log("  - Filter by Status");
    console.log("  - Filter by Priority");
    console.log("  - Mark as Done");
    console.log("  - Delete Todo");
    console.log("  - Change Priority");
    console.log("  - Exit");

    process.exit(0);
  }
}
