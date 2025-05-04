import { execSync } from "child_process";
import path from "path";
import fs from "fs";

// Get current executable path (when run via pkg)
const exePath = process.execPath;
const installDir = path.join(process.env.LOCALAPPDATA, "TodoAppCli");
export const targetPath = path.join(installDir, "todo.exe");

function isInPath(dir) {
  const pathEnv = process.env["PATH"] || "";
  return pathEnv.split(";").some((p) => path.resolve(p) === path.resolve(dir));
}

function addToUserPath(dir) {
  try {
    // Use reg to set user PATH (no admin required)
    const currentPath = execSync("reg query HKCU\\Environment /v PATH", {
      encoding: "utf8",
    });
    const match = currentPath.match(/PATH\s+REG_[^\s]+\s+(.+)/);
    const oldPath = match ? match[1] : "";
    if (!oldPath.includes(dir)) {
      const newPath = oldPath + ";" + dir;
      execSync(
        `reg add HKCU\\Environment /v PATH /t REG_EXPAND_SZ /d "${newPath}" /f`
      );
      console.log(
        "✅ Added MyCLI to user PATH (you may need to restart your terminal)."
      );
    }
  } catch (err) {
    console.error("❌ Failed to update PATH:", err.message);
  }
}

function installCLI() {
  if (!fs.existsSync(installDir)) {
    fs.mkdirSync(installDir, { recursive: true });
  }

  fs.copyFileSync(exePath, targetPath);
  console.log(`✅ Installed todo to: ${targetPath}`);

  if (!isInPath(installDir)) {
    addToUserPath(installDir);
  }
  console.log("🎉 You can now run 'todo' from any terminal!");
}

// function to link
export function globalLinkCreation() {
  // Run installation logic only if this is a pkg-built binary
  try {
    if (process.pkg) {
      installCLI();
    }
  } catch (error) {
    if (error instanceof Error)
      console.error("❌ Installation failed:", err.message);
    process.exit(1);
  }
}
