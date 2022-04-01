import config
from fastapi import FastAPI
import uvicorn

PORT = config.PORT
HOST = config.HOST

app = FastAPI()


@app.get('/')
async def root():
    return {"message": "test"}

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
