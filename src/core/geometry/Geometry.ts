import { Transform } from "@world/Transform";
import { mat4, vec4 } from "gl-matrix";

export abstract class Geometry extends Transform {
  width: number;
  height: number;
  depth: number;
  color: vec4 = vec4.fromValues(1.0, 1.0, 1.0, 1.0);

  protected shaderProgram: WebGLProgram | null = null;
  protected vertexCount: number = 0;
  protected vao: WebGLVertexArrayObject | null = null;
  protected initialized: boolean = false;

  constructor(width: number, height: number, depth: number) {
    super();
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  protected abstract getVertices(): Float32Array;

  protected abstract getIndices(): Uint16Array;

  protected initialize(gl: WebGL2RenderingContext): void {
    const vertexSource = `#version 300 es
    layout(location = 0) in vec3 aPosition;
    uniform mat4 uProjection, uView, uModel;
    void main() {
      gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
    }`;

    const fragmentSource = `#version 300 es
    precision highp float;
    uniform vec4 uColor;
    out vec4 outColor;
    void main() {
      outColor = uColor;
    }`;

    const compile = (type: number, source: string): WebGLShader => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error("Shader compile error: " + info);
      }
      return shader;
    };

    const vertShader = compile(gl.VERTEX_SHADER, vertexSource);
    const fragShader = compile(gl.FRAGMENT_SHADER, fragmentSource);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error("Program link error: " + info);
    }

    this.shaderProgram = program;

    // Buffers
    const vertices = this.getVertices();
    const indices = this.getIndices();

    this.vertexCount = indices.length;

    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    const ebo = gl.createBuffer();

    gl.bindVertexArray(vao);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.bindVertexArray(null);

    this.vao = vao;
    this.initialized = true;
  }

  render(
    gl: WebGL2RenderingContext,
    projection: mat4,
    view: mat4,
    parentModel: mat4 = mat4.create()
  ): void {
    if (!this.initialized) {
      this.initialize(gl);
    }

    if (!this.vao || !this.shaderProgram) return;

    const model = mat4.create();
    mat4.multiply(model, parentModel, this.getMatrix());

    gl.useProgram(this.shaderProgram);

    const uProjection = gl.getUniformLocation(
      this.shaderProgram,
      "uProjection"
    );
    const uView = gl.getUniformLocation(this.shaderProgram, "uView");
    const uModel = gl.getUniformLocation(this.shaderProgram, "uModel");
    const uColor = gl.getUniformLocation(this.shaderProgram, "uColor");

    gl.uniformMatrix4fv(uProjection, false, projection);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniform4fv(uColor, this.color);

    gl.bindVertexArray(this.vao);
    gl.drawElements(gl.TRIANGLES, this.vertexCount, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);
  }

  setColor(r: number, g: number, b: number, a: number): this {
    this.color = vec4.fromValues(r, g, b, a);
    return this;
  }
}
