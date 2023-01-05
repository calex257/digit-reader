var loadFile = function(event) {
	var image = document.getElementById('image');
	image.src = URL.createObjectURL(event.target.files[0]);
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
        var arrayBuffer = reader.result; 
        socketControl.uploadImage({ 
            name: file.name, 
            type: file.type, 
            size: file.size, 
            binary: arrayBuffer 
        });
    }
};

document.querySelector('.buton').addEventListener('click', (e) => {  
    let data = new FormData();
    let image = document.querySelector("#intrare").files[0];
    console.log(image)
    data.append('image', image, "img");
  
    fetch('/apiToReceiveImage', {
      method: 'POST',    
      body: data
    }).then(async (_res) => {
      const result = await _res.json();
      console.log(result);
    });
  });

socket.on("send-image", function(data){
    appendImageMessage(data)
    getNumar();
});

function appendImageMessage(data) 
{
    var messageContainer = document.getElementById('message-container');
    messageContainer.appendChild(createImageMessageDOM(data));
}

function getNumar()
{
    document.getElementById("raspuns").innerHTML = "Numarul este: " + JSON.parse(data);
    document.getElementById("raspuns").style.display = "block";
}