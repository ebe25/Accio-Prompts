## Features to implement

    -> Toggle theme

## Implemented

     * Implemented search
        -search by prompt,
        -by tag
        -by by username
        -used _debounce from lodash library
    * Implemented Click on tag method but needs reload after
    * Implemented  View other profiles/ by clicking their prompts on /
    * Used a Loader, instead of shimmer

## Ways to optimize the feed component:

    * Implement pagination or infinite scrolling. Rather than loading all posts at once, load a page of posts and add a "load more" button. This improves initial load performance and user experience on larger datasets.

## General UI tweaks

    * Consider skeleton/ShimmerUI for data fetching

## API Endpoints

    * "/user/[id]/posts"  -> Gets the user specific posts
    * "/api/prompt/[id]"   -> Gets ID specific prompt, from del/edit purposes
    * "/api/prompt"        -> Gets all the prompts, from the DB
    * "/api/prompt/new"    -> Posts/Creates prompt, tags to the DB
