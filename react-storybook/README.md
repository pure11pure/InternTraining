#### Start [https://youtu.be/PvHpWtRZuEw?si=i4xAY-gLoHy0n4cO],[https://mikelopster.dev/posts/react-storybook]

#### 1.

```npm create vite@latest my-storybook-app -- --template react
npm install
npm run dev
```

#### 2.

    npx storybook@latest init

    npm run storybook

- [https://storybook.js.org/docs/get-started/frameworks/react-vite?renderer=react]

#### 3.

    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

    /** @type {import('tailwindcss').Config} */
    export default {
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
            ],
            theme: {
                extend: {},
                },
                plugins: [],
                }
`* สไตล์ของ tailwind ไม่กระจายไปที่ storyook`