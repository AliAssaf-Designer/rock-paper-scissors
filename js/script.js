let doc = document;
const options = doc.querySelectorAll(".option");
const pop_up_box = doc.querySelector(".pop-up");
let options_values = ["rock", "paper", "scissors"];
options.forEach(option => {
    option.addEventListener("click", ()=>{
        pop_up_box.style.display = "block";
        pop_up_box.innerHTML = "";
        let computer_option;
        let computer_option_img;
        for (let i = 0; i < options_values.length; i++) {
            let random_index = Math.round(Math.random() * i);
            computer_option = options_values[random_index];
            if (computer_option === "rock") computer_option_img = "./img/rock.png";
            else if(computer_option === "paper") computer_option_img = "./img/paper.jpeg";
            else computer_option_img = "./img/scissors.jpeg";
        }
        pop_up_box.innerHTML += `<div class="computer-option">
                                    <h2 class=computer-title>Computer Choose:<bdi>الكمبيوتر اختار:</bdi></h2>
                                    <img src=${computer_option_img} alt="computer option" class="computer-option-img"/>
                                </div>`;
        check_winner(option.dataset.type, computer_option, pop_up_box);
    });
});
function check_winner(first_option, second_option, container) {
    const winner = doc.createElement("div");
    const again_btn = doc.createElement("button");
    const voice = doc.createElement("audio");
    let win_msg;
    let audio_src;
    winner.classList.add("winner");
    if (first_option === "rock") {
        if (second_option === "rock") win_msg = `<p class="how-win equals">You are two equals.<bdi>انتما متعادلان.</bdi></p>`;
        else if (second_option === "paper") {
            win_msg = `<p class="how-win computer-win">Computer Win's<bdi>الكمبيوتر يفوز.</bdi></p>`;
            audio_src = "./audio/lose.mp3";
        } else {
            win_msg = `<p class="how-win player-win">You Win<bdi>أنت تفوز.</bdi></p>`;
            audio_src = "./audio/win.mp3";
        }
    } else if (first_option === "paper") {
        if (second_option === "rock") {
            win_msg = `<p class="how-win player-win">You Win<bdi>أنت تفوز.</bdi></p>`;
            audio_src = "./audio/win.mp3";
        } else if (second_option === "paper") win_msg = `<p class="how-win equals">You are two equals.<bdi>انتما متعادلان.</bdi></p>`;
        else {
            win_msg = `<p class="how-win computer-win">Computer Win's<bdi>الكمبيوتر يفوز.</bdi></p>`;
            audio_src = "./audio/lose.mp3";
        }
    } else{
        if (second_option === "rock") {
            win_msg = `<p class="how-win computer-win">Computer Win's<bdi>الكمبيوتر يفوز.</bdi></p>`;
            audio_src = "./audio/lose.mp3";
        } else if (second_option === "paper") {
            win_msg = `<p class="how-win player-win">You Win<bdi>أنت تفوز.</bdi></p>`;
            audio_src = "./audio/win.mp3";
        } else win_msg = `<p class="how-win equals">You are two equals.<bdi>انتما متعادلان.</bdi></p>`;
    }
    voice.setAttribute("src", audio_src);
    voice.play();
    if (win_msg.includes("You Win")) {
        const duration = 3 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        function randomInRange(min, max) { return Math.random() * (max - min) + min;}
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) { return clearInterval(interval);}
            const particleCount = 50 * (timeLeft / duration);
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                })
            );
        }, 250);
    }
    again_btn.classList.add("play-again");
    again_btn.innerHTML = "Play Again <bdi>ألعب مرة أخرى</bdi>";
    again_btn.addEventListener("click", ()=>{
        pop_up_box.innerHTML = "";
        pop_up_box.style.display = "none";
        voice.pause();
    });
    winner.innerHTML = `${win_msg}`;
    winner.appendChild(again_btn);
    container.appendChild(winner);
}
function playAudio(audio){ audio.play;}