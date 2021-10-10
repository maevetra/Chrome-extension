$(document).ready(function() {
    var currCard;
    var buttonPressed = false;
    var correct = false;
    chrome.runtime.onMessage.addListener((request, sender, sendReponse) => {
        currCard = request.message;
        $('#definition').html(currCard.definition);
        //waitForIt();
        //sendReponse(correct);
        //return true; 
    });

    function waitForIt(){
        if(!buttonPressed){
            setTimeout(buttonPressed, 2500);
        }
    }

    $('#wordsubmit').click(function() {
        $('input').prop('disabled', true);
        var word = $('#word').val();
        if(word == currCard.word) {
            correct = true;
            $(".flashcard").css("background-color", "green");
            $('#rightwrong').html( "You got it right, congrats!");
        } else {
            $(".flashcard").css("background-color", "red");
            $('#rightwrong').html( "Sorry, the correct answer is " + currCard.word);

        }
    })
})