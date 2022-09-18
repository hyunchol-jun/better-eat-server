# BetterEat Backend

BetterEat is a web application that helps users to cook more and eat healther by suggesting new recipes based on their diets and/or food preferences. Users can manage thier meal plans with stored information such as recipes, inventory and grocery lists.

This repo is the back-end server providing API endpoints to the front-end web application and is still in development.

## Endpoints
- `GET /users`


### `GET /users`
- Returns all the users
- Returns an error message on server error

#### Response body example
```json
[
    {
        "id": 1,
        "name": "Chol",
        "email": "chol@example.com",
        "password": "password",
        "created_at": "2022-09-18T00:05:25.000Z",
        "updated_at": "2022-09-18T00:05:25.000Z"
    },
    {
        "id": 2,
        "name": "Yeri",
        "email": "yeri@example.com",
        "password": "password",
        "created_at": "2022-09-18T00:05:25.000Z",
        "updated_at": "2022-09-18T00:05:25.000Z"
    },
    {
        "id": 3,
        "name": "Ina",
        "email": "ina@example.com",
        "password": "password",
        "created_at": "2022-09-18T00:05:25.000Z",
        "updated_at": "2022-09-18T00:05:25.000Z"
    }
]
```
