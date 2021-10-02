function displayDef(flashcard){
    document.getElementById("definition").innerHTML = flashcard.definition;
}

chrome.runtime.onMessage.addListener((request, sender, sendReponse) => {
    displayDef(request.message);
    return true; 
})
