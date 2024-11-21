import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve React static files
const distPath = path.resolve(__dirname, "dist");
app.use(express.static(distPath));

// Fallback to React for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Start React (Vite), FastAPI, and Streamlit
const runViteApp = () => {
  console.log("Starting Vite app...");
  const viteProcess = spawn("npm", ["run", "vite-dev"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
  });

  viteProcess.on("close", (code) => {
    console.log(`Vite app exited with code ${code}`);
  });
};

const runStreamlitApp = () => {
  console.log("Starting Streamlit app...");
  const streamlitProcess = spawn(
    "streamlit",
    ["run", "app.py", "--server.enableCORS=false", "--server.enableXsrfProtection=false"],
    {
      cwd: path.resolve(__dirname, "streamlit"),
      stdio: "inherit",
      shell: true,
    }
  );

  streamlitProcess.on("close", (code) => {
    console.log(`Streamlit app exited with code ${code}`);
  });
};

const runFastAPIApp = () => {
  console.log("Starting FastAPI backend...");
  const fastAPIProcess = spawn("uvicorn", ["main:app", "--host", "localhost", "--port", "8000"], {
    cwd: path.resolve(__dirname, "backend"),
    stdio: "inherit",
    shell: true,
  });

  fastAPIProcess.on("close", (code) => {
    console.log(`FastAPI app exited with code ${code}`);
  });
};

runViteApp();
runStreamlitApp();
runFastAPIApp();
