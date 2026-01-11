let filePath;
let canvas = document.getElementById("imgPreview");
let ctx = canvas.getContext("2d");
let scalingRatio = 0;

init();

function init(){
    $("#cropReset").prop('disabled', true);
    $("#addWheel").prop('disabled', true);
    $("#stopPolygon").prop('disabled', true); 
    $("#imgWheel").draggable();  
    $("#imgCropFloor").draggable();  
}