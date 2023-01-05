var loadFile = function(event) {
	var image = document.getElementById('image');
	image.src = URL.createObjectURL(event.target.files[0]);
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
      document.getElementById("raspuns").innerHTML = "Numarul este: " + result["name"];
      document.getElementById("raspuns").style.display = "block";
      console.log(document.getElementById("raspuns"))
    });
  });

function getNumar()
{
    document.getElementById("raspuns").innerHTML = "Numarul este: " + JSON.parse(data);
    document.getElementById("raspuns").style.display = "block";
}