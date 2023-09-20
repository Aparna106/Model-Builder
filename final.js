var pallet = Raphael(20, 20, 800, 800);
pallet.rect(10, 10, 100, 400);

//define 4 boxes to draw on screen
var boxListing = [
    {
        x: "30",
        y: "30",
        width: "70",
        height: "70",
        boxname: "Box 1",
    },
    {
        x: "110",
        y: "30",
        width: "70",
        height: "70",
        boxname: "Box 2",
    },
    {
        x: "210",
        y: "30",
        width: "80",
        height: "80",
        boxname: "Box 3",
    },
    {
        x: "310",
        y: "30",
        width: "90",
        height: "90",
        boxname: "Box 4",
    },
];

//values that define the graphical properties of the page
var raphObject;
var dragIconSize = 10;

//the primary function of this page
function startup() {
    //initialize the main graphics object that is used to draw the box icons
    raphObject = Raphael("canvasdiv", 1000, 752);
    drawBoxes();
}

//start, move, and up are the drag functions
move_start = function () {
    //storing original coordinates
    this.ox = this.attr("x");
    this.oy = this.attr("y");
    this.attr({ opacity: 0.5 });

    //the resizer box
    this.resizer.ox = this.resizer.attr("x");
    this.resizer.oy = this.resizer.attr("y");
    this.resizer.attr({ opacity: 0.5 });

    //the box text
    this.boxtext.ox = this.attr("x") + parseInt(this.attr("width")) / 2;
    this.boxtext.oy = this.attr("y") + parseInt(this.attr("height")) / 2;
    this.boxtext.attr({ opacity: 0.5 });
};

//visually change the box when it is being moved
move_drag = function (dx, dy) {
    //move will be called with dx and dy
    this.attr({ x: this.ox + dx, y: this.oy + dy });
    this.resizer.attr({
        x: this.resizer.ox + dx,
        y: this.resizer.oy + dy,
    });
    this.boxtext.attr({
        x: this.boxtext.ox + dx,
        y: this.boxtext.oy + dy,
    });
};

//when the user lets go of the mouse button, reset the square's properties
move_up = function () {
    //restoring the visual state
    this.attr({ opacity: 1 });
    this.resizer.attr({ opacity: 1 });
    this.boxtext.attr({ opacity: 1 });

    //here is where you would update the box's position externally
    //...
};

resize_start = function () {
    //storing original coordinates
    this.ox = this.attr("x");
    this.oy = this.attr("y");

    //the resizer box
    this.resizer.ow = this.resizer.attr("width");
    this.resizer.oh = this.resizer.attr("height");

    //the box text
    this.boxtext.ox =
        this.resizer.attr("x") + parseInt(this.resizer.attr("width")) / 2;
    this.boxtext.oy =
        this.resizer.attr("y") + parseInt(this.resizer.attr("height")) / 2;
};

resize_drag = function (dx, dy) {
    // move will be called with dx and dy
    this.attr({ x: this.ox + dx, y: this.oy + dy });
    this.resizer.attr({
        width: this.resizer.ow + dx,
        height: this.resizer.oh + dy,
    });
    this.boxtext.attr({
        x: this.boxtext.ox + dx / 2,
        y: this.boxtext.oy + dy / 2,
    });
};

resize_up = function () {
    //here is where you would update the box's position externally
    //...
};

//draw all of the boxes in the json object
function drawBoxes() {
    //working arrays
    boxList = new Array();
    boxListText = new Array();
    boxListDrag = new Array();

    //loop through all boxes in the json object
    for (var i = 0; i < boxListing.length; i++) {
        //extract the positional data from the json array
        var px = boxListing[i].x;
        var py = boxListing[i].y;
        var pw = boxListing[i].width;
        var ph = boxListing[i].height;
        var textx = 0;
        var texty = 0;

        //we need to make sure that the values are numerical for calculations later
        px = parseInt(px);
        py = parseInt(py);
        pw = parseInt(pw);
        ph = parseInt(ph);

        //position text in the center of the box
        textx = px + pw / 2;
        texty = py + ph / 2;

        //deal with this individual box, position it and show a status based on color
        boxList[i] = raphObject.rect(px, py, pw, ph).attr("fill", "#aaaaaa");

        boxListText[i] = raphObject
            .text(textx, texty, boxListing[i].boxname)
            .attr("font", "12px Arial")
            .attr("fill", "#000000");

        //position the drag icon
        var dragBoxX = px + pw - dragIconSize;
        var dragBoxY = py + ph - dragIconSize;

        //create the drag icon for this box
        boxListDrag[i] = raphObject
            .rect(dragBoxX, dragBoxY, dragIconSize, dragIconSize)
            .attr({
                fill: "#00aabb",
                stroke: "solid",
                opacity: 1,
            });

        //define relations and functions for moving and positioning
        //move the boxes
        boxList[i].drag(move_drag, move_start, move_up);
        boxList[i].resizer = boxListDrag[i];
        boxList[i].boxtext = boxListText[i];

        //resize the boxes
        boxListDrag[i].drag(resize_drag, resize_start, resize_up);
        boxListDrag[i].resizer = boxList[i];
        boxListDrag[i].boxtext = boxListText[i];
    } //for loop
}
