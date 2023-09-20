// Create a Raphael paper object to hold the elements
var pallet = Raphael("canvas", 800, 600);

// Create shapes for different components
//left, top, right, bottom
var turbine = pallet.rect(100, 100, 200, 100);
turbine.attr({ fill: "#F00", stroke: "#000" });

//generator
var condenser = pallet.rect(100, 250, 100, 100);
condenser.attr({ fill: "#0F0", stroke: "#000" });

// Add text labels to the components
//x, y
var turbineLabel = pallet.text(200, 150, "Turbine");
var generatorLabel = pallet.text(150, 300, "Generator");

// // var condenser = canvas.image("");

//x, y, width, height
// condenser.drag(0, 0, 100, 100);

// condenser.on("drag", function () {
//     // Update the position of the image
//     this.attr("x", event.clientX - this.getBBox().x);
//     this.attr("y", event.clientY - this.getBBox().y);
// });

// var paper = new Raphael(document.getElementById('drag'), 700, 200);
// var dragC = paper.circle( 20,20,20 ).attr({ 'fill': 'white' })

// function dragStart() {
// 	// Get original position of element, and set as properties .ox and .oy
// 	dragC.ox = dragC.attr("cx");
// 	dragC.oy = dragC.attr("cy");
// 	dragC.animate({ 'transform': 's2', 'fill': 'pink', 'opacity': 0.9 }, 200 )
// 	}

// function dragMove( dx, dy ) {
// 	dragC.attr({ 'transform': 's1.6', 'fill': 'pink', 'opacity': 0.8, 'cx': dragC.ox+dx, 'cy': dragC.oy+dy  })
// 	}

// function dragEnd() {
// 	dragC.animate({ 'transform': 's1', 'fill': 'white', 'opacity': 1 }, 500)
// 	}

// dragC.drag( dragMove, dragStart, dragEnd )

// // Set up event handling for interactivity
// turbine.click(function () {
//     // Perform some action when turbine is clicked
//     console.log("Turbine clicked!");
// });

generator.click(function () {
    console.log("Generator clicked!");
});

// Apply gradient fill to the turbine
var gradient = pallet.gradient("l(0, 0, 1, 0)#FF0000-#FFFF00");
turbine.attr({ fill: gradient });

// Animate the generator's position
generator.animate({ x: 500, y: 200 }, 1000);

// generator.drag(
//     function (dx, dy, x, y) {
//         // Handle element movement during dragging
//         generator.attr({ x: x - this.ox, y: y - this.oy });
//     },
//     function () {
//         // Handle drag start
//         this.ox = this.attr("x");
//         this.oy = this.attr("y");
//     },
//     function () {
//         // Handle drag end
//         // Perform any necessary actions after dropping the generator
//     }
// );

// generator.hover(
//     function () {
//         // Perform some action when mouse hovers over generator
//         console.log("Generator hovered!");
//     },
//     function () {
//         // Perform some action when mouse leaves generator
//         console.log("Mouse left generator!");
//     }
// );
