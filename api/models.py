from pydantic import BaseModel

class InterviewRequest(BaseModel):
    str: str
    user_token: str
    number: int
