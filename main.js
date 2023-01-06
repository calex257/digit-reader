var loadFile = function (event) {
  var image = document.getElementById('image');
  image.src = URL.createObjectURL(event.target.files[0]);
};

document.querySelector('.buton').addEventListener('click', (e) => {
  let data = new FormData();
  let image = document.querySelector("#intrare").files[0];
  console.log(image)
  data.append('image', image, "img");

  fetch('/submitted_photo', {
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

function getNumar() {
  document.getElementById("raspuns").innerHTML = "Numarul este: " + JSON.parse(data);
  document.getElementById("raspuns").style.display = "block";
}

const width = 320; // We will scale the photo width to this
let height = 0; // This will be computed based on the input stream

let streaming = false;


let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let photo = document.getElementById('photo');
let startbutton = document.getElementById('startbutton');

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error(`An error occurred: ${err}`);
  });

video.addEventListener(
  "canplay",
  (ev) => {
    if (!streaming) {
      height = (video.videoHeight / video.videoWidth) * width;

      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      streaming = true;
    }
  },
  false
);

startbutton.addEventListener(
  "click",
  (ev) => {
    takepicture();
    ev.preventDefault();
  },
  false
);

function clearphoto() {
  const context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}


let bl;
//const imageOut = document.querySelector('#image-out');

function takepicture() {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    canvas.style.display = "none"
    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
    console.log(photo);
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        const arrayBuffer = reader.result;
        //bufferByteLen.textContent = arrayBuffer.byteLength + ' bytes.';
        console.log(arrayBuffer)
        // Dispay Blob content in an Image.
        bl = new Blob([arrayBuffer], {type: "image/png"});
        console.log(bl)
        const fd = new FormData();
        fd.append("image", bl, "img");
        fetch('/taken_photo', {
          method: 'POST',
          body: data
        }).then(async (_res) => {
          const result = await _res.json();
          console.log(result);
          document.getElementById("raspuns").innerHTML = "Numarul este: " + result["name"];
          document.getElementById("raspuns").style.display = "block";
          console.log(document.getElementById("raspuns"))
        });
        //imageOut.src = URL.createObjectURL(bl);
      });
      reader.readAsArrayBuffer(blob);
    });
  } else {
    clearphoto();
  }
}

  document.getElementById("istoric").addEventListener("click", ()=>
  {
    let len= this.files.length;
    if(len==0)
    {
       return;
    }
    else
    {
      let slideshow= document.getElementById("container");
	  slideshow.style.display="block";
      for(let i=0;i<len;i++)
	  {
		let slide= document.createElement("div");
		slide.className="mySlides";
		let img= document.createElement("img");
		let number= document.createElement("div");
		number.className="numbertext";
		img.src= this.files[i];
		img.style.width="100%";
		number.appendChild(img)
		slide.appendChild(number);
		slideshow.appendChild(slide);
      }
	  let slideIndex = 1;
 	  showSlides(slideIndex);
    }
  });
  
  
  function plusSlides(n) 
  {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) 
  {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) 
{
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
  }

