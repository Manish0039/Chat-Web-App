// Automatically swaps between local development and your live Render server
export const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://127.0.0.1:5000" 
    : "https://chat-web-app-2hg1.onrender.com"; // 👈 Paste your exact live Render link here