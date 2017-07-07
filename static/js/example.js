/* This code tutorial is from: www.tutorialspoint.com/webgl */

/* ================ 1) Prepare canvas and get WebGL context ================= */
var canvas = document.getElementById('mycanvas');
var gl = canvas.getContext('webgl');


/* ============ 2) Define geometry & store it in buffer objects ============= */
var vertices =
  [0.0, 0.5, -1,
  -0.5, -0.5, -1,
  0.5, -0.5, -1];
var indices = [0, 1, 2]
var colors = [0,0,1, 1,0,0, 0,1,0]

// create new buffer object
var vertexBuffer = gl.createBuffer();

// bind an empty array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// pass the vertices data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// unbind buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// create empty buffer object and store index data
var indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

// create empty buffer object and store color data
var colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);


/* ================== 3) Create & compile shader programs =================== */

// Vertex shader source code
var vertCode =
  'attribute vec3 coordinates;' +
  'uniform mat4 Pmatrix;' +
  'uniform mat4 Vmatrix;' +
  'uniform mat4 Mmatrix;' +
  'attribute vec3 color;' +
  'varying vec3 vColor;' +
  'void main(void) {' +
    'gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(coordinates, 1.);' +
    'vColor = color;' +
  '}';

// create vertex shader object
var vertShader = gl.createShader(gl.VERTEX_SHADER);

// attach vertex shader source code
gl.shaderSource(vertShader, vertCode);

// compile the vertex shader
gl.compileShader(vertShader);

// fragment shader source code
var fragCode =
  'precision mediump float;' +
  'varying vec3 vColor;' +
  'void main(void) {' +
    'gl_FragColor = vec4(vColor, 1.);' +
  '}';

// create fragment shader object
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

// attach fragment shader source code
gl.shaderSource(fragShader, fragCode);

// compile the fragment shader
gl.compileShader(fragShader);

// create shader program to store combined shader programs
var shaderProgram = gl.createProgram();

// attach a vertex shader
gl.attachShader(shaderProgram, vertShader);

// attach a fragment shader
gl.attachShader(shaderProgram, fragShader);

// link both programs
gl.linkProgram(shaderProgram);

// console.log(gl.getShaderInfoLog(fragShader));
// console.log(gl.getProgramInfoLog(shaderProgram));

// use the combined shader program object
gl.useProgram(shaderProgram);


/* =========== 4) Associate the shader programs to buffer objects =========== */

var Pmatrix = gl.getUniformLocation(shaderProgram, 'Pmatrix');
var Vmatrix = gl.getUniformLocation(shaderProgram, 'Vmatrix');
var Mmatrix = gl.getUniformLocation(shaderProgram, 'Mmatrix');

// bind vertex & indices buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

// get the attribute location
var coord = gl.getAttribLocation(shaderProgram, 'coordinates');

// point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

// enable the attribute
gl.enableVertexAttribArray(coord);

// take care of color buffer
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
var color = gl.getAttribLocation(shaderProgram, 'color');
gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(color);


/* ================================= Matrix ================================= */
function getProjection(angle, a, zMin, zMax) {
  var ang = Math.tan((angle * 0.5) * Math.PI / 180);
  return [
    0.5 / ang, 0, 0, 0,
    0, 0.5 * a / ang, 0, 0,
    0, 0, -(zMax * zMin) / (zMax - zMin), -1,
    0, 0, (-2 * zMax * zMin) / (zMax - zMin), 0
  ];
}

var projMatrix = getProjection(40, canvas.width / canvas.height, 1, 100);
var movMatrix = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];
var viewMatrix = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];

// translating z (zoom)
viewMatrix[14] = viewMatrix[14] - 1;

/* ================================ Rotation ================================ */
function rotateZ(m, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var mv0 = m[0], mv4 = m[4], mv8 = m[8];

  m[0] = c * m[0] - s * m[1];
  m[4] = c * m[4] - s * m[5];
  m[8] = c * m[8] - s * m[9];
  m[1] = c * m[1] + s * mv0;
  m[5] = c * m[5] + s * mv4;
  m[9] = c * m[9] + s * mv8;
}


/* =============== 5) Drawing the required obejct (triangle) ================ */

var timeOld = 0;

var animate = function(time) {
  var dt = time - timeOld;
  rotateZ(movMatrix, dt * 0.002);
  timeOld = time;

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  // clear the canvas
  gl.clearColor(0.5, 0.5, 0.5, 0.9);
  gl.clearDepth(1.0);
  // set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.uniformMatrix4fv(Pmatrix, false, projMatrix);
  gl.uniformMatrix4fv(Vmatrix, false, viewMatrix);
  gl.uniformMatrix4fv(Mmatrix, false, movMatrix);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  // draw the triangle
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
  window.requestAnimationFrame(animate);
}

animate(0);

// enable the depth test
// gl.enable(gl.DEPTH_TEST);

// clear the color buffer bit
// gl.clear(gl.COLOR_BUFFER_BIT);
