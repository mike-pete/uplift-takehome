"""Main GraphQL schema file. Only one for this project."""

import strawberry

from .graphql import schema as main_schema


@strawberry.type
class Query(main_schema.Query):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    """Query wrapper for all queries."""


@strawberry.type
class Mutation(main_schema.Mutation):
    # This class will inherit from multiple Mutations
    # as we begin to add more apps to our project
    """Mutation wrapper for all mutations."""


schema = strawberry.Schema(query=Query, mutation=Mutation)
