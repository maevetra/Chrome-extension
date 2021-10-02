from bs4 import BeautifulSoup
from quizletScrapper.classes import *


def getTerms(page):
    soup = BeautifulSoup(page.text, 'html.parser')
    quizlet_title = soup.find('h1', {'class': 'UIHeading UIHeading--one'}).string
    terms = soup.find_all('div', {'class': 'SetPageTerm-content'})
    deck = {quizlet_title : []}
    for i in terms:
        a = i.find('a', {'class': 'SetPageTerm-wordText'})
        word_text = a.contents[0].string
        
        b = i.find('a', {'class': 'SetPageTerm-definitionText'})
        definition_text = b.contents[0].string
        

        #current_term = flashCard(word_text, definition_text)
        deck[quizlet_title].append({
          'word': word_text,
          'definition': definition_text
        })
    
    return deck