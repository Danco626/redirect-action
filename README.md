## Configuring the Application
1. Create a sample application in Auth0 to represent the sample application
2. Add http://localhost:3000/callback to the Allowed Callback URLs
3. Add http://localhost:3000 to the Allowed Logout URLs
4. Enable both authrorization code and client credentials grant types under applications > advanced settings > grant types
5. Navigate to APIs > Auth0 Management API > Machine to Machine Applications
6. Find the application created in step 1 and authorize it to use the management API and enable the *update:users* scope
7. Add the applications client id, secret, and domain to the .env file in the sample application
8. Create 3 post-login actions and deploy them in the following order. Actions can be found in the actions directory
    - **Redirect1** - handles a redirect to /redirect/firstredirect and adds a custom claim with the verified email status
    - **Redirect2** - handles a redirect to /redirect/secondredirect
    - **Redirect3** - handles a redirect to /redirect/thirdredirect

## Running the Application

Install the dependencies.

```bash
npm install
```

Rename `.env.example` to `.env` and replace the values for `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, and `AUTH0_CLIENT_SECRET` with your Auth0 credentials. If you don't yet have an Auth0 account, [sign up](https://auth0.com/signup) for free.

```bash
# copy configuration and replace with your own
cp .env.example .env
```

If you're using a hosting provider that uses a proxy in front of Node.js, comment in the `trust proxy` configuration in [app.js](https://github.com/auth0-samples/auth0-nodejs-webapp-sample/blob/812bb41fa655a1178f6a33ba54b0aee2397b1917/01-Login/app.js#L63-L70). This is a [`express-session` configuration setting](https://www.npmjs.com/package/express-session#cookiesecure) that allows for trusting this first proxy.

Run the app.

```bash
npm start
```

The app will be served at `localhost:3000`.

## Using the Application
1. After configuring the application in Auth0, login to the sample app
2. This application has 3 redirect endpoints that will run in order
3. The redirect routes display both a **Resend Email** button and **Continue** link that redirects back into the authentication flow.

## Primary Code
1. ./routes/auth.js has the authentication logic
2. ./routes/redirect.js has the redirect action and resent email logic 