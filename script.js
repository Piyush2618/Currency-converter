const dropList = document.querySelectorAll(".drop-list  select"),
 fromCurrency = document.querySelector(".from  select"),
 toCurrency = document.querySelector(".pp  select"),

getButton = document.querySelector("form button");

for(let i = 0; i < dropList.length; i++){
    for(currency_code in country_code){

        let selected;

        if(i == 0){
            selected = currency_code == "INR" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "NPR" ? "selected" : "";
        }

        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

        dropList[i].insertAdjacentHTML("beforeend", optionTag); 
}
dropList[i].addEventListener("change", e=>{
loadFlag(e.target);
});
} 

function loadFlag(element){
 for (code in country_code){
    if(code == element.value){
        let imgTag = element.parentElement.querySelector("img");
        imgTag.src =`https://flagcdn.com/256x192/${country_code[code].toLowerCase()}.png`;
    }
 }
}

window.addEventListener("load", () =>{
    getExchangeRate();
   
   });
   

getButton.addEventListener("click", e =>{
    
 e.preventDefault();
 getExchangeRate();

});

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1"; 
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting result...";
   let url = `https://v6.exchangerate-api.com/v6/695a1167c9dad900b8680134/latest/${fromCurrency.value}`;
   // let url = 'https://api.exchangerate-api.com/v6/latest';
    
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
         let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
         exchangeRateTxt.innerText= `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
}

