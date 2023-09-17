## Features to implement
    * Implemented search
        -search by prompt,
        -by tag
        -by by username
        -used _debounce from lodash library

    -> Implement Click on tag method
    -> Implement View other profiles
    -> Toggle theme
##  ways to optimize the feed component:

    * Implement pagination or infinite scrolling. Rather than loading all posts at once, load a page of posts and add a "load more" button. This improves initial load performance and user experience on larger datasets.

    *  Memoize filteredPosts. The filter operation happens on every render even if searchText hasn't changed. You can memoize filteredPosts  using useMemo to avoid unnecessary re-filters.

    *Add keys to mapped elements. Add a unique key prop to the PromptCard component to avoid unnecessary re-renders from React.

    * Consider server-side rendering. For initial page load, fetch posts data on the server and render markup for better performance. Hydrate on client.

 ## General UI tweaks

    * Consider skeleton/ShimmerUI for data fetching

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


