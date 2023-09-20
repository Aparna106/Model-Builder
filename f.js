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
var triangleShape = paper.image("asset/condensor.svg", 30, 260, 40, 40);

var lineConnectorSVG =
    '<svg width="1024" height="768.0000000000001">' +
    "<g>" +
    '<line fill="none" stroke="#000000" stroke-width="13" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="99.87497" y1="196.32187" x2="200.7031" y2="195.9" id="svg_7"/>' +
    '<line fill="none" stroke="#000000" stroke-width="13" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="199.43747" y1="149.49375" x2="199.43747" y2="202.22812" id="svg_8"/>' +
    '<line fill="none" stroke="#000000" stroke-width="13" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="192.68747" y1="155.82188" x2="300.2656" y2="155.82188" id="svg_9"/>' +
    "</g>" +
    "</svg>";

var circleShapesArray = []; // Array to store circle shapes
var squareShapesArray = []; // Array to store square shapes
var triangleShapesArray = []; // Array to store triangle shapes
var lineArray = [];

paper.set(circleShape);

var clone_handler = function () {
    var x = this.clone();
    x.drag(Cmove, Cstart, Cup);
};

var Cstart = function (x, y, event) {
        this.ox = this.attr("cx");
        this.oy = this.attr("cy");
        this.animate({ transform: "s2", fill: "pink", opacity: 0.9 }, 200);
    },
    Cmove = function (dx, dy) {
        this.attr({
            cx: this.ox + dx,
            cy: this.oy + dy,
            transform: "s1.6",
            fill: "pink",
            opacity: 0.8,
        });
    },
    Cup = function () {
        this.animate({ transform: "s1", fill: "white", opacity: 1 }, 500);
    };
circleShape.mousemove(clone_handler);

paper.set(squareShape);

var clone_handler = function () {
    var x = this.clone();
    x.drag(Smove, Sstart, Sup);
};

var Sstart = function (x, y, event) {
        this.ox = this.attr("x");
        this.oy = this.attr("y");
        this.animate({ transform: "s2", fill: "pink", opacity: 0.9 }, 200);
    },
    Smove = function (dx, dy) {
        this.attr({
            x: this.ox + dx,
            y: this.oy + dy,
            transform: "s1.6",
            fill: "pink",
            opacity: 0.8,
        });
    },
    Sup = function () {
        this.animate({ transform: "s1", fill: "white", opacity: 1 }, 500);
    };
squareShape.mousemove(clone_handler);

paper.set(triangleShape);

var clone_handler = function () {
    var x = this.clone();
    x.drag(Tmove, Tstart, Tup);
};

var Tstart = function (x, y, event) {
        this.ox = x;
        this.oy = y;
        this.animate({ transform: "s2", fill: "pink", opacity: 0.9 }, 200);
    },
    Tmove = function (dx, dy) {
        this.attr({
            x: this.ox + dx,
            y: this.oy + dy,
            transform: "s1.6",
            fill: "pink",
            opacity: 0.8,
        });
    },
    Tup = function () {
        this.animate({ transform: "s1", fill: "white", opacity: 1 }, 500);
    };
triangleShape.mousemove(clone_handler);
