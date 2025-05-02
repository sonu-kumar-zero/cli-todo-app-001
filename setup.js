#!/usr/bin/env node
import { execSync } from "child_process";
import path from "path";

// Get the current directory where this script is being run
const currentDir = process.cwd();

// Run npm link to globally link your app
export function setupInit() {
  try {
    console.log("Linking your app globally...");
    execSync("npm link", { cwd: currentDir, stdio: "inherit" });
    console.log("App linked globally!");
  } catch (error) {
    console.error("Error linking app globally:", error);
  }
}
