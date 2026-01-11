let filePath;
let canvas = document.getElementById("imgPreview");
let ctx = canvas.getContext("2d");
let uploadedImage;
let drawing = false;
let startX, startY, endX, endY;
let cropMode = false;
var myImage;
var picaResizedImage; 
init();

$("#floorImgUpload").on('click', function(){
     var fileDialog = $('<input type="file">');
     fileDialog.click();
     fileDialog.on("change", onFileSelected);
     return false;
});

var onFileSelected = function(e){
    filePath = $(this)[0].files[0];
};

$("#btnNext").on('click', function(){
    $("#main").hide(1000, function(){
        $("#main").remove();
    });
    $("#nextMain").show();
    loadImage();
});


$("#cropReset").on('click', function(){
    resetDrawing();
})

$("#cropImg").on('click', function(){  
    cropMode = true;  
    canvas.addEventListener("mousedown", startCrop);
    canvas.addEventListener("mousemove", drawCrop);
    canvas.addEventListener("mouseup", endCrop);
})

$("#addWheel").on('click', function(){
    addWheel();
});

function loadImage(){
    if(filePath){
        var img = $('#imgPreview');
        var file  = filePath;
        var reader = new FileReader();
        if (file) {            
            reader.onloadend = function (e) {
                var myImage = new Image(); 
                myImage.onload = function(){
                    if(myImage.width > myImage.height){
                        width = (700 / myImage.height) * myImage.width;
                        height = (700 / myImage.width) * myImage.height;
                        scalingRatio = 700 / myImage.width;
                    } else {
                        width = (700 / myImage.height) * myImage.width;
                        height = (700 / myImage.height) * myImage.height;
                        scalingRatio = 700 / myImage.height;
                    }
                    canvas.width = width;
                    canvas.height = height;
                    pica().resize(myImage, canvas, {
                        unsharpAmount: 250,
                        unsharpRadius: 5,
                        unsharpThreshold: 10,
                        method: 'lanczos',
                        transferable: true,
                    }).then(() => {
                        picaResizedImage = new Image();
                        picaResizedImage.src = canvas.toDataURL();
                        ctx.imageSmoothingEnabled = false;
                        ctx.drawImage(picaResizedImage, 0, 0, width, height);
                        uploadedImage = picaResizedImage;
                    }).catch((error) => {
                        console.error('Error resizing image:', error);
                    });       
                }
                
                myImage.src = e.target.result; 
                
              }
              reader.readAsDataURL(file);
        } else {
            alert('Invalid file!');
        }
    }
}

function startCrop(event) {
    if(!cropMode) return;
    drawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
} 

function drawCrop(event) {
    if (!drawing) return;
    endX = event.offsetX;
    endY = event.offsetY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    drawCropRect(startX, startY, endX, endY);
}

function endCrop(event) {
    if (!drawing) return;
    drawing = false;
    cropMode = false;

    endX = event.offsetX;
    endY = event.offsetY;
    
    canvas.removeEventListener("mousedown", drawCrop);
    canvas.removeEventListener("mouseup", drawCrop);
    
    $("#cropReset").prop('disabled', false);
    $("#addWheel").prop('disabled', false);
}

function drawCropRect(x1, y1, x2, y2) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x1, y1, x2 - x1, y2 - y1);
    ctx.stroke();
}

function resetDrawing(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    drawing = false;
    cropMode = false;
    startX = 0;
    endX = 0;
    startY = 0;
    endY = 0;

    init();
}

function init(){
    $("#cropReset").prop('disabled', true);
    $("#addWheel").prop('disabled', true);
    $("#imgWheel").draggable();  
    $("#imgCropFloor").draggable(); 
}

function addWheel(){
    $("#nextMain").hide(1000, function(){
        $("#nextMain").remove();
    });
    $("#floorWithWheel").show();
    addWheelToFloor();
}

function addWheelToFloor() {
  var newX = Math.min(startX, endX);
  var newY = Math.min(startY, endY);
  var newWidth = Math.abs(endX - startX);
  var newHeight = Math.abs(endY - startY);

  var scaleX = uploadedImage.naturalWidth / canvas.width;
  var scaleY = uploadedImage.naturalHeight / canvas.height;

  var croppedCanvas = document.getElementById("imgCropFloor");
  var croppedWidth, croppedHeight;

  var myImage = new Image();
  myImage.onload = function () {
    if ((myImage.width/scalingRatio) > (myImage.height/scalingRatio)) {
        croppedWidth = (650 / myImage.width) * myImage.width;
        croppedHeight = (400 /  myImage.height) * myImage.height;
        scalingRatio = 400 / myImage;
      } else {
          croppedWidth = (400 /  myImage.width) * myImage.width;
          croppedHeight = (650 /  myImage.height) * myImage.height;
          scalingRatio = 400 / myImage;
      }

    croppedCanvas.width = croppedWidth;
    croppedCanvas.height = croppedHeight;

    var croppedCtx = croppedCanvas.getContext("2d");

    // Draw the cropped image on the new canvas
    croppedCtx.drawImage(
      uploadedImage,
      newX * scaleX,
      newY * scaleY,
      newWidth * scaleX,
      newHeight * scaleY,
      0,
      0,
      croppedWidth,
      croppedHeight
    );
  };

  myImage.src = uploadedImage.src;
}

function displayWheel(){
    $("#imgWheel").show();
}

jQuery.fn.rotate = function(degrees) {
    $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

$("#rotate").on('click', function(){
    let angleToRotate = $("#degreeToRotate").val();
    
    if(angleToRotate<0 || angleToRotate>360){
        alert('Invalid rotation angle. Please enter value between 0 to 360.');
        $("#degreeToRotate").val('');
        $("#degreeToRotate").focus();
        return false;
    }
    $("#imgWheel").rotate(angleToRotate);
})

$("#download").on('click', function(){
    var divToDownload = document.getElementById("divToDowload");
    html2canvas(divToDownload, 
        {
            useCORS: true,
            allowTaint: true
        }).then(function(canvas){
            const dataURL = canvas.toDataURL('image/jpeg');
            // Create a temporary link element and trigger the download
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = 'vastu.jpeg';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
    }); 
})

$("#home").on('click',function(){
    location.reload(true);
})