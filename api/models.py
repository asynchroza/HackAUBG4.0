from multiprocessing.dummy import Array
from numpy import array
from pydantic import BaseModel
from datetime import datetime


class InterviewRequest(BaseModel):
    str: str
    user_token: str
    number: int


class AnswerRequest(BaseModel):
    interview_set: list = []
    start: str
    end: str
    u_token: str
    uuid: str
