import chalk from "chalk";

// get priority color of given todo
export function getProiorityColor(todo) {
  let priorityColor;
  switch (todo.priority) {
    case "High":
      priorityColor = chalk.red(todo.priority);
      break;
    case "Medium":
      priorityColor = chalk.yellow(todo.priority);
      break;
    case "Low":
      priorityColor = chalk.green(todo.priority);
      break;
    default:
      priorityColor = chalk.white("None");
  }
  return priorityColor;
}

// get due date string
export function getDueDateString(todo) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const dueDateStr = todo.dueDate
    ? (() => {
        const due = new Date(todo.dueDate);
        if (isNaN(due.getTime())) return chalk.gray("(Invalid due date)");

        const dueDay = new Date(
          due.getFullYear(),
          due.getMonth(),
          due.getDate()
        );

        if (!todo.done && dueDay < today)
          return chalk.red(`(Overdue: ${due.toDateString()})`);

        return chalk.cyan(`(Due: ${due.toDateString()})`);
      })()
    : chalk.gray("(No due date)");
  return dueDateStr;
}
