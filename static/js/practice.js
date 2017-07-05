/* 1) Prepare canvas and get WebGL context */
var canvas = document.getElementById('mycanvas');
var gl = canvas.getContext('experimental-webgl');


/* 2) Define geometry & store it in buffer objects */
var vertices = [0.0, 0.5, -0.5, -0.5, 0.5, -0.5];

// create new buffer object
var vertexBuffer = gl.createBuffer();

// bind an empty array buffer to it
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// pass the vertices data to the buffer
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// unbind buffer
gl.bindBuffer(gl.ARRAY_BUFFER, null);


/* 3) Create & compile shader programs */

// Vertex shader source code
var vertCode =
  'attribute vec2 coordinates;' + 'void main(void) {' +
  'gl_Position = vec4(coordinates, 0.0, 1.0);' + '}';

// create vertex shader object
var vertShader = gl.createShader(gl.VERTEX_SHADER);

// attach vertex shader source code
gl.shaderSource(vertShader, vertCode);

// compile the vertex shader
gl.compileShader(vertShader);

// fragment shader source code
var fragCode =
  'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';

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

// use the combined shader program object
gl.useProgram(shaderProgram);


/* 4) Associate the shader programs to buffer objects */

// bind vertex buffer object
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// get the attribute location
var coord = gl.getAttribLocation(shaderProgram, 'coordinates');

// point an attribute to the currently bound VBO
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

// enable the attribute
gl.enableVertexAttribArray(coord);


/* 5) Drawing the required obejct (triangle) */

// clear the canvas
gl.clearColor(0.5, 0.5, 0.5, 0.9);

// enable the depth test
gl.enable(gl.DEPTH_TEST);

// clear the color buffer bit
gl.clear(gl.COLOR_BUFFER_BIT);

// set the view port
gl.viewport(0, 0, canvas.width, canvas.height);

// draw the triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);
