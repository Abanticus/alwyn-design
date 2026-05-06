import { type RefObject, useEffect } from "react"

const VERTEX_SRC = /* glsl */ `#version 300 es
out vec2 vUv;
void main() {
  vec2 pos[3] = vec2[](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
  vUv = pos[gl_VertexID] * 0.5 + 0.5;
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}
`

const FRAGMENT_SRC = /* glsl */ `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform float uTime;
uniform vec2  uMouse;  // CSS px
uniform vec2  uRes;    // CSS px

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    a *= 0.5;
    p = p * 2.1 + vec2(1.7, 9.2);
  }
  return v;
}

void main() {
  vec2 px = vUv * uRes;

  float cell = 14.0;
  vec2 ci = floor(px / cell);   // integer cell index
  vec2 cu = fract(px / cell);   // 0–1 within cell

  // Smooth circle at cell centre
  float r = length(cu - 0.5);
  float dotMask = 1.0 - smoothstep(0.15, 0.20, r);

  // FBM noise scrolls diagonally — creates rolling wave patterns
  vec2 nc = ci * 0.055 + vec2(uTime * 0.09, uTime * 0.045);
  float n = fbm(nc);
  float brightness = smoothstep(0.38, 0.72, n);

  // Mouse proximity glow (Gaussian falloff)
  vec2 cellCenter = (ci + 0.5) * cell;
  float md = length(cellCenter - uMouse);
  float mouseGlow = exp(-md * md / (180.0 * 180.0));

  // Colours: near-black bg, dark grey dots that brighten in waves
  // with a subtle blue-purple tint matching the brand
  vec3 bg      = vec3(0.048, 0.048, 0.056);
  vec3 dotOff  = vec3(0.088, 0.088, 0.108);
  vec3 dotOn   = vec3(0.255, 0.250, 0.370);
  vec3 dotHot  = vec3(0.500, 0.460, 0.700);

  vec3 dotCol = mix(dotOff, dotOn,  brightness);
  dotCol      = mix(dotCol, dotHot, mouseGlow * 0.75);

  vec3 col = mix(bg, dotCol, dotMask);

  // Edge vignette to darken corners like the reference
  float vig = 1.0 - length(vUv - 0.5) * 0.65;
  col *= vig;

  fragColor = vec4(col, 1.0);
}
`

function buildProgram(
  gl: WebGL2RenderingContext,
  vertSrc: string,
  fragSrc: string,
): WebGLProgram | null {
  const compile = (type: number, src: string) => {
    const shader = gl.createShader(type)!
    gl.shaderSource(shader, src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    return shader
  }
  const vert = compile(gl.VERTEX_SHADER, vertSrc)
  const frag = compile(gl.FRAGMENT_SHADER, fragSrc)
  if (!vert || !frag) return null
  const prog = gl.createProgram()!
  gl.attachShader(prog, vert)
  gl.attachShader(prog, frag)
  gl.linkProgram(prog)
  gl.deleteShader(vert)
  gl.deleteShader(frag)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(prog))
    gl.deleteProgram(prog)
    return null
  }
  return prog
}

export function useShaderCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2")
    if (!gl) {
      console.warn("WebGL2 unavailable — shader background disabled")
      return
    }

    const program = buildProgram(gl, VERTEX_SRC, FRAGMENT_SRC)
    if (!program) return

    const uTime  = gl.getUniformLocation(program, "uTime")
    const uMouse = gl.getUniformLocation(program, "uMouse")
    const uRes   = gl.getUniformLocation(program, "uRes")

    let cssW = canvas.clientWidth
    let cssH = canvas.clientHeight
    let mouseX = cssW / 2
    let mouseY = cssH / 2

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", onMove)

    const resize = () => {
      const dpr = window.devicePixelRatio
      cssW = canvas.clientWidth
      cssH = canvas.clientHeight
      canvas.width  = cssW * dpr
      canvas.height = cssH * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let raf: number
    const t0 = performance.now()

    const render = () => {
      gl.useProgram(program)
      gl.uniform1f(uTime,  (performance.now() - t0) / 1000)
      gl.uniform2f(uMouse, mouseX, mouseY)
      gl.uniform2f(uRes,   cssW, cssH)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      ro.disconnect()
      gl.deleteProgram(program)
    }
  }, [canvasRef])
}
