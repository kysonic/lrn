const xhr = new XMLHttpRequest();

xhr.open('GET','http://vk.com',true);

xhr.send();

xhr.setRequestHeader('Content-Type','application/json');

xhr.onreadystatechange = function(){
    if(xhr.readyState!=4) return;
    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        alert(xhr.responseText);
    }
}

xhr.ontimeout = function(){

}