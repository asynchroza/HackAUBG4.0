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
    return db['questions'].find({}, {'_id': 0})


def get_interview_user_token(user_token):
    return db['user_answers'].find_one({"u_token": user_token}, {'_id': 0})


def get_interview_uuid(uuid):
    return db['interviews'].find_one({"uuid": uuid}, {'_id': 0})


def update_interview(uuid, intv):
    db['interviews'].find_one_and_replace({'uuid': uuid}, intv)


def add_interview(interview):
    return db['interviews'].insert_one(interview)


def add_user_answers(interview):
    return db['user_answers'].insert_one(interview)


def get_user_answers_token(user_token):
    return db['user_answers'].find({"u_token": user_token}, {'_id': 0})


def get_user_answers_uuid(uuid):
    return db['user_answers'].find_one({"uuid": uuid}, {'_id': 0})