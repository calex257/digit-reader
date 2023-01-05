var loadFile = function(event) {
	var image = document.getElementById('image');
	image.src = URL.createObjectURL(event.target.files[0]);
    var file = ele.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
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
});

function appendImageMessage(data) 
{
    var messageContainer = document.getElementById('message-container');
    messageContainer.appendChild(createImageMessageDOM(data));
}