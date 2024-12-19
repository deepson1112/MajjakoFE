# Chowchow Express

Chowchow Express is an online ordering multi-vendor application.
Chowchow Express is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development Mode

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Mode

Process to run the production server:

```bash
npm run build
# finally
npm start
```

Above Build Command will run as

1. npm run cacheHandle :- This will remove previous build cache
2. npm run postBuild :- This will remove previously generate sw.js and sw.js.map files
3. next build :- This will build our project successfully.
   Open [https://chowchow.mydvls.com](https://chowchow.mydvls.com) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Important Note

Before pushing your changes to the server, ensure you have run the production build process at least once in development

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
