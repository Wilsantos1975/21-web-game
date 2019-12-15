document.addEventListener("DOMContentLoaded",() => {
    let deck_id;
    let playerOne = document.querySelector("#playerOne")
    let house = document.querySelector("#house")
    let scorePlayer = 0;
    let computerScore = 0

const fetchCards = async ()=> {
    try{
        let res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
        deck_id = res.data.deck_id
        let shuffled = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
        shuffled
    } catch (err) {
        console.log("error")
    }
}

// fetchCards();

const drawCards  = async (deck_id,div,num,score)=>{
    try {
        let Num1 = 0
        let drawData = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${num}`)
      
        for(let i = 0; i < num; i++){
            let image = document.createElement("img")
            let url = drawData.data.cards[i].image
            let value = drawData.data.cards[i].value
            Num1 += getValue(value,score)
            image.src = url
    
            div.appendChild(image) 
            
        }
        debugger
        
       
        //    let score = score.value 
       
    } catch(err) {
        console.log(err);
    }
    debugger
    score += Num1
    let p = document.createElement("p")
    p.innerText = score
    div.appendChild(p)

}

const getValue  = (deck_id,score) => {
    // let numAces = 0;
    deck_id.forEach((el) => {
        if(el.value === "QUEEN" || el.value === "KING" || el.value === "JACK") {
            score += 10
        } else if ( el.value === "ACE") {
        if(score <=10){
            score += 11
        } else {
            score += 1
        }
        } else {
            score += Number(value)
        }
    
      return score   
    }
    })
let startBtn = document.querySelector("#start")

startBtn.addEventListener("click",()=>{

    drawCards(deck_id, playerOne,2, scorePlayer);

})

    let hitBtn = document.querySelector("#Hit");
    hitBtn.addEventListener("click", () => {
        drawCards(deck_id,playerOne,1,scorePlayer)

    })
    let stayBtn = document.querySelector("#stay");
    stayBtn.addEventListener("click",() => {
        drawCards(deck_id, house,3)
    })
    fetchCards();
})