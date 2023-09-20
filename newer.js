var paper = new Raphael(document.getElementById("drag"), 800, 600);
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

var dragC = paper
    .circle(50, 150, 20)
    .attr({ fill: "white", "stroke-width": 4, stroke: "red" });
var dragS = paper
    .rect(30, 200, 40, 40)
    .attr({ fill: "white", "stroke-width": 4, stroke: "green" });
var dragT = paper.image("assets/condensor.svg", 30, 260, 40, 40);
// var dragT = paper.path("M 50,275 L 30, 320 L 70,320 Z").attr({ fill: "white" });

var lastEl;
paper.set(dragC);

var clone_handler = function () {
    var x = this.clone();
    x.drag(Cmove, Cstart, Cup);
    x.dblclick(addLine);
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
dragC.mousemove(clone_handler);

paper.set(dragS);

var clone_handler = function () {
    var x = this.clone();
    x.drag(Smove, Sstart, Sup);
    // x.dblclick(addLine);
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
dragS.mousemove(clone_handler);

paper.set(dragT);

var clone_handler = function () {
    var x = this.clone();
    x.drag(Tmove, Tstart, Tup);
    // x.dblclick(addLine);
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
dragT.mousemove(clone_handler);

function addLine() {
    if (lastEl) {
        bb1 = this.getBBox();

        bb2 = lastEl.getBBox();
        var newPath = paper.path(
            "M" + bb1.cx + "," + bb1.cy + "L" + bb2.cx + "," + bb2.cy
        );
        newPath.attr({ stroke: "blue" });
    }
    lastEl = this;
}
