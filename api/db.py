import config
from pymongo import MongoClient

mc = MongoClient(config.MONGO_URI)
db = mc['mock-interviews']

def find_login(token):
    user = db['users'].find_one({'token': token})
    if user:
        return 200
    db['users'].insert_one({'token': token})
    return 201

def find_tags():
    return db['tags'].find({})

def find_questions():
    return db['questions'].find({})

def add_interview(interview_set, token):
    db['interviews'].insert_one({'interview_set': interview_set, 'token': token})

