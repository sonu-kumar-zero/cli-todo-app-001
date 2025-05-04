import chalk from "chalk";

export function helpSection() {
  console.log(chalk.cyan.bold("\nCustom Todo CLI - Help"));
  console.log(chalk.gray("Usage:"));
  console.log("  todo <command> [options]\n");

  console.log(chalk.yellow("Available Commands:"));
  console.log(chalk.green("  help") + "         Show this help message.");
  console.log(chalk.green("  add") + "          Add a new todo via prompt.");
  console.log(
    chalk.green("  add") +
      ' "task" p-<Priority> d-<DueDate>' +
      chalk.gray('  # Quick add. e.g. todo add "Buy milk" p-High d-2025-05-04')
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
}
