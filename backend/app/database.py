from __future__ import annotations

from dataclasses import dataclass
from typing import Any

import httpx

from app.config import get_settings


@dataclass(slots=True)
class SupabaseClient:
    base_url: str
    api_key: str
    _client: httpx.Client

    def headers(self) -> dict[str, str]:
        return {
            "apikey": self.api_key,
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    def get(self, path: str, params: dict[str, Any] | None = None) -> httpx.Response:
        return self._client.get(path, params=params, headers=self.headers())

    def post(self, path: str, json: dict[str, Any]) -> httpx.Response:
        return self._client.post(path, json=json, headers=self.headers())

    def patch(self, path: str, json: dict[str, Any]) -> httpx.Response:
        return self._client.patch(path, json=json, headers=self.headers())

    def close(self) -> None:
        self._client.close()


_supabase_client: SupabaseClient | None = None


def get_supabase_client() -> SupabaseClient:
    global _supabase_client

    if _supabase_client is None:
        settings = get_settings()
        base_url = str(settings.supabase_url).rstrip("/")
        _supabase_client = SupabaseClient(
            base_url=base_url,
            api_key=settings.supabase_key,
            _client=httpx.Client(base_url=base_url),
        )

    return _supabase_client
