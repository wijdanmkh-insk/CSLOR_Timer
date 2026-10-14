document.addEventListener("DOMContentLoaded", function() {
    const defaultDuration = 5 * 60;
    const quote = ['Shall We Start?', 'I can\'t Wait!', 'Let\'s Do This!'];
    const changeQuote = document.getElementById("quote");
    const minute = document.getElementById("minute");
    const second = document.getElementById("second");
    const durationMinute = document.getElementById("duration-minute");
    const durationSecond = document.getElementById("duration-second");
    const settingsToggle = document.getElementById("settings-toggle");
    const durationMenu = document.getElementById("duration-menu");
    const toggleButton = document.getElementById("toggle");
    const story = document.getElementById("story");
    const character = document.getElementById("character");
    const dialog = document.getElementById("dialog");
    const dialogText = document.getElementById("dialog-text");

    let remainingSeconds = defaultDuration;
    let timerId = null;
    let progressDialogId = null;
    let storyIndex = 0;
    const progressDialogTexts = [
        "Soalnya susah ya? Maaf banget",
        "Aduh kak, capek.",
        "Bantuin aku dong"
    ];
    const storySteps = [
        { image: "assets/1.png", text: "Haiii! Waktunya sudah selesai!" },
        { image: "assets/2.png", text: "Makasih ya udah bantu jawabin pertanyaan-pertanyaan SKD-ku!" },
        { image: "assets/3.png", text: "Stay tuned untuk update rekruitasi selanjutnya!" }
    ];

    function format2Digits(number){
        return number.toString().padStart(2, '0');
    }

    function changeQuotes() {
        const randomIndex = Math.floor(Math.random()*quote.length);
        changeQuote.textContent = quote[randomIndex];
    }

    function renderCountdown() {
        minute.textContent = format2Digits(Math.floor(remainingSeconds / 60));
        second.textContent = format2Digits(remainingSeconds % 60);
    }

    function finishTimer() {
        clearInterval(timerId);
        clearInterval(progressDialogId);
        timerId = null;
        progressDialogId = null;
        toggleButton.textContent = "Selesai";
        toggleButton.disabled = true;
        durationMinute.disabled = true;
        durationSecond.disabled = true;
        story.hidden = false;
        renderStory();
    }

    function renderProgressDialog() {
        const randomIndex = Math.floor(Math.random() * progressDialogTexts.length);
        character.src = "assets/progress.png";
        dialogText.textContent = progressDialogTexts[randomIndex];
        dialog.disabled = true;
        story.hidden = false;
    }

    function startProgressDialog() {
        renderProgressDialog();
        clearInterval(progressDialogId);
        progressDialogId = setInterval(renderProgressDialog, 2 * 60 * 1000);
    }

    function tick() {
        remainingSeconds -= 1;
        renderCountdown();
        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
            renderCountdown();
            finishTimer();
        }
    }

    function toggleTimer() {
        if (remainingSeconds <= 0) return;
        if (timerId) {
            clearInterval(timerId);
            clearInterval(progressDialogId);
            timerId = null;
            progressDialogId = null;
            toggleButton.textContent = "Lanjutkan";
            story.hidden = true;
            return;
        }
        toggleButton.textContent = "Stop";
        timerId = setInterval(tick, 1000);
        startProgressDialog();
    }

    function renderStory() {
        const currentStep = storySteps[storyIndex];
        character.src = currentStep.image;
        dialogText.textContent = currentStep.text;
        dialog.disabled = storyIndex === storySteps.length - 1;
    }

    function resetTimer(minutes = durationMinute.value, seconds = durationSecond.value) {
        clearInterval(timerId);
        clearInterval(progressDialogId);
        timerId = null;
        progressDialogId = null;
        const safeMinutes = Math.max(0, Math.min(180, Number(minutes) || 0));
        const safeSeconds = Math.max(0, Math.min(59, Number(seconds) || 0));
        const totalSeconds = safeMinutes * 60 + safeSeconds;

        if (totalSeconds === 0) {
            resetTimer(0, 1);
            return;
        }

        durationMinute.value = safeMinutes;
        durationSecond.value = safeSeconds;
        remainingSeconds = totalSeconds;
        storyIndex = 0;
        toggleButton.disabled = false;
        toggleButton.textContent = "Mulai";
        durationMinute.disabled = false;
        durationSecond.disabled = false;
        story.hidden = true;
        renderCountdown();
    }

    settingsToggle.addEventListener("click", function() {
        const isOpen = !durationMenu.hidden;
        durationMenu.hidden = isOpen;
        settingsToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    durationMenu.addEventListener("submit", function(event) {
        event.preventDefault();
        resetTimer();
        durationMenu.hidden = true;
        settingsToggle.setAttribute("aria-expanded", "false");
    });

    toggleButton.addEventListener("click", toggleTimer);
    dialog.addEventListener("click", function() {
        if (timerId) return;
        if (storyIndex < storySteps.length - 1) {
            storyIndex += 1;
            renderStory();
        }
    });

    renderCountdown();
    changeQuotes();
});