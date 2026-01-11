var corners = [];
var isDrawing = false;
var imageLoaded = false;
var myImage;
var centerX = 0;
var centerY = 0;
let newXCtr = 0;
let newYCtr = 0;

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

function loadImage(){
    if(filePath){
        var img = $('#imgPreview');
        var file  = filePath;
        var reader = new FileReader();
        if (file) {            
            reader.onloadend = function (e) {
                myImage = new Image(); 
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
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
                    uploadedImage = myImage;
                 }
               
                myImage.src = e.target.result;                 
              }
              reader.readAsDataURL(file);
              imageLoaded = true;
        } else {
            alert('Invalid file!');
        }
    }
}

$("#cropReset").on('click', function(){
    resetDrawing();
});

function resetDrawing(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
    isDrawing = false;
    startX = 0;
    endX = 0;
    startY = 0;
    endY = 0;

    init();
}

canvas.addEventListener("click", function (event) {
    if (isDrawing && imageLoaded) {
        var x = event.offsetX;
        var y = event.offsetY;
        corners.push({ x, y });
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
    }
});

$("#startPolygon").on('click', function(){
    corners = [];
    isDrawing = true;

    $("#stopPolygon").prop('disabled', false);
    $("#startPolygon").prop('disabled', true);
});

$("#stopPolygon").on('click', function(){    
    isDrawing = false;

    $("#stopPolygon").prop('disabled', true);
    $("#startPolygon").prop('disabled', false);
    $("#cropReset").prop('disabled', false);
    $("#addWheel").prop('disabled', false);

    if(corners.length >= 3){
        calculateAreaAndCenter();
    }
});

function calculateAreaAndCenter() {
    var area = calculatePolygonArea(corners);
    var center = calculatePolygonCenter(corners);
    console.log("Calculated Center:", center);
    console.log("Area: " + area + " square pixels");
    console.log("Center: (" + center.x + ", " + center.y + ")");

    centerX = center.x;
    centerY = center.y;

    overlayWheelImage(centerX, centerY);
}

function calculatePolygonArea(vertices) {
    var area = 0;
    var j = vertices.length - 1;
    
    for (var i = 0; i < vertices.length; i++) {
      area += (vertices[j].x + vertices[i].x) * (vertices[j].y - vertices[i].y);
      j = i;
    }
    
    return Math.abs(area) / 2;
}

function calculatePolygonCenter(vertices) {
    centerX = 0;
    centerY = 0;
    var j = vertices.length - 1;

    for (var i = 0; i < vertices.length; i++) {
        var factor = vertices[j].x * vertices[i].y - vertices[i].x * vertices[j].y;
        centerX += (vertices[j].x + vertices[i].x) * factor;
        centerY += (vertices[j].y + vertices[i].y) * factor;
        j = i;
    }
    
    var polygonArea = calculatePolygonArea(vertices);
    centerX /= 6 * polygonArea;
    centerY /= 6 * polygonArea;
    
    return { x: centerX.toFixed(2), y: centerY.toFixed(2) };
}

function overlayWheelImage(centerX, centerY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);
    console.log(canvas.height,canvas.width);//500 ,347
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#000";
    ctx.fill();
}

$("#addWheel").on('click', function(){
    addWheel();
    cropFloor();
});

function addWheel(){
    $("#nextMain").hide(1000, function(){
        $("#nextMain").remove();
    });
    $("#floorWithWheel").show();
}

let ccWidth = 0; 
let ccHeight = 0; 

function cropFloor(){
    var croppedCanvas = document.getElementById("imgCropFloor");    
    var croppedCtx = croppedCanvas.getContext("2d");
    
    ccWidth = 0; //croppedCanvas.width - 180;
    ccHeight = 0; //croppedCanvas.height - 180;
    
    if(canvas.width > canvas.height){
        ccWidth = (550 / canvas.width) * canvas.width;
        ccHeight = (350 / canvas.height) * canvas.height;     

    } else {
        ccWidth = (350 / canvas.width) * canvas.width;
        ccHeight = (550 / canvas.height) * canvas.height;
    } 
    
    croppedCanvas.width = ccWidth; //400;
    croppedCanvas.height = ccHeight; //320;

    // Draw the cropped image on the new canvas
    croppedCtx.drawImage(
        uploadedImage,
        0,
        0,     
        ccWidth,
        ccHeight
    );
    
    newXCtr = (ccWidth * centerX) / canvas.width;
    newYCtr = (ccHeight * centerY) / canvas.height;  

    croppedCtx.arc(newXCtr, newYCtr, 5, 0, 2 * Math.PI);
    croppedCtx.fillStyle = "#f00";
    croppedCtx.fill();

    displayWheel();
}

function displayWheel(){
   
    let ddDiv = $("#divToDowload");
    let wDiv = $("#imgWheel");
    let wWidth = wDiv.width();
    let wHeight = wDiv.height();
    let pWidth = ddDiv.width();
    let pHeight = ddDiv.height();

    let imgFloorCanvasLeft = ((pWidth / 2) - ccWidth) + (newXCtr / 2) + 100;
    let imgFloorCanvasTop = ((pHeight / 2) - ccHeight) + (newYCtr / 2) + 50; 

    let imgWheelLeft = ((pWidth / 2) - (wWidth / 2)) - 15;
    let imgWheelTop  = ((pHeight / 2) - (wHeight / 2)) - (newYCtr / 2) - 10;

    $("#imgCropFloor").css({
        top: imgFloorCanvasTop + 'px',
        left: imgFloorCanvasLeft + 'px'
    });

    $("#imgWheel").css({
        top: imgWheelTop + 'px',
        left: imgWheelLeft + 'px'
    });    
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
            a.download = 'vastu.jpg';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
    });    
})

$("#home").on('click',function(){
    location.reload(true);
})