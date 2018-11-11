$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyCKownqB-x6BdGQ6XuS7gSq9Kim_NSfdVo",
        authDomain: "trainscheduler-9c654.firebaseapp.com",
        databaseURL: "https://trainscheduler-9c654.firebaseio.com",
        projectId: "trainscheduler-9c654",
        storageBucket: "trainscheduler-9c654.appspot.com",
        messagingSenderId: "429947896986"
    };
    firebase.initializeApp(config);

    var train = ""
    var destination = ""
    var startTime = ""
    var frequency = ""
    var nextArrive = ""
    var minutes = ""

    var funnyTags = ["No deaths...today", "New trains: Now including Oxygen", "Still Predator Free", "Todays Menu: Mealworms and La Croix", "Getting you to your destination half the time!", "Now Serving Soylent Green!"];
    var tag = funnyTags[Math.floor(Math.random() * funnyTags.length)];
    $('.tagline').html(tag);


    firebase.database().ref().on("child_added", function (snapshot) {

        $(".mainTable").append('<tr><th>' + snapshot.val().Train + '<td>' + snapshot.val().Destination + '<td>' + snapshot.val().Frequency + '<td>' + snapshot.val().Arrival + '<td>' + snapshot.val().TravelTime);
    })

    $("#add-train").on("click", function (event) {
        event.preventDefault();

        train = $('#trainInput').val().trim();
        destination = $('#destInput').val().trim();
        startTime = $('#trainTime').val().trim();
        frequency = $('#frequencyInput').val().trim();

        var startTimeConvert = moment(startTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(startTimeConvert), "minutes");
        var tRemainder = diffTime % frequency;
        minutes = frequency - tRemainder;
        nextArrive = moment().add(minutes, "minutes");
        var minutesTil = minutes
        var thisArrive = nextArrive;



        firebase.database().ref().push({
            Train: train,
            Destination: destination,
            Time: startTime,
            Frequency: frequency,
            Arrival: String(thisArrive),
            TravelTime: minutesTil,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })

    });
});