const api1 = "https://6787ed4fc4a42c916108c702.mockapi.io/message";
const apiuser = "https://6787ed4fc4a42c916108c702.mockapi.io/users";
// const api2 = "https://6787ed4fc4a42c916108c702.mockapi.io/message";
const sendBtn = document.getElementById("send");
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

let localUser = localStorage.getItem("loggedInUser")
let localUserItems = JSON.parse(localUser)

hamUser.textContent = localUserItems.username;
hamUserNumber.textContent = localUserItems.phone_number;
hamUserEmail.textContent = localUserItems.email;
hamUserImg.src = localUserItems.img 



function fetchFunc() {
  fetch(apiuser)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        let leftUser = document.createElement("div");
        leftUser.setAttribute("data-user-id", element.id);
        leftUser.classList.add("flex", "p-[10px]", "cursor-pointer", "items-center", "border", "border-black", "gap-[20px]", "bg-[#77a2e1c4]");
        leftUser.innerHTML = `
          <div>
              <img class="w-[60px] h-[60px] rounded-full" src=${element.img} alt="">
          </div>
          <div class="text-white">
              <h3>${element.username}</h3>
              <p>Message send</p>
          </div>
        `;
        leftUsers.append(leftUser);
      });
    })
    .catch((err) => console.log(err));
}

leftUsers.addEventListener("click", (e) => {
  user_panel.innerHTML =""
  const clickedUser = e.target.closest("div[data-user-id]");
  if (clickedUser) {
    const userId = clickedUser.getAttribute("data-user-id");

    fetch(`${apiuser}/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        let user_panels = document.createElement("div")
        user_panels.style.height = "100%"
        user_panels.innerHTML=`
                      <div class="user h-full flex flex-col justify-between">
                <div class="bg-[#517DA2] flex justify-between items-center px-[20px] z-20">
                    <li class="flex items-center gap-6 px-[20px]  py-[5px]">
                        <img src="../assets/svg/arrow-left.svg" alt="">
                        <img src=${user.img} class="w-[100%] max-w-[50px] rounded-full" alt="logo">
                        <div class="flex flex-col  gap-1 text-white">
                            <h3 class="font-bold text-[18px]">${user.username}</h3>
                            <p class="online">Online</p>
                            <p class="typing hidden">Typing...</p>
                        </div>
                    </li>
                    
                    <div>
                        <img src="../assets/svg/three-dot.svg" alt="">
                    </div>
                </div>
                <div class="h-[80%]  ">
                    <div class="message  h-full flex items-end gap-[10px] overflow-y-scroll mr-2 pb-4 flex-col z-10">
                        
                        
                    </div>
                </div>
                <div class="flex items-end w-[100%]">
                    <div class="bg-white py-[8px] gap-[20px] flex w-full px-[20px]">
                            <button class="flex items-center gap-1 py-[4px] text-[20px] px-[10px] rounded-full bg-[dodgerblue] text-white">
                                <i class='bx bx-menu'></i>
                                Menu
                            </button>
                            <a href="#">
                                <i class='bx bx-smile text-[40px] text-gray-400' ></i>
                            </a>
                        <form id="send" class="flex w-[100%] gap-[20px]">
                            <input type="text"
                            required
                            class="w-[80%] border rounded-full px-[20px] text-[18px] border-black outline-none"
                            id="messageInput"
                            >
                            <button type="submit" class="text-white text-[18px] py-[8px] px-[16px] rounded-full bg-[dodgerblue] flex justify-center items-center">
                                Send
                            </button>
                            <a href="#">
                                <i class='bx bx-paperclip text-[40px] text-gray-400'></i>
                            </a>
                            <a href="#">
                                <i class='bx bx-microphone text-[40px] text-gray-400'></i>
                            </a>
                        </form>
    
                    </div>
                </div>
            </div>
        `
        user_panel.append(user_panels);
      })
      .catch((err) => console.log("User ma'lumotlarini olishda xatolik:", err));
  }
});




fetch(api1)
.then((res) => res.json())
.then((data) => (

  data.forEach((value)=>{
       
    
    if(value.senderid == user1.user_id && value.recieverid == recieverid){
      const messageCount = document.createElement("div");
      messageCount.classList.add("messageCount");
  
      messageCount.innerHTML = `
        <p>
          ${value.message}
        <p/>
      `;
      messageWrap.append(messageCount);
    }
  })

))
.catch((err) => console.log(err));



// Typing indicator
// messageInput?.addEventListener("keydown", () => {
//   online.style.display = "none";
//   typing.style.display = "block";
//   setTimeout(() => {
//     online.style.display = "block";
//     typing.style.display = "none";
//   }, 2000);
// });

// Send message to both APIs without Promises
// sendBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const messageText = messageInput.value.trim();
//   if (messageText) {
//     // Send message to the first API
//     fetch(api1, {
//       method: "POST",
//       body: JSON.stringify({ message: messageText }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then(() => {
//         fetch(api2, {
//           method: "POST",
//           body: JSON.stringify({ message: messageText }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//           .then((res) => res.json())
//           .then(() => {
//             fetchFunc();
//             // fetchFuncTwo();
//             messageInput.value = "";
//           })
//           .catch((err) => console.log(err));
//       })
//       .catch((err) => console.log(err));
//   } else {
//     console.log("Iltimos, xabar kiriting");
//   }
// });

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