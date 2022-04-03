from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import config
from utils import *
from models import *
from datetime import datetime
from gensim.models.doc2vec import Doc2Vec
from scipy import spatial
import uuid
from math import floor

CORE_QS_PROP = 0.8
REST_QS_PROP = 0.2

PORT = config.PORT
HOST = config.HOST

origins = [
    "http://localhost",
    "http://localhost:3000",
]


model = Doc2Vec.load('./enwiki_dbow/doc2vec.bin')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/get-score/')
async def get_score(ans_req: AnswerRequest):
    d_answers = db.get_interview_uuid(ans_req.uuid)['interview_set']
    for i, q in enumerate(ans_req.interview_set):
        vu = model.infer_vector(q['answer'].split())
        vq = model.infer_vector(d_answers[i]['answer'].split())
        score = floor((1 - spatial.distance.cosine(vq, vu))*100)
        score = 0 if score < 0 else score
        q['score'] = score
    ans_req.end = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
    db.add_user_answers(dict(ans_req))
    return JSONResponse(status_code=status.HTTP_200_OK, content=dict(ans_req))


@app.get('/get-interview-user/{user_token}')
async def get_interview_user_token(user_token):
    interview = db.get_interview_user_token(user_token)
    return JSONResponse(status_code=status.HTTP_200_OK, content=interview)


@app.get('/get-interview/{uuid}')
async def get_interview_uuid(uuid):
    interview = db.get_interview_uuid(uuid)
    print(interview)
    return JSONResponse(status_code=status.HTTP_200_OK, content=interview)


@ app.post('/get-interview/')
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

    core_qs = n_q-len(tags*rest_qs)
    core_tag = get_core_tag(role)
    interview_set = []

    for tag in tags:
        rest_sample = get_random_sample(get_questions_by_tag(tag), rest_qs)
        for question in rest_sample:
            question["score"] = 0
            interview_set.append(question)

    core_sample = get_random_sample(get_questions_by_tag(core_tag), core_qs)
    for question in core_sample:
        question["score"] = 0
        interview_set.append(question)
    now = datetime.now()
    interview = {'interview_set': interview_set, 'start': now.strftime(
        "%m/%d/%Y, %H:%M:%S"), 'end': now.strftime("%m/%d/%Y, %H:%M:%S"), 'u_token': int_req.user_token, 'uuid': str(uuid.uuid1())}

    db.add_interview(interview)
    interview['_id'] = 0

    return JSONResponse(status_code=status.HTTP_200_OK, content=interview)


@ app.post('/login/{token}')
async def check_login(token):
    code = db.find_login(token)
    if code == 200:
        return JSONResponse(status_code=status.HTTP_200_OK, content={})
    elif code == 201:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={})

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
