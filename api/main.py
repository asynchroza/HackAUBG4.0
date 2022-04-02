from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import config
from utils import *
from models import *
import json
from bson import json_util

CORE_QS_PROP = 0.8
REST_QS_PROP = 0.2

PORT = config.PORT
HOST = config.HOST

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def parse_json(data):
    return json.loads(json_util.dumps(data))


@app.get('/get-interview/')
async def get_interview_set(int_req: InterviewRequest):
    i_url = int_req.str
    n_q = int_req.number
    core_qs = int(n_q * CORE_QS_PROP)
    rest_qs = int(n_q * REST_QS_PROP)

    if isLink(i_url):
        page_content = downloadText(i_url)
        role = parseRole(page_content)
    else:
        role = i_url
    tags = ['database', 'general']
    core_tag = get_core_tag(role)
    interview_set = []

    for tag in tags:
        rest_sample = get_random_sample(get_questions_by_tag(tag), rest_qs)
        for question in rest_sample:
            interview_set.append(question)

    core_sample = get_random_sample(get_questions_by_tag(core_tag), core_qs)
    for question in core_sample:
        interview_set.append(question)

    db.add_interview(interview_set, int_req.user_token)

    return JSONResponse(status_code=status.HTTP_200_OK, content=parse_json({"interview_set": interview_set}))


@app.post('/login/{token}')
async def check_login(token):
    code = db.find_login(token)
    if code == 200:
        return JSONResponse(status_code=status.HTTP_200_OK, content={})
    elif code == 201:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={})

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
