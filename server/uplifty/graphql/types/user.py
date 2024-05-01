"""User GraphQL types."""

import strawberry
from django.contrib.auth.models import User as UserModel
from strawberry import relay
from strawberry.types import Info

import strawberry_django


@strawberry_django.type(UserModel)
class User(relay.Node):
    """GraphQL type for the User model."""

    id: relay.GlobalID
    username: str

    @strawberry.field
    async def email(root, info: Info) -> str:
        """Keep email private except if you're the current user."""
        user = info.context.request.user
        if user == root:
            return root.email

        return ""
