"""GraphQL schema specific to this app."""

from typing import Optional

import strawberry
from strawberry.types import Info

import strawberry_django

from .types.logout_user import logout_user_mutation
from .types.user import User


@strawberry.type
class Query:
    """Queries specific to uplifty app."""

    @strawberry_django.field
    def me(self, info: Info) -> Optional[User]:
        user = info.context.request.user
        if user and user.is_anonymous:
            return None

        return user


@strawberry.type
class Mutation:
    """Mutations specific to uplifty app."""

    logout_user = logout_user_mutation
