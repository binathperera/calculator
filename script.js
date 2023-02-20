var list=document.querySelectorAll('div>.grid-item');
list.forEach(element=>{
    element.addEventListener('click',clickEvent);
})
var operand1,operand2,operation;
var operationSpecified=false;
var operand1Specified=false;
var operand2Specified=false;
function clickEvent(e){
    var line1=document.getElementById('line1');
    var line2=document.getElementById('line2');
    e.target.style.backgroundColor="rgb(33, 33, 33)";
    setTimeout(function(){e.target.style.backgroundColor="rgb(52, 52, 52)";},150);
    var character=e.target.innerText;
    if('1234567890.'.includes(character) && line2.innerText.length>=10){
        window.alert("Can't enter more than 10 digits");
        return;
    }
    if(character=='Del'){
        line2.innerText=line2.innerText.substring(0,line2.innerText.length-1);
        if(line2.innerText.length==0){
            if(operand2Specified){
                operand2Specified=false;
            }else if(!operationSpecified){
                operand1Specified=false;
            }
        }
        return;
    }
    if('+-×÷%'.includes(character) && !operand1Specified)return;
    if(character=='%'){
        if(operand2Specified){
            operand2=line2.innerText;
            var result=doOperation();
            line1.innerText= result+'÷100=';
            operation="÷";
            operand2='100';
            result= doOperation();
            line1.innerText+=result;
            operationSpecified=false;
            operand2Specified=false;
            line2.innerText= result;
        }else{
            line1.innerText= line2.innerText+'÷100=';
            operation="÷";
            operand2='100';
            var result=doOperation();
            line1.innerText+=result;
            operationSpecified=false;
            operand2Specified=false;
            line2.innerText= result;
        }
        return;
    }
    if(character=='.' && line2.innerText.includes('.'))return;
    if(character=='.' && line2.innerText.length==0){
        line2.innerText='0.';
        return;
    }
    if(character=='=' && !operand2Specified)return;
    if(character=='0' && line2.innerText=='0')return;
    if(line2.innerText=='0' && !'+-×÷%.='.includes(character))line2.innerText='';
    if(character=='=' && operationSpecified && operand1Specified && operand2Specified){
        let result=doOperation();
        if(result==undefined)return;
        line1.innerText= line1.innerText+line2.innerText+'=';
        line2.innerText= result;
        operand1= line2.innerText;
        line1.innerText= line1.innerText+line2.innerText;
        operationSpecified=false;
        operand2Specified=false;
        return;
    }
    if(character=='C'){
        line1.innerText='';
        line2.innerText='';
        operationSpecified=false;
        operand1Specified=false;
        operand2Specified=false;
        return;
    }
    if('+-×÷-%'.includes(character) && operationSpecified && operand1Specified && operand2Specified){
        let result=doOperation();
        if(result==undefined)return;
        operand2Specified=false;
        operand1=result;
        line1.innerText= result+character;
        operation=character;
        line2.innerText= '';
        return;
    }

    if('+-×÷-%'.includes(character) && !operationSpecified){
        operationSpecified=true;
        operation=character;
        line1.innerText= line2.innerText+character;
        line2.innerText="";
        return; 
    }
    if('+-×÷-%'.includes(character) && operationSpecified){
        var text=line1.innerText;
        line1.innerText= text.substring(0,text.length-1)+character; 
        operation=character;
        return;
    }
    if(operationSpecified && operand2Specified){
        line2.innerText= line2.innerText+character;
        operand2=line2.innerText;
    }else if(operationSpecified && !operand2Specified){
        line2.innerText= character;
        operand2=line2.innerText;
        operand2Specified=true;
    }else{
        line2.innerText= line2.innerText+character;
        operand1=line2.innerText;
        operand1Specified=true;
    }
}
function doOperation(){
    let result;
    console.log(parseFloat(operand1).toFixed(2)+' '+operation+' '+parseFloat(operand2).toFixed(2));
    switch(operation){
        case '+': result= round(parseFloat(operand1) + parseFloat(operand2)); break;
        case '-': result= round(parseFloat(operand1)-parseFloat(operand2)); break;
        case '×': result= round(parseFloat(operand1)*parseFloat(operand2)); break;
        case '÷':{
                        if(operand2==0){
                            window.alert("Cannot divide by zero!");
                        }else{
                            result= round(parseFloat(operand1)/parseFloat(operand2));
                        }
                } break;
    }
    return result;
}
function round(val){
    return Math.round(val*10000)/10000;
}