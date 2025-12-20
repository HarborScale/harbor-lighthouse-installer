export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";
   
    // --- CONFIGURATION ---
    const LINUX_SCRIPT = "https://raw.githubusercontent.com/harborscale/harbor-lighthouse/main/scripts/install.sh";
    const WIN_SCRIPT = "https://raw.githubusercontent.com/harborscale/harbor-lighthouse/main/scripts/install.ps1";
    // ---------------------
    // 1. CLI Detection
    if (userAgent.includes("PowerShell") && userAgent.includes("Windows")) {
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
          --brand-orange: #FF4F00; /* International Orange */
          --brand-orange-dark: #D94100;
          --bg-body: #050505;
          --bg-card: #121212;
          --border: #2a2a2a;
          --text-main: #ffffff;
          --text-muted: #a1a1aa;
          --shadow-color: rgba(0, 0, 0, 0.5);
          --glow-orange: rgba(255, 79, 0, 0.5);
        }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif; 
          background: linear-gradient(to bottom, var(--bg-body), #0a0a0a); 
          color: var(--text-main); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh; 
          margin: 0; 
          padding: 20px; 
        }
        .container { 
          background: var(--bg-card); 
          padding: 3rem; 
          border-radius: 24px; 
          border: 1px solid var(--border); 
          box-shadow: 0 10px 50px var(--shadow-color), 0 0 30px var(--glow-orange); 
          max-width: 600px; 
          width: 100%; 
          position: relative; 
          overflow: hidden; 
          animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .container::before { 
          content: ''; 
          position: absolute; 
          top: 0; 
          left: 0; 
          right: 0; 
          height: 4px; 
          background: linear-gradient(90deg, transparent, var(--brand-orange), var(--brand-orange-dark), transparent); 
          box-shadow: 0 0 30px var(--brand-orange); 
          animation: glowLine 2s infinite alternate;
        }
        @keyframes glowLine {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
        h1 { 
          margin-top: 0; 
          font-size: 2.5rem; 
          font-weight: 800; 
          letter-spacing: -0.05em; 
          margin-bottom: 0.5rem; 
          text-shadow: 0 2px 10px var(--glow-orange);
        }
        h1 span { 
          color: var(--brand-orange); 
          background: linear-gradient(45deg, var(--brand-orange), var(--brand-orange-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p { 
          color: var(--text-muted); 
          line-height: 1.6; 
          margin-bottom: 2.5rem; 
          font-size: 1.05rem; 
        }
        .section { 
          margin-bottom: 2rem; 
          transition: transform 0.3s ease;
        }
        .section:hover {
          transform: translateY(-5px);
        }
        .label { 
          font-size: 0.75rem; 
          font-weight: 700; 
          text-transform: uppercase; 
          color: var(--text-muted); 
          letter-spacing: 0.05em; 
          margin-bottom: 10px; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
        }
        .code-wrapper { 
          position: relative; 
          background: #000; 
          border-radius: 12px; 
          border: 1px solid var(--border); 
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        .code-wrapper:hover { 
          border-color: var(--brand-orange); 
          box-shadow: 0 4px 20px var(--glow-orange);
          transform: translateY(-2px);
        }
        .code-block { 
          padding: 1.2rem; 
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace; 
          margin: 0; 
          overflow-x: auto; 
          white-space: nowrap; 
          color: #e2e8f0; 
          font-size: 0.95rem; 
        }
        .cmd-part { 
          color: var(--brand-orange); 
          font-weight: bold; 
          text-shadow: 0 0 5px var(--glow-orange);
        }
        .copy-btn { 
          position: absolute; 
          right: 8px; 
          top: 8px; 
          bottom: 8px; 
          background: #222; 
          border: 1px solid #333; 
          color: #fff; 
          padding: 0 16px; 
          border-radius: 8px; 
          cursor: pointer; 
          font-size: 0.85rem; 
          font-weight: 600; 
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        .copy-btn:hover { 
          background: var(--brand-orange); 
          border-color: var(--brand-orange); 
          color: #000; 
          box-shadow: 0 0 15px var(--glow-orange);
        }
       
        /* UNINSTALL SECTION */
        .uninstall-toggle { 
          margin-top: 3rem; 
          border-top: 1px solid var(--border); 
          padding-top: 1.5rem; 
        }
        details { 
          color: var(--text-muted); 
          cursor: pointer; 
          transition: all 0.3s ease;
        }
        summary { 
          font-size: 0.9rem; 
          font-weight: 600; 
          transition: color 0.2s; 
          list-style: none; 
          display: flex; 
          align-items: center; 
          gap: 6px; 
        }
        summary:hover { 
          color: #ef4444; 
          text-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
        }
        summary::before { 
          content: '🗑️'; 
          font-size: 1rem; 
        }
        .danger-zone { 
          margin-top: 1rem; 
          animation: fadeIn 0.5s ease-out;
        }
        .danger-label { 
          font-size: 0.75rem; 
          font-weight: bold; 
          color: #f87171; 
          text-transform: uppercase; 
          margin-bottom: 0.5rem; 
          display: block; 
        }
        .footer { 
          margin-top: 2rem; 
          font-size: 0.875rem; 
          color: var(--text-muted); 
          text-align: center; 
        }
        a { 
          color: var(--text-main); 
          text-decoration: underline; 
          text-decoration-color: var(--brand-orange); 
          text-underline-offset: 4px; 
          transition: all 0.2s;
        }
        a:hover { 
          color: var(--brand-orange); 
          text-shadow: 0 0 10px var(--glow-orange);
        }
      </style>
      <script>
        function copyToClipboard(text, btnId) {
          navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById(btnId);
            const originalText = btn.innerText;
            btn.innerText = 'Copied!';
            btn.style.backgroundColor = '#fff';
            btn.style.color = '#000';
            btn.style.boxShadow = '0 0 15px var(--glow-orange)';
            setTimeout(() => {
              btn.innerText = originalText;
              btn.style.backgroundColor = '';
              btn.style.color = '';
              btn.style.boxShadow = '';
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
                 <button id="btn-rm-win" class="copy-btn" onclick="copyToClipboard('lighthouse --uninstall; Remove-Item \\'C:\\\\Program Files\\\\HarborLighthouse\\' -Recurse -Force', 'btn-rm-win')">Copy</button>
                 <div class="code-block" style="color:#fca5a5;">
                   lighthouse --uninstall; Remove-Item 'C:\Program Files\HarborLighthouse' -Recurse -Force
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
