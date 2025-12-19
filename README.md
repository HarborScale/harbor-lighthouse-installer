# 🚢 Harbor Lighthouse Installer

This repository hosts the logic for **[get.harborscale.com](https://get.harborscale.com)**, the universal entry point for installing the Harbor Lighthouse agent.

It is designed to be transparent, secure, and fast, serving as a smart redirector based on the client's `User-Agent`.

---

## ⚡ How It Works

When a user or script visits `get.harborscale.com`, this Cloudflare Worker (`_worker.js`) inspects the request and routes it accordingly:

| Client | Detected User-Agent | Action | Target URL |
| :--- | :--- | :--- | :--- |
| **Linux / Mac** | `curl`, `wget` | **302 Redirect** | [`install.sh` (Main Repo)](https://github.com/harborscale/harbor-lighthouse/blob/main/scripts/install.sh) |
| **Windows** | `PowerShell`, `Windows` | **302 Redirect** | [`install.ps1` (Main Repo)](https://github.com/harborscale/harbor-lighthouse/blob/main/scripts/install.ps1) |
| **Web Browser** | Chrome, Safari, etc. | **Render HTML** | Displays the [Landing Page](https://get.harborscale.com) with instructions. |

> **Security Note:** This repo does **not** host the actual installation scripts or binaries. It only routes traffic to the verified scripts in the main [Harbor Lighthouse Repository](https://github.com/harborscale/harbor-lighthouse).

---

## 🛠️ Local Development

To test the logic locally without deploying:

1.  **Install Wrangler** (Cloudflare CLI):
    ```bash
    npm install -g wrangler
    ```

2.  **Run the Dev Server:**
    ```bash
    npx wrangler pages dev public
    ```

3.  **Test Redirects:**
    ```bash
    # Test Linux Redirect
    curl -v -H "User-Agent: curl/7.64.1" http://localhost:8788/

    # Test Windows Redirect
    curl -v -H "User-Agent: WindowsPowerShell/5.1" http://localhost:8788/
    ```

---

## 📄 License

MIT License.
