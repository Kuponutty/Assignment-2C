//IIFE
(function () {
    
    let myApiUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    //fetch from first API to get a deck of cards
        fetch(myApiUrl)
            .then((response) => response.json())
            .then((data) => {
                let myDeck = data.deck_id;
                //let cardHandApiUrl = "https://deckofcardsapi.com/api/deck/" + myDeck + "/draw/?count=5";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/royalflush";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/straightflush";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/fourofakind";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/fullhouse";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/flush";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/straight";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/threeofakind";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/twopair";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/onepair";
                //let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/highcard";
                let cardHandApiUrl = "https://prog2700.onrender.com/pokerhandtest/random";
    //fetch from second API to get a hand of 5 cards, using data from first API to get a link
        fetch(cardHandApiUrl)
            .then((response) => response.json())
            .then((handData) => {
                let myHandData = handData.cards;
                let handValues = [];
                let handSuits = [];
    //Display the image links in the html file
    let htmlId = document.getElementById('myData');
    //CSS rule to display it left to right
    htmlId.style.display = 'flex';
    
    //Iterate through the cards object
    myHandData.forEach(card => {
        // create a div for each card for formatting
        const cardDiv = document.createElement('div');
        //display each of the card images
        const imageElement = document.createElement('img');
        imageElement.src = card.image;
        //create a matching <p> for each element to display the card text
        const cardParagraph = document.createElement('p');
        cardParagraph.textContent = `${card.value} of ${card.suit}`;
        //close the img and p elements in the HTML
        cardDiv.appendChild(imageElement);
        cardDiv.appendChild(cardParagraph);
        //close the div
        htmlId.appendChild(cardDiv);
    });

    //create an array of objects (myCards) using the map function, separating just the value (8) and suit ("DIAMONDS")
    //to use in later functions to examine what hands are available
        for (const card of myHandData){
            handValues.push(card.value);
            handSuits.push(card.suit);
        }

        //Debugging tests
        console.log(myHandData);
        console.log(handSuits);

//function to check if it's a 5-card flush
    function isMatchingSuits(cardArray){
        //set the first suit in the array to a variable
        const firstSuit = cardArray[0];
        console.log(firstSuit);
        //check if the first suit matches all the suits in the array
        for (let i = 1; i < cardArray.length; i++) {
            if (cardArray[i] !== firstSuit) {
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
        //convert the card values to numerical values so the other functions can check them correctly
        handNumbers = convertToNumbers(handValues);

        //function to check if numbers in array are sequential
        function isSequential(numberArray){
            //sort the array in sequential numbers
            numberArray.sort((a, b) => a - b);
            //check if the cards are other versions of straights
            for (let i = 0; i < numberArray.length - 1; i++) {
                if (numberArray[i] !== numberArray[i + 1] - 1) {
                    return false;
                }
            }
            return true;
        }
        //seperate function to check for a low straight (Ace low)
        function lowStraight(numberArray){
            const lowStraightValues = [2,3,4,5,14];
            for (let i = 0; i < numberArray.length - 1; i++){
                if (numberArray[i] !== lowStraightValues[i]){
                    return false
                }
            }
            return true;
        }

        //function to check if there's pairs, how many pairs
        function isFourOfAKind(cardArray){
            let matchCount = [];
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
            let matchCount = [];
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
                //if there's also an index of 2 in the object
                } else if (matchCount[match] === 2){
                    twoOfAKind = true;
                }
            }
            //if both are true, return true, otherwise false
            return threeOfAKind && twoOfAKind;
        }

        //modified previous function to check for just 3 of a kind
        function isThreeOfAKind(cardArray){
            let matchCount = [];
            let threeOfAKind = false;
            let twoOfAKind = false;
            //check cardArray, if they're equal, increase matchcount
            for (const cardValue of cardArray){
                matchCount[cardValue] = (matchCount[cardValue] || 0) + 1;
            }
            //if matchCount increments to 3, there's 3 of a kind
            for (const match in matchCount){
                if (matchCount[match] === 3){
                    threeOfAKind = true;
                //checking if the other two cards are a pair to avoid false positives compared to a full house
                } else if (matchCount[match] === 2){
                    twoOfAKind = true;
                }
            }
            //if there's 3 of a kind, and the other two are not a pair
            if (threeOfAKind === true && twoOfAKind === false){
                return true;
            }
        }

        //modified previous function to check for 2 pairs
        function isTwoPair(cardArray){
            let matchCount = [];
            let pairCount = 0;

            for (const cardValue of cardArray){
                matchCount[cardValue] = (matchCount[cardValue] || 0) + 1;
            }
            //if the matchCount = 2, increment the pair count, if pair count = 2 it's two of a kind
            for (const match in matchCount){
                if (matchCount[match] === 2){
                    pairCount++
                }
            }
            return pairCount === 2;
        }

        //reused function to find if it's just one pair
        function isOnePair(cardArray){
            let matchCount = [];
            let pairCount = 0;
            //same as previous except checking for a pairCount of 1
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
            //convert back to face cards to display in the website
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


    console.log(handSuits);

    //function to check if the card array contains royal cards only
    function isRoyal(cardArray) {
        const requiredRoyalValues = [10, 11, 12, 13, 14];
        //check if each index matches each other
        for (let i = 0; i < cardArray.length; i++) {
            if (requiredRoyalValues[i] !== cardArray[i]) return false;
        }
        return true;
        }
    

console.log(handNumbers);
    //function to identify which is the highest available hand using previous functions
    function findBestHand(){

    let bestHand = "";

    if (isRoyal(handNumbers) === true && isMatchingSuits(handSuits) === true){
        bestHand = "Royal Flush";
    } else if (isSequential(handNumbers) === true && isMatchingSuits(handSuits) === true){
        bestHand = "Straight Flush"
    } else if (isFourOfAKind(handNumbers) === true){
        bestHand = "Four of a Kind";
    } else if (isFullHouse(handNumbers) === true){
        bestHand = "Full House";
    } else if (isMatchingSuits(handSuits) === true){
        bestHand = "Flush";
    } else if (isSequential(handNumbers) === true || lowStraight(handNumbers) === true){
        bestHand = "Straight";
    } else if (isThreeOfAKind(handNumbers) === true){
        bestHand = "Three of a Kind";
    } else if (isTwoPair(handNumbers) === true){
        bestHand = "Two Pair";
    } else if (isOnePair(handNumbers) === true){
        bestHand = "One Pair";
    } else {
        bestHand = "High Card of: " + highCard(handNumbers);
    }
    return bestHand;
}

//Output the best hand to the html file
let returnBestHand = findBestHand();
let htmlBestHand = document.getElementById('handResult');
htmlBestHand.innerHTML = 'Your best hand is ' + returnBestHand;


    //testing data with console.log
                console.log(findBestHand());
    //close second fetch
            });
    //close first fetch
        });

        })();