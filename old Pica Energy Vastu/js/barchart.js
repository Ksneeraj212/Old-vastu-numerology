let canvas1 = document.getElementById("floor-plan-canvas");
let ctx1 = canvas1.getContext("2d");
var corners = [];
var isDrawing = false;
var imageLoaded = false;
var wheelImage = new Image();
var baseImage;
var center={ x: 0, y: 0 };
var vertices=[];
var barChart;
document.getElementById("download-bar-chart-btn").addEventListener("click", function () {
    downloadBarChart();
});

function downloadBarChart() {
    var link = document.createElement("a");
    link.href = document.getElementById("bar-chart").toDataURL("image/png");
    link.download = "bar-chart.png";
    link.click();
}
const directions = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE",
    "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW","NNW"
  ];
document.getElementById("start-polygon-btn").addEventListener("click", function () {
    startDrawing();
});

document.getElementById("end-polygon-btn").addEventListener("click", function () {
    isDrawing = false;

    document.getElementById("start-polygon-btn").disabled = false;
    document.getElementById("end-polygon-btn").disabled = true;

    if (corners.length >= 3) {
        calculateAreaAndCenter();
        updateWindDirectionTable();

        // Update or create a bar chart
        updateBarChart();
    }
});
function calculateMinMaxAvg() {
    // Calculate min, max, and sum
    let areas = directions.map((direction, index) => calculatePolygonAreanew([center, vertices[index], vertices[(index + 1) % vertices.length]]));
    let min = Math.min(...areas);
    let max = Math.max(...areas);
    let sum = areas.reduce((acc, val) => acc + val, 0);
    let avg = sum / areas.length;

    return { min, max, avg };
}



function updateBarChart() {
    var ctxBarChart = document.getElementById("bar-chart").getContext("2d");
    let { min, max, avg } = calculateMinMaxAvg();
    console.log(min,max,avg)
    if (barChart) {
        // Update existing chart
        barChart.data.datasets[0].data = directions.map((direction, index) => calculatePolygonAreanew([center, vertices[index], vertices[(index + 1) % vertices.length]]).toFixed(1));

        // Assign different colors based on wind direction
        barChart.data.datasets[0].backgroundColor = directions.map(direction => {
            switch (direction) {
                
                                    case "N":
                                        case "NNE":
                                        case "NE":
                                        
                                            return "darkblue";
                                        case "ENE":
                                        case "E":
                                        case "ESE":
                                      
                                            return "green";
                                        case "SE":
                                        case "SSE":
                                        case "S":
                                      
                                            return "red";
                                        case "SSW":
                                        case "SW":
                                            return "yellow";
                    
                                            case "WSW":
                                                case"W":
                                                case"WNW":
                                                case "NW":
                                                return "lightgrey";
                                                case "NNW":
                                                    return"darkblue";
                                        default:
                                            return "rgba(75, 192, 192, 0.2)";
                                }
            
        });

        barChart.data.datasets[0].borderColor = directions.map(direction => {
            switch (direction) {
                case "N":
                                        case "NNE":
                                        case "NE":
                                       
                                            return "darkblue";
                                        case "ENE":
                                        case "E":
                                        case "ESE":
                                      
                                            return "green";
                                        case "SE":
                                        case "SSE":
                                        case "S":
                                      
                                            return "red";
                                        case "SSW":
                                        case "SW":
                                            return "yellow";
                    
                                            case "WSW":
                                                case"W":
                                                case"WNW":
                                                case "NW":
                                                    return "lightgrey";
                                                case "NNW":
                                                    return"darkblue";
                                        default:
                                            return "rgba(75, 192, 192, 0.2)";
                                }
            
        });

        barChart.update();
    } else {
        // Create new chart
        barChart = new Chart(ctxBarChart, {
            type: "bar",
            data: {
                labels: directions,
                datasets: [{
                    label: "Area",
                    data: directions.map((direction, index) => calculatePolygonAreanew([center, vertices[index], vertices[(index + 1) % vertices.length]]).toFixed(1)),
                    // Assign different colors based on wind direction
                    backgroundColor: directions.map(direction => {
                        switch (direction) {
                                                        case "N":
                                                            case "NNE":
                                                            case "NE":
                                                            
                                                                return "darkblue";
                                                            case "ENE":
                                                            case "E":
                                                            case "ESE":
                                                          
                                                                return "green";
                                                            case "SE":
                                                            case "SSE":
                                                            case "S":
                                                          
                                                                return "red";
                                                            case "SSW":
                                                            case "SW":
                                                                return "yellow";
                                        
                                                                case "WSW":
                                                                    case"W":
                                                                    case"WNW":
                                                                    case "NW":
                                                                        return "lightgrey";
                                                                    case "NNW":
                                                                        return"darkblue";
                                                            default:
                                                                return "rgba(75, 192, 192, 0.2)";
                                                    }
                    }),
                    borderColor: directions.map(direction => {
                        switch (direction) {
                                                        case "N":
                                                case "NNE":
                                                case "NE":
                                               
                                                    return "darkblue";
                                                case "ENE":
                                                case "E":
                                                case "ESE":
                                              
                                                    return "green";
                                                case "SE":
                                                case "SSE":
                                                case "S":
                                              
                                                    return "red";
                                                case "SSW":
                                                case "SW":
                                                    return "yellow";
                            
                                                    case "WSW":
                                                        case"W":
                                                        case"WNW":
                                                        case "NW":
                                                            return "lightgrey";
                                                        case "NNW":
                                                            return"darkblue";
                                                default:
                                                    return "rgba(75, 192, 192, 0.2)";
                                                    }
                                                }),
                    
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                barPercentage: 0.8, 
                categoryPercentage: 0.8,
                plugins: {
                    annotation: {
                        annotations: [{
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y',
                            value: min, // set your min value here
                            borderColor: 'red',
                            borderWidth: 2,
                            label: {
                                content: '',
                                enabled: true
                            }
                        },
                        {
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y',
                            value: avg, // set your avg value here
                            borderColor: 'green',
                            borderWidth: 2,
                            label: {
                                content: '',
                                enabled: true
                            }
                        },
                        {
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y',
                            value: max, // set your max value here
                            borderColor: 'blue',
                            borderWidth: 2,
                            label: {
                                content: '',
                                enabled: true
                            }
                        }]
                    }
                }
            }
        });
    }
}


canvas1.addEventListener("click", function (event) {
    if (isDrawing && imageLoaded) {
        var x = event.offsetX;
        var y = event.offsetY;
        corners.push({ x, y });
        vertices.push({x,y});
        ctx1.beginPath();
        ctx1.arc(x, y, 5, 0, 2 * Math.PI);
        ctx1.fillStyle = "#ff0000";
        ctx1.fill();
    }
});

function startDrawing() {
    corners = [];
    isDrawing = true;

    document.getElementById("start-polygon-btn").disabled = true;
    document.getElementById("end-polygon-btn").disabled = false;
}

function endDrawing() {
    isDrawing = false;

    document.getElementById("start-polygon-btn").disabled = false;
    document.getElementById("end-polygon-btn").disabled = true;

    if (corners.length >= 3) {
        calculateAreaAndCenter();
        }
    for (let i = 0; i < vertices.length; i++) {
        const currentVertices = [center, vertices[i], vertices[(i + 1) % vertices.length]];
        const area = calculatePolygonAreanew(currentVertices);
        console.log(`Area for vertices ${i + 1}: ${area.toFixed(1)}`);
      }
}
function calculatePolygonAreanew(vertices) {
    var area = 0;

    for (var i = 0; i < vertices.length; i++) {
        var currentVertex = vertices[i];
        var nextVertex = vertices[(i + 1) % vertices.length];

        area += (currentVertex.x * nextVertex.y) - (nextVertex.x * currentVertex.y);
    }

    return Math.abs(area) / 2;
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
      var centerX = 0;
      var centerY = 0;
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
      center={x:centerX.toFixed(2),y:centerY.toFixed(2)};
      return { x: centerX.toFixed(2), y: centerY.toFixed(2) };
    }
function calculateAreaAndCenter() {
    var area = calculatePolygonArea(corners);
    var center = calculatePolygonCenter(corners);
    console.log("Calculated Center:", center);
    document.getElementById("area").innerHTML = "Area: " + area + " square pixels";
    document.getElementById("center").innerHTML = "Center: (" + center.x + ", " + center.y + ")";

    var centerX = center.x;
    var centerY = center.y;

    ctx1.beginPath();
    ctx1.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx1.fillStyle = "#ffff00";
    ctx1.fill();
    updateBarChart();
}

document.getElementById("floor-plan-input").addEventListener("change", function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        baseImage = new Image();
        baseImage.onload = function () {
            if (baseImage.width > baseImage.height) {
                canvas1.width = 1200;
                canvas1.height = (1200 / baseImage.width) * baseImage.height;
            } else {
                canvas1.width = (1200 / baseImage.height) * baseImage.width;
                canvas1.height = 1200;
            }
            ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
            ctx1.drawImage(baseImage, 0, 0, canvas1.width, canvas1.height);
            imageLoaded = true;
        };
        baseImage.src = e.target.result;

        wheelImage.src = 'images/Wheelimage.png'; 
    };
    reader.readAsDataURL(file);
});


var windDirectionTableBody = document.querySelector("#wind-direction-table tbody");

function updateWindDirectionTable() {
    windDirectionTableBody.innerHTML = "";
    for (let i = 0; i < directions.length; i++) {
        const currentVertices = [center, vertices[i], vertices[(i + 1) % vertices.length]];
        const area = calculatePolygonAreanew(currentVertices).toFixed(1);
        const direction = directions[i];

        // Add row to the table
        windDirectionTableBody.innerHTML += `<tr><td>${direction}</td><td>${area}</td></tr>`;
    }
}