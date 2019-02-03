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
    var trainFirst = moment( $("#first-train-input").val().trim(),"HH:mm").format("X");
    var trainFreq = $("frequency-input").val().trim();

    var train = {
        name : trainName,
        destination: trainDest,
        start: trainFirst,
        frequency: trainFreq,
    }
    database.ref().push(train);
})

database.ref().on("child_added", function(snapshot) {
    
    
    var trainName = snapshot.val().name
    var trainDest = snapshot.val().role
    var trainFirst = snapshot.val().start
    var trainFreq = snapshot.val().rate
    var date = moment.unix(empStart).format('MM/DD/YYYY');
    var month = moment().diff(moment(empStart, "X"), "months");
    var bill = month * empRate;

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFirst),
        $("<td>").text(trainFreq),
        $("<td>").text(minAway),
      );
      $("#employee-table > tbody").append(newRow);
});