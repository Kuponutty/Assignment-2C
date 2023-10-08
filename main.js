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
                let myHandData = handData.cards;
    //create an array of objects (myCards) using the map function, separating just the value (8) and suit ("DIAMONDS")
    //to use in later functions to examine what hands are available
                let myCards = myHandData.map((card) => ({
                    value: card.value,
                    suit: card.suit
                }));
//function to check if it's a 5-card flush
    function isMatchingSuits(input){
        let i = 0;
        while (i < input.length - 1){
            if (input[i + 1].suit === input[i].suit){
                i++
            }
            else {
                return false;
            }

            }
            return true; 
          }


    //testing data with console.log
                console.log(isMatchingSuits(myCards));
    //close second fetch
            });
    //close first fetch
        });

        })();