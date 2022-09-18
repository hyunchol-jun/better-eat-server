# BetterEat Backend

BetterEat is a web application that helps users to cook more and eat healther by suggesting new recipes based on their diets and/or food preferences. Users can manage thier meal plans with stored information such as recipes, inventory and grocery lists.

This repo is the back-end server providing API endpoints to the front-end web application and is still in development.

## Endpoints
- `GET /users`
- `POST /signup`
- `POST /login`

### `GET /users`
- Returns all the users
- Returns an error message on server error
- Requires Bearer token in authorization header

#### Response body example
```json
[
    {
        "id": 1,
        "name": "Chol",
        "email": "chol@example.com",
    },
    {
        "id": 2,
        "name": "Yeri",
        "email": "yeri@example.com",
    },
    {
        "id": 3,
        "name": "Ina",
        "email": "ina@example.com",
    }
]
```

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