if(localStorage.length===0){
  window.location.href = "index.html"
}

const api1 = "https://6787ed4fc4a42c916108c702.mockapi.io/message";
const apiuser = "https://6787ed4fc4a42c916108c702.mockapi.io/users";
// const api2 = "https://6787ed4fc4a42c916108c702.mockapi.io/message";

const messageWrap = document.querySelector(".message");
const messageInput = document.getElementById("messageInput");
const online = document.querySelector(".online");
const typing = document.querySelector(".typing");
const outgoing = document.querySelector(".outgoing");
const incoming = document.querySelector(".incoming");
const leftUsers = document.querySelector(".users_wrap")
const user_panel = document.querySelector(".user_panel")
const hamUser = document.getElementById("hamburger_user")
const hamUserImg = document.getElementById("hamburger_img")
const hamUserNumber = document.getElementById("hamburger_number")
const hamUserEmail = document.getElementById("hamburger_email")
const logo = document.getElementById("logo")
const username = document.getElementById("username")
const user = document.querySelector(".user")

let localUser = localStorage.getItem("loggedInUser")
let localUserItems = JSON.parse(localUser)

hamUser.textContent = localUserItems.username;                  
hamUserNumber.textContent = localUserItems.phone_number;
hamUserEmail.textContent = localUserItems.email;
hamUserImg.src = localUserItems.img 
const receiver_user_id = localStorage.getItem('receiver_user_id')


function fetchFunc() {
  fetch(apiuser)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {

        if(localUserItems.username !== element.username){
          logo.src = element.img
          username.textContent = element.username
          let leftUser = document.createElement("div");
          leftUser.setAttribute("data-user-id", element.id);
          leftUser.classList.add("flex",  "p-[10px]", "cursor-pointer", "items-center", "border", "border-black", "gap-[20px]", "bg-[#77a2e1c4]");
          leftUser.innerHTML = `
                    <div class="flex  items-center">
                      <img class="w-[70px] h-[50px] rounded-full" src="${element.img}" alt="">
                    </div>
                    <div class="text-white">
                      <h3>${element.username}</h3>
                      <p>Message send</p>
                    </div>
          `;
          leftUsers.append(leftUser);
        }

      });
    })
    .catch((err) => console.log(err));
}

leftUsers.addEventListener("click", (e) => {
  user_panel.innerHTML = ""; // Old xabarlarni tozalash
  user.style.display = "flex"
  const clickedUser = e.target.closest("div[data-user-id]");
  if (clickedUser) {
    const userId = clickedUser.getAttribute("data-user-id");

    // Tanlangan foydalanuvchi haqida ma'lumot olish
    fetch(`${apiuser}/${userId}`)
      .then((res) => res.json())
      .then((user) => { 
        localStorage.setItem('receiver_user_id', userId)  
        
        // Xabarlarni olish
        fetch(api1)
          .then((res) => res.json())
          .then((messages) => {
            const messageWrap = document.querySelector(".message");
            
            
            
            

            const filteredMessages = messages.filter((msg) =>
              (msg.senderid == localUserItems.id && msg.recieverid == userId) ||
              (msg.senderid == userId && msg.recieverid == localUserItems.id)
            );            
            

            filteredMessages.forEach((message) => {
              
              const messageDiv = document.createElement("div");
              const messageClass =
                message.senderid == localUserItems.id ? "outgoing" : "incoming";
              messageDiv.classList.add("messageCount", messageClass);
              messageDiv.innerHTML = `<p>${message.message}</p>`;
              messageWrap.append(messageDiv);
              
            });
          })
          .catch((err) => console.log("Xabarlarni olishda xatolik:", err));
      })
      .catch((err) => console.log("Foydalanuvchi ma'lumotlarini olishda xatolik:", err));
  }
});



messageInput.addEventListener("keydown", () => {
  online.style.display = "none";
  typing.style.display = "block";
  setTimeout(() => {
    online.style.display = "block";
    typing.style.display = "none";
  }, 2000);
});

const sendBtn = document.getElementById("send-btn");




sendBtn.addEventListener("submit", (e) => {
  e.preventDefault()

 
  


  const messageText = messageInput.value.trim();
  if (messageText) {
      
      fetch(api1, {
          method: "POST", 
          body: JSON.stringify({
              message: messageText,
              senderid: localUserItems.id,
              recieverid: receiver_user_id,
          }),
          headers: {
              "Content-Type": "application/json",
          },
      })
      .then((res) => res.json())
      .then((newMessage) => {
          // Xabarni chat oynasiga qo'shish
          const messageWrap = document.querySelector(".message");
          const messageDiv = document.createElement("div");
          messageDiv.classList.add("messageCount", "outgoing");
          messageDiv.innerHTML = `<p>${newMessage.message}</p>`;
          messageWrap.append(messageDiv);

          messageInput.value = ""; // Inputni tozalash
      })
      .catch((err) => console.log("Xabarni yuborishda xatolik:", err));
  } else {
      console.log("Iltimos, xabar kiriting");
  }
});


// Initial fetch
fetchFunc();
// fetchFuncTwo();
function fetching() {
fetch(apiuser).then(data=>data.json()).then(data=>logdata(data)
)
  
}fetching()

function logdata(data){
  data.forEach((value)=>{
    console.log(value)
    
  })
}