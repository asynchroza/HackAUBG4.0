import pandas as pd
from pymongo import MongoClient
import config

mc = MongoClient(config.MONGO_URI)
db = mc['mock-interviews']

df = pd.read_csv("mockInterviews.csv", header=1)

questions = []
tags = set()
np_arr = df.to_numpy()

for row in np_arr:
    q = {'question': row[0], 'answer': row[1], 'tags': row[2].split(',')}
    questions.append(q)
    for t in row[2].split(','):
        tags.add(t)
    db['questions'].insert_one(q)


for t in list(tags):
    db['tags'].insert_one({'tag': t})
