const currencyAPI = "https://v6.exchangerate-api.com/v6/50d1e0716f1e0a277365eebe/latest/";
const inp = document.getElementById(`amount`);
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const selectCountry = document.querySelectorAll(".drop-down select");
const btn = document.getElementById(`exchange-btn`);
const display = document.getElementById(`display`);

 
for( let select of selectCountry){

    for( currencyCode in countryList){
        let newOpt = document.createElement(`option`);
        newOpt.innerText = currencyCode;
        newOpt.value = currencyCode;
        select.appendChild(newOpt);

        if(select.name == "from" && currencyCode == "USD"){
            newOpt.selected = "selected";
        }else if(select.name == "to" && currencyCode == "BDT"){
            newOpt.selected = "selected";
        }
    }

    select.addEventListener(`change`,(event)=>{
        updateFlag(event.target);
    });
    
}

function updateFlag(element){
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc
}

async function getRate(){
    let amount = inp.value;
    if(amount < 1 || amount == ""){
        inp.value = 1;
        amount = 1;
    }

    let currURL =  `${currencyAPI}${fromCurr.value}`;
    let response = await fetch(currURL);
    let data = await response.json();
    let rate = ((data.conversion_rates[toCurr.value]) * amount).toFixed(2);
    
    display.innerHTML = amount + ` ` + fromCurr.value + ` = ` + rate + ` ` + toCurr.value;
}

btn.addEventListener(`click`, getRate);
window.addEventListener(`keypress`, (event)=>{
    if(event.key == `Enter`){
        getRate();
    }
})