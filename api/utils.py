import requests
from bs4 import BeautifulSoup

url = "https://www.linkedin.com/jobs/search/?geoId=105333783&keywords=junior%20.net%20developer&location=Bulgaria"
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0'
}

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