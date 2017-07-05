/* This code tutorial is from: www.tutorialspoint.com/webgl */

/* ================ 1) Prepare canvas and get WebGL context ================= */
var canvas = document.getElementById('mycanvas');
var gl = canvas.getContext('webgl');


/* ============ 2) Define geometry & store it in buffer objects ============= */
var vertices =
  [0.0, 0.5, 0.0,
  -0.5, -0.5, 0.0,
  0.5, -0.5, 0.0];
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
  'attribute vec3 color;' +
  'varying vec3 vColor;' +
  'void main(void) {' +
    'gl_Position = vec4(coordinates, 1.0);' +
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

// bind vertex & indices buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

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


/* =============== 5) Drawing the required obejct (triangle) ================ */

// clear the canvas
gl.clearColor(0.5, 0.5, 0.5, 0.9);

// enable the depth test
gl.enable(gl.DEPTH_TEST);

// clear the color buffer bit
gl.clear(gl.COLOR_BUFFER_BIT);

// set the view port
gl.viewport(0, 0, canvas.width, canvas.height);

// draw the triangle
gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
