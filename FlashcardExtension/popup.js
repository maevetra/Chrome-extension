$(function(){

    $('#quizletsubmit').click(function(){

        var quizlet_URL = $('#quizletURL').val();
        if(quizlet_URL){
            chrome.runtime.sendMessage(
                        {type: 'set-URL', message: quizlet_URL},
                        (response) => {
                            var notif = {
                                type: 'basic',
                                iconUrl: 'icon48.png',
                                title: 'Flashcard PopUp',
                                message: 'A new review session has started!'
                            }
                            chrome.notifications.create(notif);
                        }
                        );
        }

        $('#quizletURL').val('');
    });
});