# Movie Finder API

A small Express server that searches for movies and shows movie details. It doesn't store any data itself. It asks the free [OMDb API](http://www.omdbapi.com/) for the info and sends the results back as JSON.

Built for the Module 12 SBA: Build a RESTful Server.

## Tech Used

- Node.js
- Express
- axios (calls the OMDb API)
- dotenv (keeps the API key out of the code)

## Project Structure

```
movie-finder-api/
├── server.js                  # starts the app and mounts the routes at /api
├── routes/
│   └── movieRoutes.js         # which URL uses which controller function
├── controllers/
│   └── movieController.js     # searchMovies and getMovieDetails
├── .env                       # OMDB_API_KEY (not on GitHub)
└── .gitignore                 # ignores node_modules/ and .env
```

## Setup

1. Clone the repo and install the packages:
   ```bash
   npm install
   ```
2. Get a free API key at http://www.omdbapi.com/apikey.aspx.
3. Make a `.env` file in the main folder:
   ```
   OMDB_API_KEY=your_key_here
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   The server runs at `http://localhost:3001`.

## Endpoints

### Search for movies

`GET /api/search?title=batman`

Returns a list of movies that match the title.

If `title` is missing, the response is a `400` error:

```json
{ "error": "Title query parameter is required" }
```

### Get one movie's details

`GET /api/movies/:id`

Use the movie's IMDb ID. For example, `GET /api/movies/tt0372784` returns the details for Batman Begins.

### Errors

If OMDb can't be reached or sends back an error, the server responds with an error status and a JSON message instead of crashing.

## What I Struggled With

- **Folder roles.** At first I put routes in `server.js` and called the controller from there. I learned that `server.js` only starts the app and plugs in the router, the routes file only connects URLs to functions, and the controller does the actual work.
- **Mounting routes.** I mounted the router at `/api/search` and `/api/movieRoutes` before I understood that the router gets mounted once at `/api`, and its own paths (`/search`, `/movies/:id`) get added after that.
- **Passing a function vs. calling it.** In my routes I wrapped things in `(req, res) => { ... }` and used `res.body`. The fix was to just hand the router the function's name, like `router.get('/search', searchMovies)`.
- **`import` and `export`.** I mixed `require` with `import`, forgot `.js` in paths, and used `{ }` on a default export. Now I know: `export default` is imported without `{ }`, and `export const` is imported with `{ }`.
- **`req.query` vs. `req.params` vs. `req.body`.** The search title comes from `req.query` (after the `?`), the movie ID comes from `req.params` (the `:id` part), and `req.body` is only for data sent in a POST or PUT.
- **Variables.** I wrote `const req.query.title =` backwards. The name I'm making goes on the left, and where the value comes from goes on the right: `const title = req.query.title`.
- **axios params.** The search term goes inside `params`, and OMDb wants the labels `s` for search and `i` for an ID.
- **Code order.** I put my 400 check at the bottom of the function. Code runs top to bottom, so the check has to come before the API call.
- **The API key.** My routes all returned errors because I first put my MongoDB connection string in `OMDB_API_KEY`, then the whole link from the OMDb email. The key is only the short code after `apikey=`. I also learned to restart the server after changing `.env`.
- **npm setup.** I accidentally installed a package called `install` and had `"type": "commonjs"`, which broke `import`. I fixed it by removing the extra package and setting `"type": "module"`.
