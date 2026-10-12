
document.addEventListener("DOMContentLoaded", function() {
    const quote = ['Shall We Start?', 'I can\'t Wait!', 'Let\'s Do This!'];
    const changeQuote = document.getElementById("quote");

    const minute = document.getElementById("minute");
    const second = document.getElementById("second");

    function changeQuotes(){
        const randomIndex = Math.floor(Math.random()*quote.length);
        changeQuote.innerHTML = quote[randomIndex];
    }

    function countdown(){
        minute.innerHTML = minute;
        second.innerHTML = second;
    }

    function datetime(){
        
    }

    changeQuotes();
});