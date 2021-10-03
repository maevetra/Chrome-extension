var serverhost = 'http://127.0.0.1:8000';
var currentQuizlet;

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
			}
	});


	chrome.storage.onChanged.addListener(function(changes, area) {
			if (area == 'sync'){
				console.log("Detect change in storage.sync");
			}
	});

	

	//start a study session
	
	function start_session(){
		console.log("Start a session");
		var deck;
		getDeck()
			.then(function(result) {
				deck = result[0];
			})
			.then(function() {
				console.log(deck);
			})
			.finally(function() {
				reviewAlg(deck);
			})

	}

	async function getDeck(){
		return Object.values(await readLocalStorage(currentQuizlet));
	}
	
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


	function reviewAlg(deck) {
		var index = getRndInteger(0, deck.length-1);
		var flashCard = deck[index];
		chrome.tabs.create({active: true, url: chrome.runtime.getURL('newtab.html')},
			function(tab) {
				//wait till newtab.js is running and listening
				setTimeout(function(){
					chrome.tabs.sendMessage(tab.id, 
					{type: 'display-text', message: flashCard},
					(response) => {
						console.log(response); //TODO: test
					});
				}, 500);
			
			});
		
	}

	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min) ) + min;
	  }


	
	

	

	




	