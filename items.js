var paper = new Raphael(document.getElementById("drag"), 1000, 934);
//para = x, y, width, height
var pallet = paper.rect(1, 50, 100, 600);
var canvas = paper;
var rec = paper.rect(150, 50, 800, 600);

var compLabel = pallet.paper
    .text(50, 70, "Components")
    .attr("font", "14px Arial")
    .attr("fill", "#000000");

var connLabel = pallet.paper
    .text(50, 370, "Connectors")
    .attr("font", "14px Arial")
    .attr("fill", "#000000");

var circleShape = paper
    .circle(50, 150, 20)
    .attr({ fill: "white", "stroke-width": 4, stroke: "red" });
var squareShape = paper
    .rect(30, 200, 40, 40)
    .attr({ fill: "white", "stroke-width": 4, stroke: "green" });
var triangleShape = paper.image("assets/condensor.svg", 30, 260, 40, 40);

// Define the initial positions of the blue dots
var startDotX = 20;
var startDotY = 400;
var midDotX = 50;
var midDotY = 400;
var endDotX = 75;
var endDotY = 400;

// Create the Raphael paper
var paper = Raphael("canvas", 400, 400);

// Draw the horizontal line
var horizontalLinePath =
    "M" +
    startDotX +
    "," +
    startDotY +
    " L " +
    midDotX +
    "," +
    midDotY +
    " " +
    endDotX +
    "," +
    endDotY;
var horizontalLine = paper.path(horizontalLinePath);
horizontalLine.attr({
    "stroke-width": 4,
    stroke: "#000000",
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
});

// Create blue dots at the bending corners
var startDot = paper.circle(startDotX, startDotY, 5);
startDot.attr({
    fill: "blue",
    cursor: "move",
    // Disable dragging for the start dot
    draggable: false,
});

var midDot = paper.circle(midDotX, midDotY, 5);
midDot.attr({
    fill: "blue",
    cursor: "move",
});

var endDot = paper.circle(endDotX, endDotY, 5);
endDot.attr({
    fill: "blue",
    cursor: "move",
});

// Register event handlers for dragging the horizontal line
horizontalLine.drag(moveLine, startDrag, endDrag);

// Register event handlers for dragging the dots
midDot.drag(moveDot, startDrag, endDrag);
endDot.drag(moveDot, startDrag, endDrag);

// Event handler for moving the horizontal line
function moveLine(dx, dy, x, y, event) {
    var dxStart = dx * 0.33; // Adjust the movement speed of the line
    var dxEnd = dx * 0.33; // Adjust the movement speed of the line

    // Update the positions of the start and end dots based on the line movement
    startDotX += dxStart;
    midDotX += dx;
    endDotX += dxEnd;

    // Update the path of the horizontal line
    var newPath =
        "M" +
        startDotX +
        "," +
        startDotY +
        " L " +
        midDotX +
        "," +
        midDotY +
        " " +
        endDotX +
        "," +
        endDotY;
    horizontalLine.attr({ path: newPath });
}

// Event handler for moving a dot
function moveDot(dx, dy, x, y, event) {
    var dot = this;

    // Update the position of the dot
    var newX = dot.ox + dx;
    var newY = dot.oy + dy;
    dot.attr({ cx: newX, cy: newY });

    // Update the path of the horizontal line to follow the moved dot
    if (dot === midDot) {
        midDotX = newX;
        midDotY = newY;
    } else if (dot === endDot) {
        endDotX = newX;
        endDotY = newY;
    }

    // Update the path of the horizontal line
    var newPath =
        "M" +
        startDotX +
        "," +
        startDotY +
        " L " +
        midDotX +
        "," +
        midDotY +
        " " +
        endDotX +
        "," +
        endDotY;
    horizontalLine.attr({ path: newPath });
}

// Event handler for the start of dragging
function startDrag() {
    var dot = this;
    dot.ox = dot.attr("cx");
    dot.oy = dot.attr("cy");
}

// Event handler for the end of dragging
function endDrag() {
    // Any additional logic to be executed after dragging ends
}

var circleShapesArray = []; // Array to store circle shapes
var squareShapesArray = []; // Array to store square shapes
var triangleShapesArray = []; // Array to store triangle shapes
var lineArray = [];

paper.set(circleShape);

var createEndpoint = function (shape) {
    var bbox = shape.getBBox();
    var x = bbox.x + bbox.width / 2;
    var y = bbox.y + bbox.height / 2;
    var endpoint = paper.circle(x, y, 5).attr({ fill: "blue", stroke: "none" });
    shape.endpoint = endpoint; // Assign the endpoint to the shape
};

var clone_handler = function () {
    var x = this.clone();
    x.drag(Cmove, Cstart, Cup);
    createEndpoint(x); // Create endpoint for the cloned shape
};
//(x, y, event)
var Cstart = function () {
    this.ox = this.attr("cx");
    this.oy = this.attr("cy");
    this.animate({ transform: "s2", fill: "pink", opacity: 0.9 }, 200);
};

var Cmove = function (dx, dy) {
    this.attr({
        cx: this.ox + dx,
        cy: this.oy + dy,
        transform: "s1.6",
        fill: "pink",
        opacity: 0.8,
    });
    updateEndpoint(this); // Update the endpoint position
};

var Cup = function () {
    this.animate({ transform: "s1", fill: "white", opacity: 1 }, 500);
};

circleShape.mousemove(clone_handler);

paper.set(squareShape);

var clone_handler = function () {
    var x = this.clone();
    x.drag(Smove, Sstart, Sup);
    createEndpoint(x); // Create endpoint for the cloned shape
};
//x, y, event
var Sstart = function () {
    this.ox = this.attr("x");
    this.oy = this.attr("y");
    this.animate({ transform: "s2", fill: "pink", opacity: 0.9 }, 200);
};

var Smove = function (dx, dy) {
    this.attr({
        x: this.ox + dx,
        y: this.oy + dy,
        transform: "s1.6",
        fill: "pink",
        opacity: 0.8,
    });
    updateEndpoint(this); // Update the endpoint position
};

var Sup = function () {
    this.animate({ transform: "s1", fill: "white", opacity: 1 }, 500);
};

squareShape.mousemove(clone_handler);

paper.set(triangleShape);

var clone_handler = function () {
    var x = this.clone();
    x.drag(Tmove, Tstart, Tup);
    createEndpoint(x); // Create endpoint for the cloned shape
};

var Tstart = function (x, y, event) {
    this.ox = x;
    this.oy = y;
    this.animate({ transform: "s2", fill: "pink", opacity: 0.9 }, 200);
};

var Tmove = function (dx, dy) {
    this.attr({
        x: this.ox + dx,
        y: this.oy + dy,
        transform: "s1.6",
        fill: "pink",
        opacity: 0.8,
    });
    updateEndpoint(this); // Update the endpoint position
};

var Tup = function () {
    this.animate({ transform: "s1", fill: "white", opacity: 1 }, 500);
};

triangleShape.mousemove(clone_handler);

var updateEndpoint = function (shape) {
    var bbox = shape.getBBox();
    var x = bbox.x + bbox.width / 2;
    var y = bbox.y + bbox.height / 2;
    shape.endpoint.attr({ cx: x, cy: y });
};
