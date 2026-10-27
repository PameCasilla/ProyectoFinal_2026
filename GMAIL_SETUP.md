# Gmail SMTP setup

All six emails are rendered locally as HTML with plain-text alternatives. No Resend account or template IDs are needed.

## Google account
1. Sign in as workffice2026@gmail.com.
2. Enable 2-Step Verification.
3. Generate an App Password at https://myaccount.google.com/apppasswords (name it Workffice).
4. In apps/workffice-backend/.env, fill in:

```dotenv
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=workffice2026@gmail.com
EMAIL_PASSWORD=YOUR_GOOGLE_APP_PASSWORD
EMAIL_FROM=workffice2026@gmail.com
```

Use the App Password, not your regular Google password. Keep it private. Some managed or protected accounts do not offer app passwords. Spaces in the generated password are removed automatically.

The shipped EMAIL_PASSWORD is blank. Startup intentionally fails with an actionable error until it is supplied. EMAIL_FROM must match EMAIL_USERNAME.

## Run locally
From the project root, install dependencies if needed and run your usual commands:

```bash
npm install
npm run dev
```

The existing backend launcher reads apps/workffice-backend/.env. Restart the backend after editing it. For containers use `npm run dev:docker`; the root Compose file passes the Gmail settings through.

## Verify
Register a new account with an inbox you control. Check Gmail Sent and the recipient inbox/spam folder; follow the confirmation link. Then test password recovery, collaborator invitations, booking payment accepted/failed, and office news through the corresponding application flows. Do not make real payments just to test email.

For backend automated checks:

```bash
cd apps/workffice-backend
./gradlew test --tests shared.TestGmailEmailSender
```

These tests use a local SMTP server; they never contact Google. They cover all six messages, HTML/plain text, escaping, sender address, links and SMTP configuration. The authoring environment could not download Gradle, so these tests have not been executed there.

Emails are asynchronous: a successful registration API response does not prove email delivery. Inspect backend logs for SMTP acceptance or errors. No automatic retries are used because a timeout may occur after Gmail accepted a message; batch sending continues after individual failures.

For authentication failures check the account, App Password and 2-Step Verification. For timeouts check internet access and outbound TCP 587 (including the presentation network). Successful SMTP acceptance is not a guarantee of inbox placement.

CLIENT_HOST determines confirmation/reset links. localhost works only on the computer running the frontend. For another device, set CLIENT_HOST to an accessible frontend address and configure frontend binding/network access accordingly.

## Templates
Edit apps/workffice-backend/src/main/resources/email/*.html. Placeholders use {{variable_name}} and dynamic values are escaped as text. News body line breaks are preserved; HTML entered by a user is not executed. Payment amounts retain the backend formatting and do not assume a currency.

## Delivery notes
The source was migrated from the uploaded Resend version. Existing non-email application code is retained. Build output, dependencies, Git metadata and macOS metadata are omitted from the delivery ZIP. Reinstall dependencies and rebuild. The former Resend API key was removed from the configuration; revoke it if no longer needed.
