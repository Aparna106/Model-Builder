window.onload = function () {
  paper = Raphael(0, 0, 1270, 700).draggable.enable();
  var pallet = paper.rect(1, 50, 100, 600);
  var canvas = paper.rect(150, 50, 800, 600); //var canvas
  var prop = paper.rect(1000, 50, 100, 600);

  var compLabel = pallet.paper.text(50, 70, "Components").attr("font", "14px Arial").attr("fill", "#000000");
  var connLabel = pallet.paper.text(50, 370, "Connectors").attr("font", "14px Arial").attr("fill", "#000000");
  var propLabel = pallet.paper.text(1050, 70, "Properties").attr("font", "14px Arial").attr("fill", "#000000");

  attrs = { fill: "white" };
  shape();
  //   cloneObject();
};

function shape() {
  var circleShapesArray = []; // Array to store circle shapes
  var squareShapesArray = []; // Array to store square shapes
  var triangleShapesArray = []; // Array to store triangle shapes
  var lineArray = [];
  var triangleShape = paper.image("assets/condensor.svg", 30, 260, 40, 40).attr(attrs).draggable.enable();
  cloneObject(triangleShape, triangleShapesArray);
  var circleShape = paper
    .circle(50, 150, 20)
    .attr({ fill: "white", "stroke-width": 4, stroke: "red" })
    .draggable.enable();
  cloneObject(circleShape, circleShapesArray);

  var squareShape = paper
    .rect(30, 200, 40, 40)
    .attr({ fill: "white", "stroke-width": 4, stroke: "green" })
    .draggable.enable();
  cloneObject(squareShape, squareShapesArray);

  var horizontalLinePath = "M20,400 L 50,400 75,400";
  var horizontalLine = paper.path(horizontalLinePath);
  horizontalLine.attr({
    "stroke-width": 4,
    stroke: "#000000",
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  });

  var startDot = paper.circle(20, 400, 5);
  startDot.attr({
    fill: "blue",
    cursor: "move",
  });
  var midDot = paper.circle(50, 400, 5);
  midDot.attr({
    fill: "blue",
    cursor: "move",
  });

  var endDot = paper.circle(75, 400, 5);
  endDot.attr({
    fill: "blue",
    cursor: "move",
  });

  var line = paper.set();
  line.draggable.enable();
  line.push(horizontalLine, startDot, midDot, endDot);
  cloneObject(line, lineArray);
}

function cloneObject(object, array) {
  var clone = object.clone();
  clone.draggable.enable();
  array.push(clone);
}
