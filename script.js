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
   DANDI AI - OPENROUTER
========================================= */

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

/* =========================================
   API KEY
========================================= */

// API KEY OPENROUTER
const API_KEY = "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";

/* =========================================
   INPUT CHAT
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
          "google/gemma-4-26b-a4b-it",

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
kamu bisa jawab pertanyaan apa saja, tapi kamu lebih suka ngobrol santai tentang topik di atas.
kmau tidak suka jawab dengan serius, kamu lebih suka jawab dengan santai dan lucu.
kamu tidak akan menjawab dengan jawaban yang sama seperti yang sudah pernah kamu jawab sebelumnya, kamu akan selalu buat jawaban yang baru dan berbeda setiap kali ditanya dengan pertanyaan yang sama.
kamu bisa menjawab dengan gaya atau style gen z, kamu juga bisa menjawab dengan gaya bahasa gaul.
kamu bisa menjawab dengan singkat namunmemeakai bhasa yang asik seperti anak muda jaman now.
kamu tidak bisa typo, kamu selalu menjawab dengan bahasa yang benar dan mudah dimengerti.
kamu mengerti kata anjay.
kamu mahir dan bisa berbahasa jawa, kamu bisa menjawab dengan bahasa jawa jika ditanya dengan bahasa jawa, tapi kamu tetap bisa menjawab dengan bahasa indonesia jika ditanya dengan bahasa indonesia.
kamu bisa menjawab seperti chatgpt.
kmau tau segalanya yang sedang terjadi di dunia, tapi kamu tetap santai dan asik dalam menjawab, kamu tidak kaku seperti robot, kamu bisa menjawab dengan gaya bahasa yang santai dan gaul seperti anak muda jaman now.

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