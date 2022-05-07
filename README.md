# SolvePy

A web-based tool to help developers fix their python code in a snap.
The tool is developed with the help of OpenAI. Very easy to use and flexible. Just enter the buggy code and we will fix it for you

## Getting Started

You need to create .env.local in your project directory to start this app.
This App uses OpenAI API so you need to add your API key in .env.local file as follows =>
`OPENAI_API_KEY=YOUR_KEY`

Then, run the following commands:

```bash
npm install

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

OpenAI route API can be accessed on [http://localhost:3000/api/openai](http://localhost:3000/api/openai). This endpoint can be edited in `pages/api/openai.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about this project you can contact us on our email <a href="mailto:nexus.org@protonmail.com">nexus.org@protonmail.com</a>

## Deployment

This app is deployed and running on vercel. Here is the link to our app => [SolvePy](https://solve-py.vercel.app/)
