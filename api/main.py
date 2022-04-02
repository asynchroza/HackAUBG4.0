import config
from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
import uvicorn

import db

PORT = config.PORT
HOST = config.HOST

app = FastAPI()


@app.get('/')
async def root():
    db.generate_db()
    return {"message": "meow"}


@app.post('/login/{token}')
async def check_login(token):
    code = db.find_login(token)
    if code == 200:
        return JSONResponse(status_code=status.HTTP_200_OK, content={})
    elif code == 201:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={})

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
