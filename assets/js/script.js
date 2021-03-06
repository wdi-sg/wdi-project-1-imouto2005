$(document).ready(function(){
  var player1score = 0
  var player2score = 0
  var player1Played = []
  var player2Played = []
  var player1Counter = 0
  var player2Counter = 0
  var desiredRounds = 3
  var round = 1
  $("#player2").slideToggle();
  document.getElementById('roundDisplay').textContent = "Round 1 of " + desiredRounds

  // modal for instructions
  var modal = document.getElementById('myModal');
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];
  instructions.onclick = function() {
      modal.style.display = "block";
  }
  span.onclick = function() {
      modal.style.display = "none";
  }
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // logic for pulling out 4 words of length 4 and scrambling the characters
  var keysArr = Object.keys(dictionary)
  var allFourLetters = []
  keysArr.forEach(function(i) {
    if (i.length === 4) {
      allFourLetters.push(i.toUpperCase())
    }
  })
  console.log(allFourLetters)

  var fourLetters = []
  var word1 = allFourLetters[Math.floor(Math.random()*allFourLetters.length)];
  fourLetters.push(word1)
  var word2 = allFourLetters[Math.floor(Math.random()*allFourLetters.length)];
  fourLetters.push(word2)
  var word3 = allFourLetters[Math.floor(Math.random()*allFourLetters.length)];
  fourLetters.push(word3)
  var word4 = allFourLetters[Math.floor(Math.random()*allFourLetters.length)];
  fourLetters.push(word4)
  console.log(fourLetters)

  var joinedString = fourLetters.join('').toUpperCase();
  String.prototype.shuffle = function() {
      var allCharacters = this.split(""),
          n = allCharacters.length; //number of characters in the array

      for(var i = n - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = allCharacters[i];
          allCharacters[i] = allCharacters[j];
          allCharacters[j] = tmp;
      }
      return allCharacters.join("");
  }
  var shuffledString = joinedString.shuffle()
  document.getElementById('scrambledDisplay').textContent = joinedString.shuffle()
  console.log(shuffledString)

  function shuffleLetters() {
    document.getElementById('scrambledDisplay').textContent = joinedString.shuffle()
  }
  $('#shuffle').click(shuffleLetters)

  // function to check if user input uses characters only from alphabet pool
  function checkStringChar(str) {
    var shuffledArray = shuffledString.split('')
    var inputArray = str.toUpperCase().split('')
    function arrayContainsArray(superset, subset) {
      return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
      });
    }
    return arrayContainsArray(shuffledArray,inputArray)
  }

  // function to check if user input is found in the dictionary
  function checkValidWord(str) {
    return dictionary.hasOwnProperty(str)
  }

  // function to check if a word has been played
  function checkPreviouslyPlayed(str) {
    if (player1Played.indexOf(str) > -1 || player2Played.indexOf(str) > -1) {
      return false
    } else {
      return true
    }
  }

  function checkMinLength(str) {
    return str.length >= 3
  }

  function checkForInput(str) {
    if (str === "") {
      return false
    }
    return true
  }

  // adds extra points for "rarer" alphabets
  function checkScores(str) {
    counter = 0
    str.split("").forEach(function(i) {
      if (i === "z" || i === "x" || i === "q" || i === "j" || i === "k") {
        counter += 5
      } else if (i === "f" || i === "h" || i === "v" || i === "w" || i === "y") {
        counter += 3
      }
    })
    return str.length + counter
  }

  // function to check if user input can be accepted:
  // 1. is from the alphabet pool
  // 2. is a valid dictionary entry (and not random gibberish)
  // 3. is not a word that has been submitted by a player before
  // 4. word must be at least 3 characters long
  function checkUserInput(str) {
    if (!checkStringChar(str)) {
      swal({
          title: "Hey you!",
          text: "Please only use letters from the given set.",
          type: "error",
        }, function(){
            $('#player1input').focus();
            $('#player2input').focus();
          }
        );
      player1Played.push($('#player1input').val())
      player2Played.push($('#player2input').val())
      $('#player1input').val("")
      $('#player2input').val("")
      new Audio('assets/sound/goatscream.mp3').play()
    } else if (!checkForInput(str)) {
        swal({
          title: "BOO",
          text: "You just forfeited your turn because you did not submit an answer!",
          type: "error",
        }, function(){
          $('#player1input').focus();
          $('#player2input').focus();
          }
        );
        player1Played.push($('#player1input').val())
        player2Played.push($('#player2input').val())
        $('#player1input').val("")
        $('#player2input').val("")
        new Audio('assets/sound/goatscream.mp3').play()
      } else if (!checkValidWord(str)) {
        swal({
          title: "Uh oh!",
          text: "It seems like that's not a valid word.",
          type: "error",
        }, function(){
            $('#player1input').focus();
            $('#player2input').focus();
          }
        );
        player1Played.push($('#player1input').val())
        player2Played.push($('#player2input').val())
        $('#player1input').val("")
        $('#player2input').val("")
        new Audio('assets/sound/goatscream.mp3').play()
    } else if (!checkPreviouslyPlayed(str)) {
        swal({
          title: "Oppsy!",
          text: "That word has already been played.",
          type: "error",
        }, function(){
            $('#player1input').focus();
            $('#player2input').focus();
          }
        );
        player1Played.push($('#player1input').val())
        player2Played.push($('#player2input').val())
        $('#player1input').val("")
        $('#player2input').val("")
        new Audio('assets/sound/goatscream.mp3').play()
    } else if (!checkMinLength(str)) {
        swal({
          title: "O dear!",
          text: "Your word is too short.",
          type: "error",
        }, function(){
          $('#player1input').focus();
          $('#player2input').focus();
          }
        );
        player1Played.push($('#player1input').val())
        player2Played.push($('#player2input').val())
        $('#player1input').val("")
        $('#player2input').val("")
        new Audio('assets/sound/goatscream.mp3').play()
    } else {
        swal({
          title: "Good job!",
          text: "Your answer has been accepted!",
          type: "success",
        }, function(){
            $('#player1input').focus();
            $('#player2input').focus();
          }
        );
        new Audio('assets/sound/yes.mp3').play()

        player1score += checkScores($('#player1input').val())
        player1Played.push($('#player1input').val())
        document.getElementById('player1score').textContent = "Score: " + player1score
        $('#player1input').val("")

        player2score += checkScores($('#player2input').val())
        player2Played.push($('#player2input').val())
        document.getElementById('player2score').textContent = "Score: " +player2score
        $('#player2input').val("")
    }
    if (player1Counter === desiredRounds && player2Counter === desiredRounds) { //game ends after 3 rounds
      endGame();
    }
  }

  function resetGame() {
    window.location.reload(true);
  }

  $('#new-game').click(resetGame)

  function endGame() {
    if (player1score > player2score) {
      swal({
        title: "Player 1 wins!",
        text: "Player 1's words: " + player1Played.filter(Boolean).join(', ') + " (" + player1score + " points)"
        + "\n" + "Player 2's words: " + player2Played.filter(Boolean).join(', ') + " (" + player2score + " points)",
        imageUrl: "assets/img/buny.png",
        confirmButtonText: "New Game"
      }, function(){
        window.location.reload(true);
        }
      );
    } else if (player2score > player1score) {
      swal({
        title: "Player 2 wins!",
        text: "Player 1's words: " + player1Played.filter(Boolean).join(', ') + " (" + player1score + " points)"
        + "\n" +"Player 2's words: " + player2Played.filter(Boolean).join(', ') + " (" + player2score + " points)",
        imageUrl: "assets/img/bb.png",
        confirmButtonText: "New Game"
      }, function(){
          window.location.reload(true);
        }
      );
    } else {
      swal({
        title: "It's a tie!",
        text: "Player 1's words: " + player1Played.filter(Boolean).join(', ') + " (" + player1score + " points)"
        + "\n" +"Player 2's words: " + player2Played.filter(Boolean).join(', ') + " (" + player2score + " points)",
        imageUrl: "assets/img/tie.png",
        confirmButtonText: "New Game"
      }, function(){
          window.location.reload(true);
        }
      );
    }
  }

  $('#end-game').click(endGame)

  // check user input upon submit button being clicked
  $('#player1submit').click(function() {
    player1Counter++
    checkUserInput($('#player1input').val())
    $("#player1").slideToggle();
    $("#player2").slideToggle();
  })
  $('#player2submit').click(function() {
    player2Counter++
    checkUserInput($('#player2input').val())
    $("#player2").slideToggle();
    $("#player1").slideToggle();
    round++ // for displaying each round on the page
    document.getElementById('roundDisplay').textContent = "Round " + round + " of " + desiredRounds
    if (player2Counter === desiredRounds) {
      document.getElementById('roundDisplay').textContent = "GAME OVER"
    }
  })
})
