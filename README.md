# Flashcard Popup - Chrome Extension
Simple Chrome extension that takes Quizlet URL, parses the flashcards into a JSON file, and send to the front end. Front end will store decks of flashcards in Chrome's local storage and pull a card randomly in a selected deck for users to review.

The goal is to make reviewing easier without allocating a separate session. Users will be asked to provide answers to flashcards in the deck that they choose periodically when they're using Chrome.

### todos
- [ ] support multiple quizlets in storage
- [ ] more scientific reviewing method - spaced repetition etc.  
- [ ] translate backend to cloud serverless functions   

### Completed 
- [x] backend Quizlet Scrapper  
- [x] backend-frontend communication  
- [x] basic HTML/CSS frontend  
- [x] loop reviewAlgorithm   
- [x] options page to store/switch between quizlets and set due dates for quizlet 
