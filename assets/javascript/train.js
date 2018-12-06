$(document).ready(function() {
  // Link to firebase for user input
  var currentTrains = new firebase(
    "https://trainschedule-86eb1.firebaseio.com"
  );

  // buttons and user input
  $("#submitBtn").on("click", function() {
    var trainName = $("#trainName").val();
    var destination = $("#destination").val();
    var firstTrain = $("#firstTrain").val();
    var frequency = $("#frequency").val();
  });

  // user input trains
  var newTrains = {
    name: trainName,
    place: destination,
    fTime: firstTime,
    often: frequency
  };

  // add the user input trains into current train schedule table
  currentTrains.push(newTrains);
  clearForm();

  // console log train list
  console.log(currentTrains);

  // link user input into firebase
  currentTrains.on("child_added", function(childSnapshot, prevChildName) {
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTime = childSnapshot.val().fTime;
    var frequency = childSnapshot.val().often;

    // Time calculation for user input
    // Northwestern University Coding Bootcamp
    // convert time through moment.js
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // append user input into current train schedule table
    $("#trainTable > tbody").append(
      "<tr><td>" +
        trainName +
        "</td><td>" +
        destination +
        "</td><td>" +
        "Every " +
        frequency +
        " minutes" +
        "</td><td>" +
        nextTrainConverted +
        "</td><td>" +
        tMinutesTillTrain +
        "</td></tr>"
    );

    // =====Function=====
    function clearForm() {
      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrain").val("");
      $("#frequency").val("");
    }
  }); // firebase
}); //document ready closing tag
