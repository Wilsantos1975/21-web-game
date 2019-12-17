document.addEventListener("DOMContentLoaded",() => {
    let deck_id;
    let playerOne = document.querySelector("#playerOne")
    let house = document.querySelector("#house")
    let scorePlayer = 0;
    let computerScore = 0
    let winner;

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

const drawCards  = async (deck_id,div,num,score)=>{
    let Num1 = 0
    try {
        let drawData = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${num}`)
      
        for(let i = 0; i < num; i++){
            let image = document.createElement("img")
            let url = drawData.data.cards[i].image
            let value = drawData.data.cards[i].value
            Num1 += getValue(value,score)
            image.src = url
    
            div.appendChild(image) 
            
        }
       
    } catch(err) {
        console.log(err);
    }
  
    score += Num1
    let p = document.createElement("p")
    p.innerText = score
    p.style.color = "white"
    div.appendChild(p)

}

const getValue  = (deck_id,score) => {
    // let numAces = 0;
    
        if(deck_id === "QUEEN" || deck_id === "KING" || deck_id === "JACK") {
            score += 10
        } else if ( deck_id === "ACE") {
        if(score <=10){
            score += 11
        } else {
            score += 1
        }
        } else {
            score += Number(deck_id)
        }
    
      return score   
      
}


const isGamerOver = () => {
    if(scorePlayer > computerScore && scorePlayer < 21 ){   
        winner = playerOne
        message.innerText = "player one wins"
        // playerOne.appendChild(message)
        return true
    }else if(computerScore > scorePlayer  && computerScore < 21){
        winner = house
        message.innerText = "House always Wins"
        // house.appendChild(message)
        return true
    } else if (scorePlayer > 21 || computerScore > 21) {
        message.innerText = "BUSTED !!"
        // document.body.appendChild(message)
        return true
    } else {
        return false
    }
}

// const play = () => {
//     if (isGamerOver()) {
        
//     }

// }

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
        isGamerOver()
        debugger
        drawCards(deck_id, house,3,computerScore)
    })
    fetchCards();

})