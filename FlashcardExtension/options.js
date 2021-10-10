//in page cache of all available quizlet sets
const allKeys = [];
const initKeys = getAllKeys().then(items => {
    Object.assign(allKeys, Object.keys(items));
    console.log(allKeys[0]);
}).then(() => {
    for (let index = 0; index < allKeys.length; index++) {
        const element = allKeys[index];
        $('#quizletSelect').append($('<option>', {
            value: element,
            text: element
        }));
    }
});

function getAllKeys(){
    return new Promise((resolve, reject) => {
        // Asynchronously fetch all data from storage.sync.
        chrome.storage.sync.get(null, (items) => {
        // Pass any observed errors down the promise chain.
        if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
        }
        resolve(items);
        });
    });
}


$(function(){
    
    

    $('#repeatSave').click(function(){
        
        var repeat = $('#repeatInput').val();
        if(repeat){
            chrome.runtime.sendMessage(
                {type: "create-alarm",
                    message: repeat}
            );
        }

        $('#repeatInput').val('');
    })

    
})