from pydantic import BaseModel

class InterviewRequest(BaseModel):
    str: str
    number: int