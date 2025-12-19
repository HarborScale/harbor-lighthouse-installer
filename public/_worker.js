export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";
    
    // --- LINK TO YOUR MAIN GO REPO ---
    const LINUX_SCRIPT = "https://raw.githubusercontent.com/harborscale/harbor-lighthouse/main/scripts/install.sh";
    const WIN_SCRIPT   = "https://raw.githubusercontent.com/harborscale/harbor-lighthouse/main/scripts/install.ps1";
    // ---------------------------------

    // 1. CLI Detection (Redirects)
    if (userAgent.includes("PowerShell") || userAgent.includes("Windows")) {
      return Response.redirect(WIN_SCRIPT, 302);
    }
    if (userAgent.includes("curl") || userAgent.includes("wget")) {
      return Response.redirect(LINUX_SCRIPT, 302);
    }

    // 2. Browser Display (The Beautiful Page)
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Install Harbor Lighthouse</title>
      <style>
        :root {
          --brand-orange: #FF4F00; /* International Orange (Aerospace) */
          --bg-dark: #0f172a;
          --bg-card: #1e293b;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
        }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: var(--bg-dark); color: var(--text-main); display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
        .container { background: var(--bg-card); padding: 2.5rem; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); max-width: 650px; width: 100%; border-top: 6px solid var(--brand-orange); }
        h1 { margin-top: 0; color: #fff; font-size: 1.8rem; display: flex; align-items: center; gap: 10px; }
        h1 span { color: var(--brand-orange); }
        p { color: var(--text-muted); line-height: 1.6; margin-bottom: 2rem; }
        
        .section { margin-bottom: 2rem; }
        .label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--brand-orange); letter-spacing: 0.05em; margin-bottom: 8px; display: block; }
        
        .code-wrapper { position: relative; background: #0b1120; border-radius: 8px; border: 1px solid #334155; overflow: hidden; }
        .code-block { padding: 1.2rem; font-family: 'Menlo', 'Monaco', 'Courier New', monospace; margin: 0; overflow-x: auto; white-space: nowrap; color: #e2e8f0; font-size: 0.9rem; }
        .cmd-part { color: var(--brand-orange); font-weight: bold; }
        
        .copy-btn {
          position: absolute; right: 8px; top: 8px;
          background: rgba(255, 255, 255, 0.1); border: none; color: #fff;
          padding: 6px 12px; border-radius: 6px; cursor: pointer;
          font-size: 0.8rem; font-weight: 600; transition: all 0.2s;
          display: flex; align-items: center; gap: 6px;
        }
        .copy-btn:hover { background: var(--brand-orange); color: #fff; }
        .copy-btn svg { width: 14px; height: 14px; fill: currentColor; }

        .footer { margin-top: 2rem; font-size: 0.875rem; color: var(--text-muted); text-align: center; border-top: 1px solid #334155; padding-top: 1.5rem; }
        a { color: var(--brand-orange); text-decoration: none; opacity: 0.9; }
        a:hover { opacity: 1; text-decoration: underline; }
      </style>
      <script>
        function copyToClipboard(text, btnId) {
          navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById(btnId);
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span>✓ Copied!</span>';
            btn.style.background = '#10b981'; // Green for success
            setTimeout(() => {
              btn.innerHTML = originalContent;
              btn.style.background = '';
            }, 2000);
          });
        }
      </script>
    </head>
    <body>
      <div class="container">
        <h1>🚢 Harbor <span>Lighthouse</span></h1>
        <p>The universal telemetry agent for your infrastructure. Run the command below to install the agent as a background service.</p>
        
        <div class="section">
          <span class="label">Linux / macOS / Raspberry Pi</span>
          <div class="code-wrapper">
            <button id="btn-nix" class="copy-btn" onclick="copyToClipboard('curl -sL ${url.hostname} | sudo bash', 'btn-nix')">
              <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              Copy
            </button>
            <div class="code-block">
              <span class="cmd-part">curl</span> -sL ${url.hostname} | sudo bash
            </div>
          </div>
        </div>

        <div class="section">
          <span class="label">Windows (PowerShell)</span>
          <div class="code-wrapper">
            <button id="btn-win" class="copy-btn" onclick="copyToClipboard('iwr ${url.hostname} | iex', 'btn-win')">
               <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              Copy
            </button>
            <div class="code-block">
              <span class="cmd-part">iwr</span> ${url.hostname} | iex
            </div>
          </div>
        </div>

        <div class="footer">
          Latest Version • <a href="https://github.com/harborscale/lighthouse" target="_blank">View Source on GitHub</a>
        </div>
      </div>
    </body>
    </html>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  },
};
