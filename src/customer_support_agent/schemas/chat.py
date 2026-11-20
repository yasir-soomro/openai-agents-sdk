


from pydantic import BaseModel, ConfigDict, Field


class ChatRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    message: str = Field(
        min_length=1,
        max_length=1000,
        description="Customer message",
    )


class ChatResponse(BaseModel):
    response: str
