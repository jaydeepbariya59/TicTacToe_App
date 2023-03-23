let btnRef = document.querySelectorAll(".button-option");
let msgRef = document.getElementById('message');
let newGameBtn = document.querySelector('.new-game');
let restartBtn = document.querySelector('.restart-btn');
let popupRef = document.querySelector('.popup');
//Winning patterns

let winningPattern = [
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6]
];

//Player X plays first
let xTurn = true;

let count = 0;

//disable all buttons
const disableButtons = ()=>{
    btnRef.forEach((element) => (element.disabled = true));

    //enable popup
    popupRef.classList.remove('hide');
}

//enable all buttons (for new game and restart)
const enableButtons = () =>{
    btnRef.forEach((element)=>{
        element.innerText = "";
        element.disabled = false;
    })

    //disable popup
    popupRef.classList.add('hide');
}

//function for draw
const drawFunction = () =>{
    disableButtons();
    msgRef.innerHTML = "It's a DRAW ";
}

//new game event
newGameBtn.addEventListener("click",()=>{
    count=0;
    enableButtons();
})

//restart game event
restartBtn.addEventListener("click",()=>{
    count=0;
    enableButtons();
})

//winner function
const winFunction = (letter)=>{
    disableButtons();

    if(letter == 'X'){
        msgRef.innerText = "'X' Wins";
    }
    else{
        msgRef.innerText = "'O' Wins";
    }
}

//Win Logic
const winChecker = ()=>{

    //loop through all win patterns
    for(let i of winningPattern){
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        //check if elements are filled
        if(element1 !="" && element2 !="" && element3 !=""){
            if(element1 == element2 && element2 == element3){
                //three same element values
                winFunction(element1);
            }
        }
    }

}

//Display X/o on click
btnRef.forEach((element)=>{
    element.addEventListener("click",()=>{
        if(xTurn){
            xTurn = false;

            //Display X
            element.innerText = 'X';
            element.disabled = true;
        }
        else{
           
            xTurn = true;

             //Display O
             element.innerText = "0";
             element.disabled = true;
        }

        //Increment count on each click
        count += 1;
        if(count == 9){
            drawFunction();
        }

        //check for win on every click
        winChecker();
    })
})

window.onload = enableButtons;