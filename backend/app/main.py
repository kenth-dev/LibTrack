from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routers.books import router as books_router
from app.routers.requests import router as requests_router

app = FastAPI(title="LibTrack API", version="0.1.0")

settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.cors_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books_router)
app.include_router(requests_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
