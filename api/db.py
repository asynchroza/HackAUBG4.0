import config
from pymongo import MongoClient

mc = MongoClient(config.MONGO_URI)
db = mc['mock-interviews']


def generate_db():
    # db['questions'].insert_one(
    #     {'question': 'Sort an array', 'answer': 'Use bogo sort'})
    for q in db['questions'].find({}):
        print(q)


def find_login(token):
    user = db['users'].find_one({'token': token})
    if user:
        return 200
    db['users'].insert_one({'token': token})
    return 201
