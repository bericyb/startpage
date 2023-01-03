var quotes = ["The two most powerful warriors are patience and time.","Time is money.","Time waits for no one.","Better three hours too soon than a minute too late.","Lost time is never found again.","Time is the most valuable thing a man can spend.","Time is the wisest counselor of all.","The key is in not spending time, but in investing it.","It is the time you have wasted for your rose that makes your rose so important.","Punctuality is the thief of time.","Time is free, but it’s priceless. You can’t own it, but you can use it. You can’t keep it, but you can spend it. Once you’ve lost it you can never get it back.","The trouble is, you think you have time.","Time is a cruel thief to rob us of our former selves. We lose as much to life as we do to death.","Suspect each moment, for it is a thief, tiptoeing away with more than it brings.","Time brings all things to pass.","Men talk of killing time, while time quietly kills them.","There is one kind of robber whom the law does not strike at, and who steals what is most precious to men: time.","The future is uncertain but the end is always near.","Time takes it all, whether you want it to or not.","Time is a storm in which we are all lost.","Time flies over us, but leaves its shadow behind.","You can’t have a better tomorrow if you are thinking about yesterday all the time.","Regret for wasted time is more wasted time.","You can’t make up for lost time. You can only do better in the future.","How did it get so late so soon? It’s night before it’s afternoon. December is here before it’s June. My goodness how the time has flewn. How did it get so late so soon?","There’s only one thing more precious than our time and that’s who we spend it on.","If you love life, don’t waste time, for time is what life is made up of.","Time is what we want most, but what we use worst.","The way we spend our time defines who we are.","Time slips away like grains of sand never to return again.","A man who dares to waste one hour of time has not discovered the value of life.","The time I kill is killing me.","Those who make the worst use of their time are the first to complain of its brevity.","Determine never to be idle. No person will have occasion to complain of the want of time who never loses any. It is wonderful how much can be done if we are always doing.","There’s never enough time to do all the nothing you want.","It’s not that we have little time, but more that we waste a good deal of it.","Either you run the day, or the day runs you.","Your time is limited, so don’t waste it living someone else’s life.","Change your 24 hours and you will change your life.","They always say time changes things, but you actually have to change them yourself.","All we have to decide is what to do with the time that is given us.","The time for action is now. It’s never too late to do something.","We must use time as a tool, not as a crutch.","If we take care of the moments, the years will take care of themselves.","Yesterday’s the past, tomorrow’s the future, but today is a gift. That’s why it’s called the present.","The common man is not concerned about the passage of time, the man of talent is driven by it.","There are two days in my calendar: This day and that Day."];



function currentTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.getElementById("clock").innerHTML =  hour + ":" + min + ":" + sec;
    var t = setTimeout(currentTime, 1000);
}

function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}

function copyText(){
    var textArea = document.createElement("textArea");
    textArea.value = 'rm ~/.config/mps-youtube/cache_py_* ; mpsyt';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
    document.body.removeChild(textArea);
}

function copyNewText(text){
    var textArea = document.createElement("textArea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
    document.body.removeChild(textArea);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function getQuote() {
    var random = getRandomInt(0,47);
    console.log(random);
    console.log(quotes[random]);
    document.getElementById("quote").innerHTML = quotes[random];
}


getQuote();

currentTime();
