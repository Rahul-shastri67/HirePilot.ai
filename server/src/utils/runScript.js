import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);

const ROOT = process.cwd();

export async function runScript(script, args = []) {
  const scriptPath = path.join(ROOT, "scripts", script);

  try {
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [scriptPath, ...args],
      {
        cwd: ROOT,
        timeout: 45000,
        maxBuffer: 10 * 1024 * 1024,
        windowsHide: true
      }
    );

    return {
      data: JSON.parse(stdout),
      diagnostics: stderr.trim()
    };
  } catch (error) {
    const message = error.stderr?.trim() || error.message;
    throw new Error(message);
  }
}
