import requests
import random
import config
from bs4 import BeautifulSoup
from pymongo import MongoClient

mc = MongoClient(config.MONGO_URI)
db = mc['mock-interviews']

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0'
}

# check link or string
def isLink(str):
    return str.startswith('http')

# Download the URL into data
def downloadText(url):
    try:
        r = requests.get(url, headers=headers)
    except requests.exceptions.HTTPError as err:
        raise SystemExit(err)
    data = r.text
    return data

# Parse role from the input window on the LinkedIn page
def parseRole(page):
    soup = BeautifulSoup(page, "html.parser")
    soup_tags = soup.find_all('input')
    for tag in soup_tags:
        if tag.has_attr('name'):
            if tag['name'] == 'keywords':
                return tag['value']

# Get questions from the db by tag
def get_questions_by_tag(tag):
    all_questions = db['questions'].find({})
    questions_by_tag = []
    for document in all_questions:
        if tag in document['tags']:
            questions_by_tag.append(document)

    return questions_by_tag

# Get random sample of the questions
def get_random_sample(questions, number):
    question_sample = []
    indexes = random.sample(range(1, len(questions)), number)
    for index in indexes:
        question_sample.append(questions[index]['question'])

    return question_sample

# Get core tag for the role
def get_core_tag(role):
    all_tags = db['tags'].find({})
    tag_names = []
    for tag in all_tags:
        if tag['tag'] not in tag_names:
            tag_names.append(tag['tag'])
    for tag_name in tag_names:
        if tag_name.lower() in role.lower():
            return tag_name