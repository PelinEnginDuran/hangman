const word_el=document.getElementById("word")
const popup=document.getElementById("pop-up-container")
const message_el=document.getElementById("success-message")
const smile=document.getElementById("emojiSmile")
const popupp=document.getElementById("popup-container")
const sad=document.getElementById("emojiSad")
const message_del=document.getElementById("unsuccess-message")
const wrongLetter=document.getElementById("wrong-letter")
const items=document.querySelectorAll(".item")
const wrong_Message=document.getElementById("wrongMessage")
const playBtn=document.getElementById("play-again")
const playAgainBtn=document.getElementById("playAgain")


const correctLetters=[]
const wrongLetters=[]
let selectedWord=getRandomWord()

function getRandomWord(){
    const words=["javascript","java","python","react"]
    return words[Math.floor(Math.random()* words.length)]
}



function disWord(){
   

    word_el.innerHTML=`
    ${selectedWord.split("").map(letter=>
        `
    <div class="letter">
    ${correctLetters.includes(letter)? letter : ""}</div>
    
    `).join("")}
    
    `
    const w = word_el.innerText.replace(/\n/g,"")
    if(w===selectedWord){
        popup.style.display="flex"
        message_el.innerText="Tebrikler kazandınız"
        smile.style.display="flex"
    }
      

 }

    function updateWrongLetters(){
        wrongLetter.innerHTML=`
        ${wrongLetters.length>0?"<h3>Hatalı Harfler</h3>":''}
        ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
        `
        items.forEach((item,index)=>{
            const errorCount =wrongLetters.length
            if(index<errorCount){
                item.style.display ="block"
            }else{
                item.style.display ="none"
                
            }
        })
        if(wrongLetters.length===items.length){
         popupp.style.display="flex"
        message_del.innerText="Maalesef kaybettiniz"
        sad.style.display="flex"

        }

    }

    function disMessage(){
    wrong_Message.classList.add('show');
    setTimeout(function(){
    wrong_Message.classList.remove('show')

},2000)
}
playBtn.addEventListener("click", function(){
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord=getRandomWord()
    disWord()
    updateWrongLetters()
    popup.style.display="none"
    
})
playAgainBtn.addEventListener("click", function(){
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord=getRandomWord()
    disWord()
    updateWrongLetters()
    popupp.style.display="none"
    
})

    window.addEventListener('keydown', function(e){
        if(e.keyCode >= 65 && e.keyCode <= 90){
            const letter = e.key
            if(selectedWord.includes(letter)){
                if(!correctLetters.includes(letter)){
                    correctLetters.push(letter)
                    disWord()
                }else{
                    disMessage()
                    
                }
            }else{
                if(!wrongLetters.includes(letter)){
                   wrongLetters.push(letter)
                   updateWrongLetters()
                }else{
                    disMessage()

                }

            }


        }
    })

disWord()
