from quizletScrapper.quizlet_scrapper import *
from quizletScrapper.classes import *
import requests
import json

def main(URL):
    my_headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': '*/*',
        'Connection': 'keep-alive'
    }

#URL = 'https://quizlet.com/430504755/jenney-ch-1-2-red-jenny-red-3-flash-cards/'

# request = requests.get(URL)
    page = requests.get(URL.replace(u'\ufeff', ''), headers=my_headers)
# print(page.text)


    deck_towrite = getTerms(page)
    with open('Quizlet.json', 'w') as outfile:
        json.dump(deck_towrite, outfile)
    return deck_towrite
"""""
# Create a workbook and add a worksheet
    workbook = xlsxwriter.Workbook("Quizlet.xlsx")
    worksheet = workbook.add_worksheet()

    row = 0
    col = 0

# write card to each row in worksheet

    for card in term_list:
        to_write['term'].append({
            'word': flashCard.get_word(card),
            'definition': flashCard.get_definition(card)
        })
        worksheet.write(row, col, flashCard.get_word(card))
        worksheet.write(row, col + 1, flashCard.get_definition(card))
        row += 1

    with open('Quizlet.json', 'w') as outfile:
        json.dump(to_write, outfile)
    workbook.close()
"""

    

