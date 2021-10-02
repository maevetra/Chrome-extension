class flashCard:
    def __init__(self, word, definition):
        self.word = word
        self.definition = definition

    def print_card(self):
        print(f'*{self.word} -- {self.definition}')

    def get_word(self):
        return self.word

    def get_definition(self):
        return self.definition

