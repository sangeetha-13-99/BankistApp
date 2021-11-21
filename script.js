
//data 

const account1={
    owner:"Jonas schemedtmann",
    movements:[200,450,-400,3000,-100,300,-450,90,170],
    interestRate:1.2,
    pin:1111
}; 

const account2={
    owner:"Jone",
    movements:[20,40,400,3000,-100,-300,-450,90,170,1000,-3000],
    interestRate:1.4,
    pin:4444
};

const account3={
    owner:"Sangeetha",
    movements:[200,40,4000,-3000,-10,300,-50,90,10],
    interestRate:1.6,
    pin:3333
};

const account4={
    owner:"Jessica",
    movements:[200,45,-40,3000,-100,300,-45,90,170,1000],
    interestRate:1.5,
    pin:2222
}; 

let timerFunction;

let accounts=[account1,account2,account3,account4]; 


// initializing dom elements 

//nav
let welcome=document.querySelector('.welcome'); 
//user logins
let userLogin=document.querySelector('.login_user');
let pinLogin=document.querySelector('.login_pswd');
let userLoginBtn=document.querySelector('.userlogin_btn');  

//app 
let app=document.querySelector('.app'); 
app.style.opacity=0;
//display date and balance of user
let balanceDate=document.querySelector(".balance_date"); 
let balanceAmount=document.querySelector(".balance_amount"); 

//movements 
let movements_=document.querySelector(".movements"); 

let movementDeposite=document.querySelector(".movement_deposit"); 
let movementWithdraw=document.querySelector(".movement_withdraw"); 

let movementDate=document.querySelector(".movement_date"); 
let movementAmount=document.querySelector(".movement_amount");  

//accounts 

//transfer
let transferToUser=document.querySelector(".transfer_user"); 
let transferToUserAmt=document.querySelector(".transfer_amt"); 
let tranferBtn=document.querySelector(".tmoney_btn"); 


//request loan 
let requestAmount=document.querySelector(".request_amount"); 
let requestBtn=document.querySelector(".loan_btn"); 

//close account
let closeUser=document.querySelector(".close_user"); 
let closeUserPin=document.querySelector(".close_pin"); 
let closeBtn=document.querySelector(".close_btn"); 

//summary 

//In and Outs 

let amountIN=document.querySelector("#amount-in"); 
let amountOut=document.querySelector("#amount-out"); 
let amountInterest=document.querySelector("#amount-interest"); 

// sort 

let sorting=document.querySelector(".sort"); 
var sorted=false;


//time 

let timing=document.querySelector("#time"); 




/* implementing*/


//nav bar 
userLoginBtn.onclick=function(e){
    // console.log(this);
    
    e.preventDefault();

    login();

}; 


function login(){ 
    
    let count=0;
    for (let {owner,pin,movements,interestRate} of accounts){
        if (userLogin.value === owner[0]+owner[owner.length-1]
            && parseInt(pinLogin.value) === (pin)){
                
                app.style.opacity=100;
                
                welcome.innerHTML=`Welcome, ${owner}`; 
                app.style.opacity=100; 
    
                userLogin.value="";
                pinLogin.value="";
                pinLogin.blur();
                // console.log(count)
                
                btnfunctionality(accounts[count]);
                appfunctionality(accounts[count]);
                
            
            }
            
            count+=1
    } 
    if (timerFunction) clearInterval(timerFunction);
    startLogoutTimer();
} 











let displayInOuts=(movements,interestRate)=>{

    let ins=0,outs=0,depositesintrest;

    movements.forEach(function(movement){
        // console.log(movement)
        if(movement>=0)ins+=movement;
            
            else outs+=movement;
            
        });
       
        depositesintrest=movements.filter(mov=>mov>0).map(deposite=>(deposite*interestRate)/100).filter(intrest=>intrest>1).reduce((acc,intrest)=>acc+intrest,0)
    
    // interest=(movement*interestRate)/100;
    amountIN.innerHTML=ins + "$";
    amountOut.innerHTML=outs+ "$";
    amountInterest.innerHTML=Math.trunc(depositesintrest)+" $"


}


function displaymovements(mov){
    
    movements_.innerHTML="";
   
    let html="",balance=0;
    mov.forEach(function(movement,index) 
    { 
        let type=movement>=0?'deposit':'withdraw';
      
        
        html= `
        <div class="movement_row"> 
            <p class="movement_type movement_${type}">${index+1} DEPOSIT</p>
            <p class="movement_date">${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}</p>
            <p class="movement_amount">${movement}</p>
        </div>`

        balance+=movement;
    
            
        movements_.insertAdjacentHTML('afterbegin',html);
            
            
        })
        balanceAmount.innerHTML=balance +" $";
        // console.log(balance)
}



function displayapp(){
    // element.insertAdjacentHTML(position, text);
   
    balanceDate.innerHTML="";
    date=new Date(); 
    let hh=`<span>${date}</span>`;
    balanceDate.innerHTML=`As Of ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
} 




function transferAmount(account){
    
    
    console.log(account);
    for(let touser of accounts){
        // console.log(touser,account)
        if (transferToUser.value === touser.owner[0]+touser.owner[touser.owner.length-1] && transferToUserAmt.value !==null && parseInt(transferToUserAmt.value)<=parseInt(balanceAmount.innerHTML)) { 
            
            touser['movements'].push(parseInt(transferToUserAmt.value));
            account['movements'].push(-parseInt(transferToUserAmt.value));
            // displaymovements(account.movements);
            appfunctionality(account);


        }
    }



}




function closeAccount(account){
    // let removableIndex=-1;
    if(closeUser.value === (account.owner[0]+account.owner[account.owner.length-1]) && Number(closeUserPin.value)=== account.pin)
    {

        // accounts.splice(account);  
        // for (let acnt of accounts){
        //     if (acnt.owner === account.owner){
        //         // index=removableIndex;
        //         accounts.splice(removableIndex+1);
        //         break;
        //     }
        //     removableIndex+=1;
        // } 

    let index=accounts.
    findIndex(acc=>(acc.owner)===account.owner) 
    accounts.splice(index,1);  
    welcome.innerHTML="Log In to Your Account"   
    app.style.opacity=0;

}
  
}



function requestLoanAmount(account){
   
    account['movements'].push(parseInt(requestAmount.value));
    appfunctionality(account);

} 

let displaysort =(mov,sorted)=>{
    // console.log(sorted?mov:0);
    let some=mov.slice();
    some.sort((a,b)=>a-b);
    let sort=sorted?some:mov;
    // console.log(sort)
    displaymovements(sort);
};




let appfunctionality=(account)=>
{
   
    displaymovements(account.movements);
    displayInOuts(account.movements,account.interestRate);
    sorting.onclick=function(){
        displaysort(account.movements,!sorted);
        sorted=!sorted;
    }
    // console.log(sorted);
    displayapp();
   
}

let btnfunctionality=(account)=>{
    tranferBtn.onclick=function(e){
        e.preventDefault();
        transferAmount(account);
        clearInterval(timerFunction);
        startLogoutTimer();}
    requestBtn.onclick=function(e){
        e.preventDefault();
        requestLoanAmount(account);
        clearInterval(timerFunction);
        startLogoutTimer();}
    closeBtn.onclick=function(e){
        e.preventDefault();
        closeAccount(account);
        clearInterval(timerFunction);
        }

}

// function setTimeFunction(){
 

// }

let startLogoutTimer=()=>{
let time;
time=600;
    function setTimeFunction(){
    let minutes=String(Math.trunc(time/60)).padStart(2,"0");
    let seconds=String(Math.trunc(time%60)).padStart(2,"0");
    let Timer=`${minutes}:${seconds}`;
    timing.innerHTML=`<strong>${Timer}</strong>`;
    if (time===0){
        // console.log(welcome);
        // console.log(app)
        clearInterval(timerFunction);
        welcome.innerHTML="Log In to Get Started";
        app.style.opacity=0;
    }
    console.log(timing.innerHTML);
    time--;
    
}

setTimeFunction();
timerFunction=setInterval(setTimeFunction,1000)


}
// startLogoutTimer();



















// else 
        // {
            //     html=` 
            //     <div class="movement_row"> 
            //         <p class="movement_type movement_withdraw">${index+1} WITHDRAWAL</p>
            //         <p class="movement_date">${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}</p>
            //         <p class="movement_amount">${movement}</p>
            //     </div>`
            
            
            // }  


// let array=[5,2,4,1,15,8,3];

// let accu=array.reduce((acc,cur,ind,array)=>{
//     return acc+cur;
// },0)
// // console.log(accu) 


// function calcAverageHumanAges(array)
// {
//     let humanAge=array.map(age=>age<=2?2*age:16+4*age); 
//     console.log(humanAge);
//     let humanAgeMoreEighteen=humanAge.filter(age=>age>=18);
//     console.log(humanAgeMoreEighteen);
//     // let count=0;
//     let humanAgeAvg=humanAgeMoreEighteen.reduce((acc,cur,)=>acc+cur,0,);
//     console.log(humanAgeAvg/humanAgeMoreEighteen.length);
//     // console.log(count);
    
// } 
// calcAverageHumanAges(array)
 

// console.log("*************")

// let arrray=[-1,-3,-6,-5];
// let sarray;

// sarray=arrray.some(arr=>
//     arr>0
//     ) 

// console.log(sarray) 




// let x=Array.from(document.getElementsByTagName("img")); 

// x.forEach(e=>{
//     // console.log(e)
//     if (e.getAttribute('alt')=="") {
//         console.log(e);
//     }
// }
// )
 

