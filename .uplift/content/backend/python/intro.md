## Backend challenge: Python

**TL;DR (but please, read on): backend version of the frontend card game.**
Use Django (v4+), strawberry, and a PostgreSQL database.

You should implement your own database architecture (models) and your own GraphQL schema.

There's no requirement to implement authentication. You can fake it at the middleware level, or log in to the Django admin and send subsequent requests with the session information set by Django. However, clean implementations of session/auth/login earn bonus points!

You can run a sample query at [localhost:8000/graphql/](http://localhost:8000/graphql/)

```graphql
query {
  me {
    username
    email
  }
}
```
