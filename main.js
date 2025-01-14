const api = "https://676afc4abc36a202bb83d19d.mockapi.io/api/v20/messages"

function fetchFunc(){
  fetch(api)
.then((res)=>res.json())
.then((data)=>funcFetch(data))
.catch((err)=>console.log(err))
}
const messageWrap = document.querySelector(".message")

function funcFetch(data){
  data.forEach((message) => {
    const messageCount = document.createElement("div");
    messageCount.classList.add("messageCount")

    messageCount.innerHTML = `
      <p>
        ${message.title}
      <p/>
    `
    messageWrap.append(messageCount)
});
}


const sendBtn = document.getElementById("send")

sendBtn.addEventListener("click",()=>{
  const messageInput = document.getElementById("messageInput").value.trim()
  if(messageInput){
      fetch(api,{
          method:"POST",
          body:JSON.stringify({title:messageInput}),
          headers:{
              "Content-type":"application/json"
          }
      })
      .then((res)=>res.json())
      .then((data)=>{
          fetchFunc()
          document.getElementById("messageInput").value = "";
      })
      .catch((err)=>console.log(err))
  }else{
      console.log("Iltimos malumot kiriting");
  }    
})

fetchFunc()