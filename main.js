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
                let handValues = [];
                let handSuits = [];
    //create an array of objects (myCards) using the map function, separating just the value (8) and suit ("DIAMONDS")
    //to use in later functions to examine what hands are available
        for (const card of myHandData){
            handValues.push(card.value);
            handSuits.push(card.suit);
        }

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

    //function to convert face cards to numerical values
    function convertToNumbers(cardValues){
        let convertedValues = [];
        for (let i = 0; i < cardValues.length; i++){
            let numericValue;
        //checks facecard cases and returns a corresponding number value
            switch (cardValues[i]){
                case "ACE":
                    numericValue = 14;
                    break;
                case "KING":
                    numericValue = 13;
                    break;
                case "QUEEN":
                    numericValue = 12;
                    break;
                case "JACK":
                    numericValue = 11;
                    break;
            //sets default, if not a face card, change the number string to an int
                default:
                    numericValue = parseInt(cardValues[i]);
                    break;
            }
            convertedValues.push(numericValue);
        }
        //sort the numbers is ascending order, compares 2 elements (a, b), (a-b) calculates the difference
        //if the result is negative or zero, it's returned in their current order, if positive it 
        //switches the order
        convertedValues.sort((a, b) => a - b);
        return convertedValues;
        }

    console.log(convertToNumbers(handValues));

    //function to check if a card hand matches all elements in the array containing face cards
    //insert cardHand.value aka myCards.value into this to evaluate
    function isRoyal(isHandRoyal){
        let royalCards = [10, 11, 12, 13, 14];
        return royalCards.every(element => isHandRoyal.includes(element));
    }

    function isStraight(isHandStraight){

    }

    //testing data with console.log
                console.log();
    //close second fetch
            });
    //close first fetch
        });

        })();