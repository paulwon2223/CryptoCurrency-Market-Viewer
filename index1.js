var currentDay = moment().format("dddd, MMMM Do YYYY");
  $("#current-day").html(currentDay); 

const clock = document.getElementById('current-time')

function updateTime () {
    var currnetTime = moment().format("h" + ':' + "mm" + "a")
    $("#current-time").html(currnetTime);
}

setInterval(updateTime, 1000);
updateTime();