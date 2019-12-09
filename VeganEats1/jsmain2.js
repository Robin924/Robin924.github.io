var veganContainer =document.getElementById("vegan-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET','https://robin924.github.io/loll.json' );
  ourRequest.onload = function(){
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);

  };
  ourRequest.send();


});

function renderHTML(data){
    var htmlString = "";

    for(i = 0; i < data.length; i++){
      htmlString += "<p>" + data [i].name + " is " + data[i].location + ".</p>" 
    }

    veganContainer.insertAdjacentHTML('beforeend',htmlString);

}
