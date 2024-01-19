TODO:
pagination

wrap the app with the theme ONCE, and pass it down to all the components that need it.

[]: # Path: README.md

Nav-bar:

- [] Home
- [] favorites
- [] login/logout
- [] search all

"/" home page
"select a blog to begin" is default. no recipes show.
"vertical list of butons for blog entry"

wrapper around list view and detail view:

- tab1: author list
- breadcrumb? author -> category -> recipe

"/blogs/[author]/[category]"

- tab2: category list

"/recipes/[id]"
OR
"/recipes/[author]/[slug]" (for human readability. slugs arent unique, but they should be unique per author.)

list view
detail view
