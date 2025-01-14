var ctx, canvas;

function main() {
	// Retrieve the <canvas> element
	canvas = document.getElementById('cnv1');
	if (!canvas) {
		console.log("Failed to retrieve the <canvas> element");
		return false;
	}

	// Get the rendering context for 2DCG
	ctx = canvas.getContext('2d');
	// Draw a blue rectangle
	ctx.fillStyle = 'rgba(0,0,0,1.0)';	// Blue
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVector(vec3, color) {
	// Find midpoint
	let cx = canvas.width/2;
	let cy = canvas.height/2;
	ctx.beginPath();
	ctx.moveTo(cx,cy);
	ctx.lineTo(cx + vec3.elements[0] * 20, cy - vec3.elements[1] * 20);
	ctx.strokeStyle = color;
	ctx.stroke();
}

function handleDrawEvent() {
	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Read values of the text boxes to create v1
	let v1_x = document.getElementById("V1_x").value;
	let v1_y = document.getElementById("V1_y").value;
	let v1 = new Vector3([v1_x, v1_y, 0]);
	drawVector(v1, "red");

	// Read values of the text boxes to create v1
	let v2_x = document.getElementById("V2_x").value;
	let v2_y = document.getElementById("V2_y").value;
	let v2 = new Vector3([v2_x, v2_y, 0]);
	drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Read values of the text boxes to create v1
	let v1_x = document.getElementById("V1_x").value;
	let v1_y = document.getElementById("V1_y").value;
	let v1 = new Vector3([v1_x, v1_y, 0]);
	drawVector(v1, "red");

	// Read values of the text boxes to create v1
	let v2_x = document.getElementById("V2_x").value;
	let v2_y = document.getElementById("V2_y").value;
	let v2 = new Vector3([v2_x, v2_y, 0]);
	drawVector(v2, "blue");

	// Get operation type
	let operation = document.getElementById("operation-select").value;
	let s = document.getElementById("scalar").value;

	switch (operation) {
		case "add":	// Add
			v1.add(v2);
			drawVector(v1, "green");
		break;
		case "sub":	// Subtract
			v1.sub(v2);
			drawVector(v1, "green");
		break;
		case "mul":	// Multiply
			v1.mul(s);
			v2.mul(s);
			drawVector(v1, "green");
			drawVector(v2, "green");
		break;
		case "div":	// Divide
			v1.div(s);
			v2.div(s);
			drawVector(v1, "green");
			drawVector(v2, "green");
		break;
		case "mag":	// Magnitude
			console.log("Magnitude V1:" + v1.magnitude());
			console.log("Magnitude V2:" + v2.magnitude());
		break;
		case "nor":	// Normalize
			v1.normalize();
			v2.normalize();
			drawVector(v1, "green");
			drawVector(v2, "green");
		break;
		case "angbet":	// Angle Between
			let dot = Vector3.dot(v1, v2);
			let m1 = v1.magnitude();
			let m2 = v2.magnitude();

			let cosTheta = dot / (m1 * m2);

			let cosThetaClamped = Math.min(1, Math.max(-1, cosTheta));

			let theta = (Math.acos(cosThetaClamped) * 180) / Math.PI;	// Get arccos of values in degrees
			console.log("Angle: " + theta);	// Print to console
		break;
		case "area":
			// Area = ||v_1 x v_2|| / 2
			let crossProduct = Vector3.cross(v1, v2);

			console.log("Area:" + 0.5 * crossProduct.magnitude());
		break;
		case "default":
			console.log("How did you get here?");
		break;
		
	}
}