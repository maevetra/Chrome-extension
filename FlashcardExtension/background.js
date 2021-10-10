var serverhost = 'http://127.0.0.1:8000';
var currentQuizlet;
var repeat = 15; //default value of repeatAlarm
const readLocalStorage = async function(key) {
	return new Promise((resolve, reject) => {
	  try {
		chrome.storage.sync.get(key, function(value) {
		  resolve(value);
		});
	  } catch (ex) {
		reject(ex);
	  }
	});
};
const deck = [];
const initDeck = getDeck().then(result => {
	Object.assign(deck, result[0]);
});

var session = false;

	/* Background listener to receive message from popup, 
	*  will repsond async
	*/
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			if(request.type == 'set-URL') {
            	var url = serverhost + '/quizletScrapper/get_Quizlet/?topic='+ (request.message);
				console.log(url);
				
				fetch(url)
				.then(response => response.json())
				.then(sendResponse(true)) //send back to popup
				.then(response => {
					chrome.storage.sync.set(response, 
						function() {
							console.log('Set storage successful');
						});
					currentQuizlet = Object.keys(response)[0];
					console.log(currentQuizlet);
				})
				.then(function(){
					//wait for sync.set respond async
					setTimeout(function(){
						start_session();
					}, 1000);
				})
				.catch(error => console.log(error))
			} else if(request.type == 'create-alarm') {
				repeat = parseInt(request.message);
				chrome.alarms.create("RepeatAlarm", {periodInMinutes: repeat});
			}
	});


	chrome.storage.onChanged.addListener(function(changes, area) {
			if (area == 'sync'){
				console.log("Detect change in storage.sync");
			}
	});

	chrome.alarms.onAlarm.addListener(function(alarm) {
		async () => {
			try {
				await initDeck;
			} catch (e){
				console.log(e);
			}
			
		}	

		setTimeout(function(){
			reviewAlg();
		},500);
		
	});

	

	//start a study session
	
	async function start_session(){
		try {
			await initDeck;
		} catch (e){
			console.log(e);
		}
		console.log("Start a session");
		session = true;
		chrome.alarms.create("RepeatAlarm", {periodInMinutes: repeat});
		
		setTimeout(function(){
			reviewAlg();
		},500);
		
	}

	

	async function getDeck(){
		try {
			await readLocalStorage;
		} catch (e) {
			console.log(e)
		}
		return Object.values(await readLocalStorage(currentQuizlet));
	}


	function reviewAlg() {
		console.log(deck);
		var index = getRndInteger(0, deck.length-1);
		var flashCard = deck[index];
		chrome.tabs.create({active: true, url: chrome.runtime.getURL('newtab.html')},
			function(tab) {
				//wait till newtab.js is running and listening
				setTimeout(function(){
					chrome.tabs.sendMessage(tab.id, 
					{type: 'display-text', message: flashCard});
				}, 200);
			
			});
		
	}

	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min) ) + min;
	  }


	
	

	

	




	