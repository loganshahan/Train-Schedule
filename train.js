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
    var trainFreq =$("#frequency-input").val().trim();
    var trainFirst = $("#first-train-input").val().trim();

    var train = {
        name : trainName,
        destination: trainDest,
        frequency: trainFreq,
        first: trainFirst,
    }
    database.ref().push(train);
})
database.ref().on("child_added", function(snapshot) {
    
    
    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().destination;
    var trainFreq = snapshot.val().frequency;
    var trainFirst = snapshot.val().first;

    var tStart = trainFirst;
    var tFreq = trainFreq;
    var firstTimeConverted = moment(tStart, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFreq;
    var tMinutesTillTrain = tFreq - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

   

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
        
      );
      $("#train-table > tbody").append(newRow);
});