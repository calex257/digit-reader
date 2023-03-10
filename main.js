document.getElementById("sectiune").style.textAlign = "center";
let files =[], clona=[];

var loadFile = function (event) {
  var image = document.getElementById('image');
  image.src = URL.createObjectURL(event.target.files[0]);
  files.push(image.src);
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
console.log(video)
let canvas = document.getElementById('canvas');
let photo = document.getElementById('image');
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
    files.push(photo.src);
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
let slideIndex;

  document.getElementById("istoric").addEventListener("click", ()=>
  {
    copyVector();
    let len= clona.length;
    if(len==0)
    {
       return;
    }
    else
    {
      let slideshow= document.getElementById("rezervor");
      let copii=slideshow.children.length;
      for(let i=0;i<copii;i++)
      {
        if(slideshow.children[i].classList.contains("mySlides"))
        {
          slideshow.removeChild(slideshow.children[i]);
          i--;
          copii--;
        }
      }
	  slideshow.style.display="block";
      for(let i=0;i<len;i++)
	  {
      let slide= document.createElement("div");
      slide.className="mySlides";
      let img= document.createElement("img");
      img.src= clona[i];
      img.classList.add("imagineIstoric");
      slide.appendChild(img);
      slideshow.appendChild(slide);
      }
    }
    files=[];
    slideIndex=1;
    showSlides(slideIndex);
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
    let dots = document.getElementsByClassName("dot");
    if((n>slides.length) || (n<1))
    {
      if(n>slides.length)
      {
        slideIndex=slides.length;
      }
      if(n<1)
      {
        slideIndex=1;
      }
      return;
    }
    for(i=0;i<slides.length;i++)
    {
      slides[i].style.display = "none";
    }
    slides[n-1].style.display = "block";
    for(i=0;i<dots.length;i++)
    {
      dots[i].classList.remove("active");
    }
    dots[n-1].classList.add("active");
  }


  function copyVector()
  {
    for(let i=0;i<files.length;i++)
    {
      clona.push(files[i]);
    }
  }