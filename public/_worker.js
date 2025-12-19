export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";
    
    // --- CONFIGURATION ---
    // Updated to your new repo URL
    const LINUX_SCRIPT = "https://raw.githubusercontent.com/harborscale/harbor-lighthouse/main/scripts/install.sh";
    const WIN_SCRIPT   = "https://raw.githubusercontent.com/harborscale/harbor-lighthouse/main/scripts/install.ps1";
    // ---------------------

    // 1. CLI Detection
    if (userAgent.includes("PowerShell") || userAgent.includes("Windows")) {
      return Response.redirect(WIN_SCRIPT, 302);
    }
    if (userAgent.includes("curl") || userAgent.includes("wget")) {
      return Response.redirect(LINUX_SCRIPT, 302);
    }

    // 2. Browser Display
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Install Harbor Lighthouse</title>
      <style>
        :root {
          --brand-orange: #FF4F00;
          --bg-body: #050505;
          --bg-card: #121212;
          --border: #2a2a2a;
          --text-main: #ffffff;
          --text-muted: #a1a1aa;
        }
        body { font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif; background: var(--bg-body); color: var(--text-main); display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
        .container { background: var(--bg-card); padding: 3rem; border-radius: 24px; border: 1px solid var(--border); box-shadow: 0 0 40px rgba(0, 0, 0, 0.5); max-width: 600px; width: 100%; position: relative; overflow: hidden; }
        .container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--brand-orange), transparent); box-shadow: 0 0 20px var(--brand-orange); }
        h1 { margin-top: 0; font-size: 2rem; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 0.5rem; }
        h1 span { color: var(--brand-orange); }
        p { color: var(--text-muted); line-height: 1.6; margin-bottom: 2.5rem; font-size: 1.05rem; }
        .section { margin-bottom: 2rem; }
        .label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .code-wrapper { position: relative; background: #000; border-radius: 12px; border: 1px solid var(--border); transition: border-color 0.2s; }
        .code-wrapper:hover { border-color: #444; }
        .code-block { padding: 1.2rem; font-family: 'Menlo', 'Monaco', 'Courier New', monospace; margin: 0; overflow-x: auto; white-space: nowrap; color: #e2e8f0; font-size: 0.95rem; }
        .cmd-part { color: var(--brand-orange); font-weight: bold; }
        .copy-btn { position: absolute; right: 8px; top: 8px; bottom: 8px; background: #222; border: 1px solid #333; color: #fff; padding: 0 16px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600; transition: all 0.2s; }
        .copy-btn:hover { background: var(--brand-orange); border-color: var(--brand-orange); color: #000; }
        
        /* UNINSTALL SECTION */
        .uninstall-toggle { margin-top: 3rem; border-top: 1px solid var(--border); padding-top: 1.5rem; }
        details { color: var(--text-muted); cursor: pointer; }
        summary { font-size: 0.9rem; font-weight: 600; transition: color 0.2s; list-style: none; display: flex; align-items: center; gap: 6px; }
        summary:hover { color: #ef4444; }
        summary::before { content: '🗑️'; font-size: 1rem; }
        .danger-zone { margin-top: 1rem; }
        .danger-label { font-size: 0.75rem; font-weight: bold; color: #f87171; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
        .footer { margin-top: 2rem; font-size: 0.875rem; color: var(--text-muted); text-align: center; }
        a { color: var(--text-main); text-decoration: underline; text-decoration-color: var(--brand-orange); text-underline-offset: 4px; }
        a:hover { color: var(--brand-orange); }
      </style>
      <script>
        function copyToClipboard(text, btnId) {
          navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById(btnId);
            const originalText = btn.innerText;
            btn.innerText = 'Copied!';
            btn.style.backgroundColor = '#fff';
            btn.style.color = '#000';
            setTimeout(() => {
              btn.innerText = originalText;
              btn.style.backgroundColor = '';
              btn.style.color = '';
            }, 2000);
          });
        }
      </script>
    </head>
    <body>
      <div class="container">
        <h1>Harbor <span>Lighthouse</span></h1>
        <p>The universal telemetry agent. Run the command below to install the service instantly.</p>
        
        <div class="section">
          <span class="label">🐧 Linux / macOS / Pi</span>
          <div class="code-wrapper">
            <button id="btn-nix" class="copy-btn" onclick="copyToClipboard('curl -sL ${url.hostname} | sudo bash', 'btn-nix')">Copy</button>
            <div class="code-block">
              <span class="cmd-part">curl</span> -sL ${url.hostname} | sudo bash
            </div>
          </div>
        </div>

        <div class="section">
          <span class="label">🪟 Windows PowerShell</span>
          <div class="code-wrapper">
            <button id="btn-win" class="copy-btn" onclick="copyToClipboard('iwr ${url.hostname} | iex', 'btn-win')">Copy</button>
            <div class="code-block">
              <span class="cmd-part">iwr</span> ${url.hostname} | iex
            </div>
          </div>
        </div>

        <div class="uninstall-toggle">
          <details>
            <summary>Need to uninstall?</summary>
            <div class="danger-zone">
              
              <span class="danger-label">Linux / macOS</span>
              <div class="code-wrapper" style="border-color: #7f1d1d;">
                 <button id="btn-rm-nix" class="copy-btn" onclick="copyToClipboard('curl -sL ${url.hostname} | sudo bash -s -- --uninstall', 'btn-rm-nix')">Copy</button>
                 <div class="code-block" style="color:#fca5a5;">
                   <span class="cmd-part" style="color:#ef4444">curl</span> -sL ${url.hostname} | sudo bash -s -- --uninstall
                 </div>
              </div>
              <br>
              <span class="danger-label">Windows</span>
              <div class="code-wrapper" style="border-color: #7f1d1d;">
                 <button id="btn-rm-win" class="copy-btn" onclick="copyToClipboard('lighthouse.exe --uninstall; Remove-Item \"C:\\Program Files\\HarborLighthouse\" -Recurse -Force', 'btn-rm-win')">Copy</button>
                 <div class="code-block" style="color:#fca5a5;">
                   lighthouse.exe --uninstall; Remove-Item "C:\Program Files\HarborLighthouse" -Recurse -Force
                 </div>
              </div>

            </div>
          </details>
        </div>

        <div class="footer">
          <a href="https://github.com/harborscale/harbor-lighthouse" target="_blank">View Source Code</a>
        </div>
      </div>
    </body>
    </html>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  },
};
