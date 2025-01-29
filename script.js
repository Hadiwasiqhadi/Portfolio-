const imageUpload = document.getElementById("imageUpload");
const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");
const sliders = document.getElementById("sliders");
const slider = document.getElementById("slider");
let currentControl = "";
let image = null;

// Step 1: Load and display the image
imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        image = img; // Save the original image
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Step 2: Handle button clicks
document.getElementById("controls").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    currentControl = e.target.dataset.control;
    sliders.style.display = "block";
    slider.value = 100; // Reset slider
  }
});

// Step 3: Apply filter based on slider value
slider.addEventListener("input", () => {
  if (!image) return;

  const value = slider.value;

  // Reset the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  // Apply filter
  switch (currentControl) {
    case "contrast":
      ctx.filter = `contrast(${value}%)`;
      break;
    case "brightness":
      ctx.filter = `brightness(${value}%)`;
      break;
    case "saturation":
      ctx.filter = `saturate(${value}%)`;
      break;
      case "shadow":
  ctx.filter = `brightness(${100 - (value - 100)}%) contrast(${value}%)`; 
  break;
case "clarity":
  
  ctx.filter = `contrast(${value}%) brightness(${value > 100 ? value - 20 : value}%) saturate(${value}%)`;
  break;

    case "blur":
      ctx.filter = `blur(${value / 10}px)`;
      break;
    default:
      ctx.filter = "none";
  }
  ctx.drawImage(image, 0, 0);
});


// download part .....................
const downloadButton = document.getElementById("downloadImage");

downloadButton.addEventListener("click", () => {
  if (!image) {
    alert("Please upload and adjust an image first!");
    return;
  }

  // Create a temporary link element
  const link = document.createElement("a");
  link.download = "w/programing.png"; 
  
  link.href = canvas.toDataURL("image/png"); // Get the image data from the canvas
  link.click(); // Trigger the download
});



