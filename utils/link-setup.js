import { setupInit } from "../setup.js";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

// Get the global node_modules path
function getGlobalNodeModulesPath() {
  const npmRoot = execSync("npm root -g", { encoding: "utf8" }).trim();
  return npmRoot;
}

// Check if the app is globally linked
function checkGlobalLink() {
  const globalPath = getGlobalNodeModulesPath();
  const todoAppPath = path.join(globalPath, "todo-app");

  // Check if the todo-app exists in the global node_modules directory
  const isLinked = fs.existsSync(todoAppPath);

  return isLinked;
}

// function to link
export function globalLinkCreation() {
  if (!checkGlobalLink()) {
    console.log("Running setup.js to link globally...");
    setupInit();
  } else {
    console.log("App is already linked globally.");
  }
}
