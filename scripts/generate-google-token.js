const { google } = require("googleapis");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("\n==================================================");
  console.log("   SOVEREIGN X AUDITS - GOOGLE OAUTH HELPER");
  console.log("==================================================\n");

  console.log("This script will help you generate your GOOGLE_REFRESH_TOKEN.\n");
  console.log("Prerequisites:");
  console.log("1. Go to Google Cloud Console: https://console.cloud.google.com");
  console.log("2. Enable the Google Drive API.");
  console.log("3. Configure the OAuth Consent Screen (Internal or External with your test user sxabfcg@gmail.com).");
  console.log("   Make sure to add sxabfcg@gmail.com under 'Test users'!");
  console.log("4. Go to Credentials -> Create Credentials -> OAuth Client ID.");
  console.log("5. Application Type: Web Application.");
  console.log("6. Authorized Redirect URIs MUST include:");
  console.log("   - http://localhost:3000/api/auth/google/callback");
  console.log("   - https://sxaudits.com/api/auth/google/callback");
  console.log("7. Copy your Client ID and Client Secret.\n");

  const clientId = await ask("Enter your GOOGLE_CLIENT_ID: ");
  const clientSecret = await ask("Enter your GOOGLE_CLIENT_SECRET: ");
  const redirectUri = await ask("Enter your GOOGLE_REDIRECT_URI (default: http://localhost:3000/api/auth/google/callback): ") || "http://localhost:3000/api/auth/google/callback";

  if (!clientId.trim() || !clientSecret.trim()) {
    console.error("Error: Client ID and Client Secret are required.");
    rl.close();
    return;
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId.trim(),
    clientSecret.trim(),
    redirectUri.trim()
  );

  // Generate an authorization URL
  const scopes = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file"
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent", // Forces a refresh token to be returned
  });

  console.log("\n--------------------------------------------------");
  console.log("Step 1: Open the following URL in your browser:\n");
  console.log(authUrl);
  console.log("\n--------------------------------------------------");
  console.log("Step 2: Sign in with your sxabfcg@gmail.com account.");
  console.log("Step 3: After authorizing, your browser will redirect to a page (which might say 'This site can’t be reached' if localhost dev server isn't running).");
  console.log("Step 4: Copy the full URL from the browser's address bar or just copy the 'code' parameter value.");
  console.log("--------------------------------------------------\n");

  const codeOrUrl = await ask("Enter the authorization code or the full redirect URL: ");
  rl.close();

  let code = codeOrUrl.trim();
  if (code.includes("code=")) {
    try {
      const parsedUrl = new URL(code);
      code = parsedUrl.searchParams.get("code") || code;
    } catch (e) {
      // Not a valid URL, try regex fallback
      const match = code.match(/[?&]code=([^&]+)/);
      if (match) {
        code = match[1];
      }
    }
  }

  console.log("\nExchanging code for tokens...");
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("\n==================================================");
    console.log("   SUCCESS! COPY THESE VALUES FOR YOUR .env.local");
    console.log("==================================================\n");
    console.log(`GOOGLE_CLIENT_ID=${clientId.trim()}`);
    console.log(`GOOGLE_CLIENT_SECRET=${clientSecret.trim()}`);
    console.log(`GOOGLE_REDIRECT_URI=${redirectUri.trim()}`);
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log("\n==================================================\n");
    console.log("Make sure to also create your Google Drive Root Folder and copy its ID for GOOGLE_DRIVE_ROOT_FOLDER_ID.");
  } catch (error) {
    console.error("\nError exchanging code for tokens:", error.message);
  }
}

main().catch(console.error);
