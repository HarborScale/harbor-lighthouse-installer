export default {
  async fetch(request, env) {
    const userAgent = request.headers.get("User-Agent") || "";
    
    // --- LINK TO YOUR MAIN GO REPO ---
    // Ensure these paths match where you put them in the 'harborscale/lighthouse' repo
    const LINUX_SCRIPT = "https://raw.githubusercontent.com/harborscale/lighthouse/main/scripts/install.sh";
    const WIN_SCRIPT   = "https://raw.githubusercontent.com/harborscale/lighthouse/main/scripts/install.ps1";
    // ---------------------------------

    // 1. Windows Detection (Redirect to GitHub Raw)
    if (userAgent.includes("PowerShell") || userAgent.includes("Windows")) {
      return Response.redirect(WIN_SCRIPT, 302);
    }

    // 2. Linux/Mac Detection (Redirect to GitHub Raw)
    if (userAgent.includes("curl") || userAgent.includes("wget")) {
      return Response.redirect(LINUX_SCRIPT, 302);
    }

    // 3. Browser Display (The Landing Page)
    const url = new URL(request.url);
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Install Harbor Lighthouse</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .container { background: #1e293b; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5); max-width: 600px; width: 90%; }
        h1 { margin-top: 0; color: #38bdf8; font-size: 1.5rem; }
        .code-block { background: #0f172a; padding: 1rem; border-radius: 6px; border: 1px solid #334155; font-family: 'Menlo', 'Monaco', 'Courier New', monospace; margin: 10px 0 20px 0; overflow-x: auto; white-space: nowrap; color: #a5b4fc; }
        .label { font-size: 0.75rem; font-weight: bold; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; }
        .win { color: #4ade80; }
        .footer { margin-top: 1.5rem; font-size: 0.875rem; color: #64748b; text-align: center; }
        a { color: #38bdf8; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚢 Install Harbor Lighthouse</h1>
        <p>Run the following command in your terminal to install the agent:</p>
        
        <div class="label">Linux / macOS / Raspberry Pi</div>
        <div class="code-block">curl -sL ${url.hostname} | sudo bash</div>

        <div class="label win">Windows (PowerShell)</div>
        <div class="code-block" style="color: #86efac;">iwr ${url.hostname} | iex</div>

        <div class="footer">
          Latest Version • <a href="https://github.com/harborscale/lighthouse">View Source on GitHub</a>
        </div>
      </div>
    </body>
    </html>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  },
};
