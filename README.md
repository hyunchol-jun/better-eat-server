# BetterEat Backend

BetterEat is a web application that helps users to cook more and eat healthier by suggesting recipes based on their food preference. Users can also manage their meal plans with stored information such as recipes, inventory and grocery lists.

You can visit the live website at http://better-eat.hyuncholjun.com/.

This repo is the back-end server providing API endpoints to the front-end web application. This back-end server is deployed at https://better-eat-server.herokuapp.com/.

If you want to try in the local server, you can download the project and run:

### `npm start`

## Tech stack
- node
- express.js
- MySQL
- Knex.js
- JWT
- bcrypt

## Endpoints
- `POST /signup`
- `POST /login`
- `POST /users/recipes`
- `GET /users/recipes`
- `GET /users/recipes/:recipeId`
- `DELETE /users/recipes/:recipeId`
- `POST /users/groceries`
- `GET /users/groceries`
- `DELETE /users/groceries`
- `GET /users/checkRecipes/:recipeId`


### `POST /signup`
- Returns boolean success and message
- Fails if atempted with duplicate email

#### Response body example
```json
{
  "success": "true",
  "message": "Successfully signed up."
}
```

```json
{
  "success": false,
  "message": "This email is already taken. Try with a different one."
}
```

### `POST /login`
- Returns token if successfully logged in

#### Response body example
```json
{
  "success": true,
  "message": "Successfully logged in.",
  "token": "e14dGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob2w0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjYzNTE0OTU5fQ.vsrKEdfe98L_TbCawlPN_LWV0VeZc5PIr9z4ESSvizk"
}
```

### After logged in, all the subsequent requests require the token in the authorization header.

#### Request header example
```json
{
  "Authorization": "Bearer e14dGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob2w0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjYzNTE0OTU5fQ.vsrKEdfe98L_TbCawlPN_LWV0VeZc5PIr9z4ESSvizk"
}
```

### `POST /users/recipes`
- Sets a recipe to the user
- Sends back error message if the user already saved the recipe

### `GET /users/recipes`
- Gets all recipes that the user has saved

### `GET /users/recipes/:recipeId`
- Gets one recipe from the user by the recipe ID
- Returns 404 if not found

### `DELETE /users/recipes/:recipeId`
- Remove a recipe from the user's account by the recipe ID

### `POST /users/groceries`
- Sets a grocery item to the user by the item name
- Returns 400 if it's a duplicate item

### `GET /users/groceries`
- Gets all the grocery items of the user

### `DELETE /users/groceries`
- Deletes one grocery item from the user

### `GET /users/checkRecipes/:recipeId`
- Check if the user has the recipe saved with the recipe ID
- Returns 1 if the user has saved it, 0 if not
