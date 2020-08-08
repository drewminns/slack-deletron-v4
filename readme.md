# Slack Deletron V4

Uses Vercel Serverless functions

To run locally, install Vercel CLI globally with `npm i vercel -g`. Next in the root directory, run `vercel dev` and the project will be available on localhost:3000.

Current endpoints include

- `api/auth/login`
- `api/auth/redirect`
- `api/user/profile`
- `api/user/userdetails`

To setup Slack oauth locally, install Ngrok and proxy your local port `./ngrok http 3000`.
Take the URL given and set that url as the REDIRECT_URI in Vercel with `api/auth/redirect` as the path.
Next, in slack, set the same url as the redirect URL.

Next, have a party

Updating soon.
