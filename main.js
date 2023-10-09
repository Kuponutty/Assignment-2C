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
console.log(handSuits);
//function to check if it's a 5-card flush
    function isMatchingSuits(cardArray){
        let matchCount = {};
        //iterate through the cardArray checking card suits
        for (const cardSuit of cardArray){
            //go through the array and count the occurances of each card suit value, sets default value of 0
            matchCount[cardSuit] = (matchCount[cardSuit]) + 1;
        }
        //checks the values of the matchCount object, then an arrow function to check if any of the values = 4, signifying 4 of a kind
        for (const match in matchCount){
            if (matchCount[match] === 5){
                return true;
            }
        }
        return false;
    }
 /*       let i = 0;
        while (i < input.length - 1){
            console.log(`Comparing ${input[i + 1].suit} with ${input[i].suit}`);
            if (input[i + 1].suit === input[i].suit){
                i++
            }
            else {
                return false;
            }

        }
            return true; 
    }
    */

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

        //function to check if numbers in array are sequential
        function isSequential(numberArray){
            for (i = 0; i < numberArray.length; i++){
                if (numberArray[i] !== numberArray[i -1] + 1){
                    return false;
                }
            }
            return true;
        }

        //function to check if there's pairs, how many pairs
        function isFourOfAKind(cardArray){
            let matchCount = {};
            //iterate through the cardArray, cardValue just a different name for i
            for (const cardValue of cardArray){
                //go through the array and count the occurances of each number/card value, sets default value of 0
                matchCount[cardValue] = (matchCount[cardValue] || 0) + 1;
            }
            //checks the values of the matchCount object, then an arrow function to check if any of the values = 4, signifying 4 of a kind
            for (const match in matchCount){
                if (matchCount[match] === 4){
                    return true;
                }
            }
            return false;
        }

        //check if the hand is a full house
        function isFullHouse(cardArray){
            let matchCount = {};
            let threeOfAKind = false;
            let twoOfAKind = false;
            //iterate through cardArray and increment matchCount if there's a match
            for (const cardValue of cardArray){
                matchCount[cardValue] = (matchCount[cardValue] || 0) + 1;
            }
            //if there's 3 of a kind or two of a kind, return true
            for (const match in matchCount){
                if (matchCount[match] === 3){
                    threeOfAKind = true;
                } else if (matchCount[match] === 2){
                    twoOfAKind = true;
                }
            }
            //if both are true, return true, otherwise false
            return threeOfAKind && twoOfAKind;
        }

        //modified previous function to check for just 3 of a kind
        function isThreeOfAKind(cardArray){
            let matchCount = {};
            let pairCount = 0;
            let threeOfAKind = false;
            let twoOfAKind = false;

            for (const cardValue of cardArray){
                matchCount[cardValue] = (matchCount[cardValue] || 0) + 1;
            }
            for (const match in matchCount){
                if (matchCount[match] === 3){
                    threeOfAKind = true;
                } else if (matchCount[match] === 2){
                    twoOfAKind = true;
                }
            }
            if (threeOfAKind === true && twoOfAKind === false){
                return true;
            }
        }

        //modified previous function to check for 2 pairs
        function isTwoPair(cardArray){
            let matchCount = {};
            let pairCount = 0;

            for (const cardValue of cardArray){
                matchCount[cardValue] = (matchCount[cardValue] || 0) + 1;
            }
            for (const match in matchCount){
                if (matchCount[match] === 2){
                    pairCount++
                }
            }
            return pairCount === 2;
        }

        //reused function to find if it's just one pair
        function isOnePair(cardArray){
            let matchCount = {};
            let pairCount = 0;

            for (const cardValue of cardArray){
                matchCount[cardValue] = (matchCount[cardValue] || 0) + 1;
            }
            for (const match in matchCount){
                if (matchCount[match] === 2){
                    pairCount++
                }
            }
            return pairCount === 1;
        }

        function highCard(cardArray){
            //convert the array into numbers, sorted, then take the last number as the highest number
            let highestCard = "";
            let highestArray = convertToNumbers(cardArray);
            highestCard = highestArray[highestArray.length - 1];
            
            if (highestCard === 14){
                highestCard = "ACE";
            } else if (highestCard === 13){
                highestCard = "KING";
            } else if (highestCard === 12){
                highestCard = "QUEEN"
            } else if (highestCard === 11){
                highestCard = "JACK"
        }
        return highestCard;
    }

    console.log(convertToNumbers(handValues));
    console.log(handSuits);

    //function to check if a card hand matches all elements in the array containing face cards
    //insert cardHand.value aka myCards.value into this to evaluate
    function isRoyal(isHandRoyal){
        let royalCards = [10, 11, 12, 13, 14];
        return royalCards.every(element => isHandRoyal.includes(element));
    }

    function findBestHand(cardArray){

    let bestHand = "";

    if (isRoyal(handValues) === true && isMatchingSuits(handSuits) === true){
        bestHand = "Royal Flush";
    } else if (isSequential(handValues) === true && isMatchingSuits(handSuits) === true){
        bestHand = "Straight Flush"
    } else if (isFourOfAKind(handValues) === true){
        bestHand = "Four of a Kind";
    } else if (isFullHouse(handValues) === true){
        bestHand = "Full House";
    } else if (isMatchingSuits(handSuits) === true){
        bestHand = "Flush";
    } else if (isSequential(handValues) === true){
        bestHand = "Straight";
    } else if (isThreeOfAKind(handValues) === true){
        bestHand = "Three of a Kind";
    } else if (isTwoPair(handValues) === true){
        bestHand = "Two Pair";
    } else if (isOnePair(handValues) === true){
        bestHand = "One Pair";
    } else {
        bestHand = "High Card of: " + highCard(handValues);
    }
    return bestHand;
}

    //testing data with console.log
                console.log(findBestHand());
    //close second fetch
            });
    //close first fetch
        });

        })();