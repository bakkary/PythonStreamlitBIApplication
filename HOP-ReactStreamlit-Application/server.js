import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

// Handle __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express server
const app = express();

// Serve React static files
const distPath = path.resolve(__dirname, "dist");
app.use(express.static(distPath));

// Proxy requests to FastAPI
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8000/docs", // FastAPI backend URL
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Remove "/api" from forwarded path
    },
  })
);

// Proxy requests to Streamlit
app.use(
  "/streamlit",
  createProxyMiddleware({
    target: "http://localhost:8501", // Streamlit app URL
    changeOrigin: true,
    pathRewrite: {
      "^/streamlit": "", // Remove "/streamlit" from forwarded path
    },
  })
);

// Fallback to React for all other routes (must come after proxies)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Function to start the Vite app
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

// Function to start the Streamlit app
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

// Function to start the FastAPI app
const runFastAPIApp = () => {
  console.log("Starting FastAPI backend...");
  const fastAPIProcess = spawn("uvicorn", ["main:app", "--host", "0.0.0.0", "--port", "8000"], {
    cwd: path.resolve(__dirname, "backend"), // Adjust this to the FastAPI backend directory
    stdio: "inherit",
    shell: true,
  });

  fastAPIProcess.on("close", (code) => {
    console.log(`FastAPI app exited with code ${code}`);
  });
};

// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Start all apps
runViteApp();
runStreamlitApp();
runFastAPIApp();
