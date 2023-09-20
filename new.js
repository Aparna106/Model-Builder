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

var horizontalLinePath = "M20,400 L121,399 121,446 216,446";
var horizontalLine = paper.path(horizontalLinePath);
horizontalLine.attr({
    "stroke-width": 5,
    stroke: "#000000",
    fill: "none",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-dasharray": "none",
});

// Blue dots at the bending corners
var startDot1 = paper.circle(20, 400, 5);
startDot1.attr({
    fill: "blue",
    cursor: "move",
});
var startDot2 = paper.circle(121, 399, 5);
startDot2.attr({
    fill: "blue",
    cursor: "move",
});
var endDot1 = paper.circle(121, 446, 5);
endDot1.attr({
    fill: "blue",
    cursor: "move",
});
var endDot2 = paper.circle(216, 446, 5);
endDot2.attr({
    fill: "blue",
    cursor: "move",
});

// Enable dragging on the line
horizontalLine.drag(
    function (dx, dy, x, y, event) {
        // Update the path of the line during dragging
        var newPath = [
            "M",
            this.startX + dx,
            this.startY + dy,
            "L",
            this.startX2 + dx,
            this.startY2 + dy,
            this.endX2 + dx,
            this.endY2 + dy,
            this.endX + dx,
            this.endY + dy,
        ];
        this.attr({ path: newPath });

        // Update the position of the blue dots
        startDot1.attr({
            cx: this.startX + dx,
            cy: this.startY + dy,
        });
        startDot2.attr({
            cx: this.startX2 + dx,
            cy: this.startY2 + dy,
        });
        endDot1.attr({
            cx: this.endX2 + dx,
            cy: this.endY2 + dy,
        });
        endDot2.attr({
            cx: this.endX + dx,
            cy: this.endY + dy,
        });
    },
    function () {
        // Set the original coordinates when dragging starts
        this.startX = this.attr("path")[0][1];
        this.startY = this.attr("path")[0][2];
        this.startX2 = this.attr("path")[1][1];
        this.startY2 = this.attr("path")[1][2];
        this.endX2 = this.attr("path")[2][1];
        this.endY2 = this.attr("path")[2][2];
        this.endX = this.attr("path")[3][1];
        this.endY = this.attr("path")[3][2];
    },
    function () {
        // Perform any desired actions when dragging ends
    }
);

// Enable dragging on the blue dots
startDot1.drag(
    function (dx, dy, x, y, event) {
        // Calculate the new coordinates for the startDot1
        var newX = this.startX + dx;
        var newY = this.startY + dy;

        // Update the path of the line
        var newPath = [
            "M",
            newX,
            newY,
            "L",
            this.startX2,
            this.startY2,
            this.endX2,
            this.endY2,
            this.endX,
            this.endY,
        ];
        horizontalLine.attr({ path: newPath });

        // Update the position of the other blue dots
        startDot2.attr({ cx: this.startX2, cy: this.startY2 });
        endDot1.attr({ cx: this.endX2, cy: this.endY2 });
        endDot2.attr({ cx: this.endX, cy: this.endY });
    },
    function () {
        // Set the original coordinates when dragging starts
        this.startX = this.attr("cx");
        this.startY = this.attr("cy");
        this.startX2 = startDot2.attr("cx");
        this.startY2 = startDot2.attr("cy");
        this.endX2 = endDot1.attr("cx");
        this.endY2 = endDot1.attr("cy");
        this.endX = endDot2.attr("cx");
        this.endY = endDot2.attr("cy");
    },
    function () {
        // var blackLineLength = horizontalLine.getTotalLength();
        // var dotPosition = startDot1.attr("cx");

        var newX = horizontalLine.getPointAtLength(0).x;
        var newY = horizontalLine.getPointAtLength(0).y;

        startDot1.attr({ cx: newX, cy: newY });
    }
);

startDot2.drag(
    function (dx, dy, x, y, event) {
        // Calculate the new coordinates for the startDot2
        var newX = this.startX2 + dx;
        var newY = this.startY2 + dy;

        // Update the path of the line
        var newPath = [
            "M",
            this.startX,
            this.startY,
            "L",
            newX,
            newY,
            this.endX2,
            this.endY2,
            this.endX,
            this.endY,
        ];
        horizontalLine.attr({ path: newPath });

        // Update the position of the other blue dots
        startDot1.attr({ cx: this.startX, cy: this.startY });
        endDot1.attr({ cx: this.endX2, cy: this.endY2 });
        endDot2.attr({ cx: this.endX, cy: this.endY });
    },
    function () {
        // Set the original coordinates when dragging starts
        this.startX = startDot1.attr("cx");
        this.startY = startDot1.attr("cy");
        this.startX2 = this.attr("cx");
        this.startY2 = this.attr("cy");
        this.endX2 = endDot1.attr("cx");
        this.endY2 = endDot1.attr("cy");
        this.endX = endDot2.attr("cx");
        this.endY = endDot2.attr("cy");
    },
    function () {
        // Perform any desired actions when dragging of startDot2 ends
        var blackLineLength = horizontalLine.getTotalLength();
        var dotPosition = startDot2.attr("cx");
        var newX = horizontalLine.getPointAtLength(
            (dotPosition * blackLineLength) / 100
        ).x;
        var newY = horizontalLine.getPointAtLength(
            (dotPosition * blackLineLength) / 100
        ).y;

        startDot2.attr({ cx: newX, cy: newY });
    }
);

endDot1.drag(
    function (dx, dy, x, y, event) {
        // Calculate the new coordinates for the endDot1
        var newX = this.endX2 + dx;
        var newY = this.endY2 + dy;

        // Update the path of the line
        var newPath = [
            "M",
            this.startX,
            this.startY,
            "L",
            this.startX2,
            this.startY2,
            newX,
            newY,
            this.endX,
            this.endY,
        ];
        horizontalLine.attr({ path: newPath });

        // Update the position of the other blue dots
        startDot1.attr({ cx: this.startX, cy: this.startY });
        startDot2.attr({ cx: this.startX2, cy: this.startY2 });
        endDot2.attr({ cx: this.endX, cy: this.endY });
    },
    function () {
        // Set the original coordinates when dragging starts
        this.startX = startDot1.attr("cx");
        this.startY = startDot1.attr("cy");
        this.startX2 = startDot2.attr("cx");
        this.startY2 = startDot2.attr("cy");
        this.endX2 = this.attr("cx");
        this.endY2 = this.attr("cy");
        this.endX = endDot2.attr("cx");
        this.endY = endDot2.attr("cy");
    },
    function () {
        // Perform any desired actions when dragging of endDot1 ends
    }
);

endDot2.drag(
    function (dx, dy, x, y, event) {
        // Calculate the new coordinates for the endDot2
        var newX = this.endX + dx;
        var newY = this.endY + dy;

        // Update the path of the line
        var newPath = [
            "M",
            this.startX,
            this.startY,
            "L",
            this.startX2,
            this.startY2,
            this.endX2,
            this.endY2,
            newX,
            newY,
        ];
        horizontalLine.attr({ path: newPath });

        // Update the position of the other blue dots
        startDot1.attr({ cx: this.startX, cy: this.startY });
        startDot2.attr({ cx: this.startX2, cy: this.startY2 });
        endDot1.attr({ cx: this.endX2, cy: this.endY2 });
    },
    function () {
        // Set the original coordinates when dragging starts
        this.startX = startDot1.attr("cx");
        this.startY = startDot1.attr("cy");
        this.startX2 = startDot2.attr("cx");
        this.startY2 = startDot2.attr("cy");
        this.endX2 = endDot1.attr("cx");
        this.endY2 = endDot1.attr("cy");
        this.endX = this.attr("cx");
        this.endY = this.attr("cy");
    },
    function () {
        var blackLineLength = horizontalLine.getTotalLength();
        var dotPosition = endDot2.attr("cx");
        var newX = horizontalLine.getPointAtLength(
            (dotPosition * blackLineLength) / 100
        ).x;
        var newY = horizontalLine.getPointAtLength(
            (dotPosition * blackLineLength) / 100
        ).y;

        endDot2.attr({ cx: newX, cy: newY });
    }
);

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

var Cstart = function (x, y, event) {
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

var Sstart = function (x, y, event) {
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
