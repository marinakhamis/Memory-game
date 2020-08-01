/*
// This is pure javaScript
document.querySelector('.control-buttons span').onclick = function() {
    let yourName = prompt("What's your name?");
    if (yourName == null || yourName == ""){
        document.querySelector('.name span').innerHTML = 'Unknown';
    } else {
        document.querySelector('.name span').innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
}
*/
//This is the previous code but in ES6 "ECMA Script 2015"
document.querySelector('.control-buttons span').onclick = () => {
  let yourName = prompt(" Hello Gorgeous, what's your name ? ");

  // To enter the name of the user
  yourName == null || yourName == "" ? document.querySelector('.name span').innerHTML = 'Unknown' : document.querySelector('.name span').innerHTML = yourName;
  document.querySelector(".control-buttons").remove();
}

// Set duration 
let duration = 1000;

// Select the container that has the cards inside it 
let blocksContainer = document.querySelector(".memory-game-blocks");

//Putting blocks in an array to be able to sort them later and control them
let blocks = Array.from(blocksContainer.children);

//Added spread operator to extract array elements or we can use Array.from 
// let orderRange = [...Array(blocks.length).keys()];


let orderRange = Array.from(Array(blocks.length).keys());
//console.log(orderRange);

shuffle(orderRange);



//Add CSS order property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  //Add click event
  block.addEventListener('click', function () {

    //Trigger the flip block function
    flipBlock(block);
  });

});


// Flip block function
function flipBlock(selectedBlock) {

  selectedBlock.classList.add('is-flipped');

  // Collect all flipped cards
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

  // If there are two selected blocks
  if (allFlippedBlocks.length === 2) {

    //Stop clicking function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop clicking function
function stopClicking() {
  // Add class no clicking on man container
  blocksContainer.classList.add('no-clicking');

  setTimeout(() => {
    // Remove class no-clicking after duration
    blocksContainer.classList.remove('no-clicking');
  }, duration);

}


// Check mateced blocks
function checkMatchedBlocks(firstBlock, secondBlock) {

  let triesElement = document.querySelector('.tries span');

  if (firstBlock.dataset.house === secondBlock.dataset.house) {

    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');
  } else {

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {

      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');

    }, duration);
  }
}


// Shuffle Function
function shuffle(array) {

  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {

    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;

  }

  return array;

}
