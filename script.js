/* =========================================
   PARTICLE BACKGROUND
========================================= */

tsParticles.load("particles-js", {

  fullScreen: {
    enable: false
  },

  fpsLimit: 30,

  particles: {

    number: {
      value: 18
    },

    color: {
      value: "#7f5cff"
    },

    links: {
      enable: false
    },

    move: {
      speed: 0.5
    },

    size: {
      value: 2
    }

  },

  detectRetina: false

});


/* =========================================
   3D IMAGE EFFECT
========================================= */

const card = document.querySelector(".image-card");

document.addEventListener("mousemove", (e) => {

  let x =
  (window.innerWidth / 2 - e.pageX) / 25;

  let y =
  (window.innerHeight / 2 - e.pageY) / 25;

  card.style.transform =
  `rotateY(${x}deg)
   rotateX(${-y}deg)`;

});


/* =========================================
   DANDI AI - OPENROUTER VERSION
========================================= */

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

/* =========================================
   API KEY
========================================= */

// GANTI DENGAN API KEY OPENROUTER LU
const API_KEY = "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";

/* =========================================
   SEND EVENT
========================================= */

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", (e) => {

  if (e.key === "Enter") {

    e.preventDefault();

    sendMessage();

  }

});

/* =========================================
   SEND MESSAGE
========================================= */

async function sendMessage() {

  const text = userInput.value.trim();

  if (!text) return;

  // tampilkan pesan user
  addMessage(text, "user-message");

  // kosongkan input
  userInput.value = "";

  // typing
  addMessage(
    "DANDI AI sedang mengetik...",
    "ai-message"
  );

  const aiMessages =
    document.querySelectorAll(".ai-message");

  const typingMsg =
    aiMessages[aiMessages.length - 1];

  try {

    // ambil balasan AI
    const reply =
      await getAIResponse(text);

    typingMsg.innerText = reply;

  } catch (err) {

    console.log(err);

    typingMsg.innerText =
      "AI error 😭";

  }

}

/* =========================================
   OPENROUTER AI
========================================= */

async function getAIResponse(message) {

  try {

    const response = await fetch(

  "https://openrouter.ai/api/v1/chat/completions",

  {

    method: "POST",

    headers: {

      "Authorization":
      `Bearer ${API_KEY}`,

      "Content-Type":
      "application/json",

      "HTTP-Referer":
      "https://ai-web-portofolio.vercel.app",

      "X-Title":
      "DANDI AI"

    },

        body: JSON.stringify({

          model:
          "openai/gpt-3.5-turbo",

          messages: [

            {

              role: "system",

              content:
              `Kamu adalah DANDI AI.

Kamu futuristic,
friendly,
santai,
modern,
dan suka ngobrol tentang:
- teknologi
- coding
- AI
- game
- anime
- kehidupan

Jawab dengan natural seperti manusia.`

            },

            {

              role: "user",

              content: message

            }

          ]

        })

      }

    );

    const data = await response.json();

    console.log(data);

    // ERROR CHECK
    if (data.error) {

      return "ERROR 😭 : " + data.error.message;

    }

    // SUCCESS
    return data.choices[0]
      .message.content;

  } catch (error) {

    console.log(error);

    return "AI sedang error 😭";

  }

}

/* =========================================
   ADD MESSAGE
========================================= */

function addMessage(text, className) {

  const msg =
    document.createElement("div");

  msg.classList.add(className);

  msg.innerText = text;

  chatBody.appendChild(msg);

  chatBody.scrollTop =
    chatBody.scrollHeight;

}