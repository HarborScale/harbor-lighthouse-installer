// Favicon data (base64 encoded)
const FAVICON_DATA = "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";

// Product configurations
const PRODUCTS = {
  lighthouse: {
    title: "Harbor Lighthouse",
    description: "The universal telemetry agent. Run the command below to install the service instantly.",
    productName: "HarborLighthouse",
    repoName: "harbor-lighthouse",
    linuxScript: "https://raw.githubusercontent.com/harborscale/harbor-lighthouse/main/scripts/install.sh",
    winScript: "https://raw.githubusercontent.com/harborscale/harbor-lighthouse/main/scripts/install.ps1",
    installDir: {
      linux: "/usr/local/bin",
      windows: "C:\\Program Files\\HarborLighthouse"
    },
    binaryName: {
      linux: "lighthouse",
      windows: "lighthouse.exe"
    }
  },
  meshtastic: {
    title: "Harbor Meshtastic",
    description: "Meshtastic telemetry plugin for Harbor Lighthouse. Requires Lighthouse to be installed first.",
    productName: "HarborMeshtastic",
    repoName: "harbor-meshtastic",
    linuxScript: "https://raw.githubusercontent.com/HarborScale/harbor-meshtastic/main/scripts/install.sh",
    winScript: "https://raw.githubusercontent.com/HarborScale/harbor-meshtastic/main/scripts/install.ps1",
    installDir: {
      linux: "/opt/harbor-lighthouse/plugins",
      windows: "C:\\HarborLighthouse\\Plugins"
    },
    binaryName: {
      linux: "mesh_engine",
      windows: "mesh_engine.exe"
    },
    requiresLighthouse: true
  }
};

/**
 * Helper function to handle installation display
 */
function handleInstall(url, userAgent, config) {
  // CLI Detection - redirect to appropriate script
  if (userAgent.includes("PowerShell") && userAgent.includes("Windows")) {
    return Response.redirect(config.winScript, 302);
  }
  if (userAgent.includes("curl") || userAgent.includes("wget")) {
    return Response.redirect(config.linuxScript, 302);
  }

  // Split title for styling
  const titleParts = config.title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');

  // Browser Display
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Install ${config.title}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico">
      <style>
        :root {
          --brand-orange: #FF4F00;
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
        .warning {
          background: rgba(234, 179, 8, 0.1);
          border: 1px solid rgba(234, 179, 8, 0.3);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 2rem;
          color: #fbbf24;
          font-size: 0.9rem;
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
        <h1>${firstWord} <span>${restOfTitle}</span></h1>
        <p>${config.description}</p>
        ${config.requiresLighthouse ? `
        <div class="warning">
          ⚠️ <strong>Prerequisite:</strong> This plugin requires Harbor Lighthouse to be installed first. 
          <a href="/" style="color: #fbbf24;">Install Lighthouse →</a>
        </div>
        ` : ''}

        <div class="section">
          <span class="label">🐧 Linux / macOS / Pi</span>
          <div class="code-wrapper">
            <button id="btn-nix" class="copy-btn" onclick="copyToClipboard('curl -sL ${url.hostname}${url.pathname} | sudo bash', 'btn-nix')">Copy</button>
            <div class="code-block">
              <span class="cmd-part">curl</span> -sL ${url.hostname}${url.pathname} | sudo bash
            </div>
          </div>
        </div>
        
        <div class="section">
          <span class="label">🪟 Windows PowerShell</span>
          <div class="code-wrapper">
            <button id="btn-win" class="copy-btn" onclick="copyToClipboard('iwr ${url.hostname}${url.pathname} | iex', 'btn-win')">Copy</button>
            <div class="code-block">
              <span class="cmd-part">iwr</span> ${url.hostname}${url.pathname} | iex
            </div>
          </div>
        </div>
        
        <div class="uninstall-toggle">
          <details>
            <summary>Need to uninstall?</summary>
            <div class="danger-zone">
              <span class="danger-label">Linux / macOS</span>
              <div class="code-wrapper" style="border-color: #7f1d1d;">
                 <button id="btn-rm-nix" class="copy-btn" onclick="copyToClipboard('curl -sL ${url.hostname}${url.pathname} | sudo bash -s -- --uninstall', 'btn-rm-nix')">Copy</button>
                 <div class="code-block" style="color:#fca5a5;">
                   <span class="cmd-part" style="color:#ef4444">curl</span> -sL ${url.hostname}${url.pathname} | sudo bash -s -- --uninstall
                 </div>
              </div>
              <br>
              <span class="danger-label">Windows</span>
              <div class="code-wrapper" style="border-color: #7f1d1d;">
                 <button id="btn-rm-win" class="copy-btn" onclick="copyToClipboard('iwr ${url.hostname}${url.pathname} -UseBasicParsing | iex -ArgumentList \\'-Uninstall\\'', 'btn-rm-win')">Copy</button>
                 <div class="code-block" style="color:#fca5a5;">
                   iwr ${url.hostname}${url.pathname} -UseBasicParsing | iex -ArgumentList '-Uninstall'
                 </div>
              </div>
            </div>
          </details>
        </div>
        
        <div class="footer">
          <a href="https://github.com/harborscale/${config.repoName}" target="_blank">View Source Code</a>
        </div>
      </div>
    </body>
    </html>
    `;
  return new Response(html, { headers: { "Content-Type": "text/html" } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";

    // Handle favicon
    if (url.pathname === "/favicon.ico") {
      const binaryString = atob(FAVICON_DATA);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new Response(bytes.buffer, {
        headers: {
          "Content-Type": "image/x-icon",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // Route: /meshtastic
    if (url.pathname === "/meshtastic") {
      return handleInstall(url, userAgent, PRODUCTS.meshtastic);
    }

    // Route: / (root - Lighthouse)
    if (url.pathname === "/") {
      return handleInstall(url, userAgent, PRODUCTS.lighthouse);
    }

    // Handle 404 for unknown paths
    return new Response("Not Found", { status: 404 });
  },
};
