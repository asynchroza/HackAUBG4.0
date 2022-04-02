from multiprocessing.dummy import Array
from numpy import array
from pydantic import BaseModel
from datetime import datetime


class InterviewRequest(BaseModel):
    number: int
    str: str
    user_token: str


class AnswerRequest(BaseModel):
    interview_set: list = []
    start: str
    end: str
    u_token: str
    uuid: str
