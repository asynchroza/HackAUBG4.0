from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
import uvicorn
import db
from utils import *
from models import *

CORE_QS_PROP = 0.8
REST_QS_PROP = 0.2

mc = MongoClient(config.MONGO_URI)
db = mc['mock-interviews']


PORT = config.PORT
HOST = config.HOST

app = FastAPI()


@app.get('/')
async def root():
    db.generate_db()
    return {"message": "meow"}

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

    return JSONResponse(status_code=status.HTTP_200_OK, content={"interview_set": interview_set})


@app.post('/login/{token}')
async def check_login(token):
    code = db.find_login(token)
    if code == 200:
        return JSONResponse(status_code=status.HTTP_200_OK, content={})
    elif code == 201:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={})

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
