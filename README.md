# BetterEat Backend

BetterEat is a web application that helps users to cook more and eat healther by suggesting new recipes based on their diets and/or food preferences. Users can also manage thier meal plans with stored information such as recipes, inventory and grocery lists.

This repo is the back-end server providing API endpoints to the front-end web application. This back-end server is deployed at https://better-eat-server.herokuapp.com/.

You can visit the live website at http://better-eat.hyuncholjun.com

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

### `POST /users/recipes`
- Sets a recipe to the user
- Sends back error message if the user already saved the recipe

#### Response body example
```json
{
  "success": true,
  "message": "Successfully logged in."
```
