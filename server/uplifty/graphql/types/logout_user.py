"""Logout mutation."""

from typing import Optional

import strawberry
from django.contrib.auth import logout
from strawberry.types import Info


@strawberry.type
class LogoutUserMutationResponse:
    success: bool
    message: Optional[str] = None


@strawberry.mutation(description="Authentication mutation, logs out user.")
async def logout_user_mutation(root, info: Info) -> LogoutUserMutationResponse:
    logout(info.context.request)
    return LogoutUserMutationResponse(success=True)
