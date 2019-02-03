var config = {
    apiKey: "AIzaSyD66RTtjLRi92-vL8catscLBaJojwsDr3g",
    authDomain: "train-schedule-33a2b.firebaseapp.com",
    databaseURL: "https://train-schedule-33a2b.firebaseio.com",
    projectId: "train-schedule-33a2b",
    storageBucket: "train-schedule-33a2b.appspot.com",
    messagingSenderId: "908917777262"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  $("#add-train-btn").on("click", function(){
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-Input").val().trim(), "HH:mm").format("HH:mm");
    var trainFreq = $("frequency-input").val().trim();

    var train = {
        name : trainName,
        destination: trainDest,
        start: trainFirst,
        frequency: trainFreq,
    }
    database.ref().push(train);
    console.log(train.name);
})

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val())
    
    var trainName = snapshot.val().name;
    console.log(trainName)
    var trainDest = snapshot.val().destination;
    var trainFirst = snapshot.val().start;
    var trainFreq = snapshot.val().frequency;
    var trainFirstConverted = moment(trainFirst, "HH:mm");
    var currentTime = moment().format("HH:mm");
    var diffTime = moment().diff(moment(trainFirstConverted), "minutes");
    var tRemainder = diffTime % trainFreq;
    var minAway = trainFreq - tRemainder;
    var nextTrain = moment().add(minAway, "minutes").format("HH:mm");
    console.log(nextTrain)

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFirst),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
      );
      $("#train-table > tbody").append(newRow);
});