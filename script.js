var list=document.querySelectorAll('div>.grid-item');
list.forEach(element=>{
    element.addEventListener('click',clickEvent);
})

function clickEvent(e){
    e.target.style.backgroundColor="white";
    setTimeout(function(){e.target.style.backgroundColor="gainsboro";},150);
}