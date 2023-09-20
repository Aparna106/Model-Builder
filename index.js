window.onload = function () {
  paper = Raphael(0, 0, 1270, 700).draggable.enable();
  // var paper = Raphael("paperMain", 1270, 700).draggable.enable();
  var pallet = paper.rect(1, 50, 100, 600);
  var canvas = paper.rect(150, 50, 800, 600); //var canvas
  var prop = paper.rect(1000, 50, 100, 600);

  // var paper = new Raphael(document.getElementById("drag"), 1400, 934);

  var compLabel = pallet.paper.text(50, 70, "Components").attr("font", "14px Arial").attr("fill", "#000000");

  var connLabel = pallet.paper.text(50, 370, "Connectors").attr("font", "14px Arial").attr("fill", "#000000");

  var propLabel = pallet.paper.text(1050, 70, "Properties").attr("font", "14px Arial").attr("fill", "#000000");

  attrs = { fill: "white" };

  // singleRect();
  // ellipse();
  // set();
  shape();
  cloneObjects();
  // circle();
  // square();
  // line();
  // testSet();
};

// function singleRect() {
//     paper.rect(0, 0, 100, 100).attr(attrs).draggable.enable();
// }

// function ellipse() {
//     paper.ellipse(150, 150, 50, 100).attr(attrs).draggable.enable();
// }

// function set() {
//     var rect = paper.rect(300, 300, 100, 100).attr(attrs);

//     var circle = paper.circle(350, 350, 20).attr(attrs);

//     var set = paper.set();
//     set.draggable.enable();
//     set.push(rect);
//     set.push(circle);
// }

function shape() {
  var triangleShape = paper.image("assets/condensor.svg", 30, 260, 40, 40).attr(attrs).draggable.enable();

  var circleShape = paper
    .circle(50, 150, 20)
    .attr({ fill: "white", "stroke-width": 4, stroke: "red" })
    .draggable.enable();

  var squareShape = paper
    .rect(30, 200, 40, 40)
    .attr({ fill: "white", "stroke-width": 4, stroke: "green" })
    .draggable.enable();

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

  // var paper = Raphael(document.getElementById("paper"));
  // paper.setSize("100%", "100%");

  //FOR NO FILL COLOUR, MAKE SET, MAKE SET DRAGGABLE, THEN ATTR FILL COLOUR TO SET.

  var testSet = paper.set();
  var circle1 = paper.circle(50, 50, 30);
  var circle2 = paper.circle(70, 50, 40);
  testSet.draggable.enable();
  testSet.push(circle1);
  testSet.push(circle2);
  testSet.attr({
    stroke: "black",
    "stroke-width": "2",
    fill: "white",
    "fill-opacity": "0",
  });
  testSet.click(function () {
    selObject = testSet;
  });
  console.log(testSet);
}

function cloneObjects() {
  var circleShapesArray = []; // Array to store circle shapes
  var squareShapesArray = []; // Array to store square shapes
  var triangleShapesArray = []; // Array to store triangle shapes
  var lineArray = [];
}
