import pandas as pd
from pymongo import MongoClient
import config

mc = MongoClient(config.MONGO_URI)
db = mc['mock-interviews']

df = pd.read_csv("mockInterviews.csv", header=1)

questions = []
tags = {}
np_arr = df.to_numpy()

for row in np_arr:
    questions.append(
        {'question': row[0], 'answer': row[1], 'tags': row[2].split(',')})
    for t in row[2].split(','):
        tags.add(t)

for q in questions:
    db['questions'].insert_one(q)
