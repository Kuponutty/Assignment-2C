//IIFE
(function () {
    
    let myApiUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    //fetch from first API to get a deck of cards
        fetch(myApiUrl)
            .then((response) => response.json())
            .then((data) => {
                let myDeck = data.deck_id;
                let cardHandApiUrl = "https://deckofcardsapi.com/api/deck/" + myDeck + "/draw/?count=5";
    //fetch from second API to get a hand of 5 cards, using data from first API to get a link
        fetch(cardHandApiUrl)
            .then((response) => response.json())
            .then((handData) => {
                console.log(handData.cards);
    //close second fetch
            });
    //close first fetch
        });

        })();