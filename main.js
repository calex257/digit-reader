var loadFile = function(event) {
	var image = document.getElementById('image');
	image.src = URL.createObjectURL(event.target.files[0]);
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
        var arrayBuffer = fileReader.result; 
        socketControl.uploadImage({ 
            name: file.name, 
            type: file.type, 
            size: file.size, 
            binary: arrayBuffer 
        });
    }
};

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