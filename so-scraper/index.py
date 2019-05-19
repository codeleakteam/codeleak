import requests
import re 
from bs4 import BeautifulSoup

def main():
    url = "https://stackoverflow.com/questions/tagged/reactjs"

    res = requests.get(url)
    status_code = int(res.status_code)

    if status_code != 200:
        status_code = str(status_code)
        print("SO status code is not 200. Status code: {status_code}".format(status_code))
        return 

    soup = BeautifulSoup(res.content, 'html.parser')    
    questions = soup.find_all('div', class_='question-summary')

    # user profile urls we're going to crawl
    user_urls = []

    # finding question authors 
    for q in questions:
        # /users/8107977/imsaiful
        user_profile_route = q.select('.user-details a')[0].get('href')
        full_user_url = 'https://stackoverflow.com{}'.format(user_profile_route)
        user_urls.append(full_user_url)

    # crawling users
    for user_url in user_urls:
        res = requests.get(user_url)
        status_code = int(res.status_code)

        if status_code != 200:
            status_code = str(status_code)
            print("User profile GET status code is not 200. Status code: {status_code}".format(status_code))
            continue 
        
        soup = BeautifulSoup(res.content, 'html.parser')    
        about_html = soup.select('.profile-user--about')

        # multiple emails could occur in one bio
        user_emails = re.findall(r'[a-z0-9]+@[a-z]+\.[a-z]+',str(about_html))
        print("User emails: ", user_emails)

main()