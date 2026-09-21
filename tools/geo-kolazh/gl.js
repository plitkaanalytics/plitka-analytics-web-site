'use strict';
/* eslint-disable @typescript-eslint/no-unused-vars -- функції спільні для скриптів сторінки, їх кличе render.js */
/* Геоколаж PLITKA — WebGL для нахиленої карти й сферичних панорам.
   Малюємо в окреме полотно, а результат переносимо в головне через drawImage,
   тож екран і експорт проходять тим самим шляхом. */

const GLR = (() => {
  const MAX_TILE_TEX = 320;
  const MAX_IMG_TEX = 6;

  let cv = null, gl = null, progTile = null, progPano = null, vbo = null, aniso = null;
  let maxTex = 4096, broken = false;
  const tileTex = new Map(); // ключ тайла → текстура
  const imgTex = new Map(); // id зображення → { tex }
  const quad = new Float32Array(16);

  // Площина карти: вершина несе координати в пікселях полотна, матриця дає перспективу.
  // gl_Position.w залежить від y, тому GL сам робить перспективно правильні текстурні координати.
  const VS_TILE = `
    attribute vec2 aPos;
    attribute vec2 aUV;
    uniform vec4 uProj;
    varying vec2 vUV;
    void main() {
      vUV = aUV;
      gl_Position = vec4(uProj.x * aPos.x, uProj.y * aPos.y, 0.0, uProj.z * aPos.y + uProj.w);
    }`;
  const FS_TILE = `
    precision mediump float;
    varying vec2 vUV;
    uniform sampler2D uTex;
    void main() { gl_FragColor = texture2D(uTex, vUV); }`;

  // Панорама: для кожного пікселя рахуємо напрямок променя й беремо колір із рівнокутного знімка.
  const VS_PANO = `
    attribute vec2 aPos;
    varying vec2 vPos;
    void main() { vPos = aPos; gl_Position = vec4(aPos, 0.0, 1.0); }`;
  const FS_PANO = `
    precision highp float;
    varying vec2 vPos;
    uniform vec2 uHalf;
    uniform float uF;
    uniform float uYaw;
    uniform float uPitch;
    uniform vec2 uSpan;
    uniform vec3 uVoid;
    uniform sampler2D uTex;
    void main() {
      vec3 d = normalize(vec3(vPos.x * uHalf.x, vPos.y * uHalf.y, uF));
      float cp = cos(uPitch), sp = sin(uPitch);
      vec3 w = vec3(d.x, d.y * cp + d.z * sp, -d.y * sp + d.z * cp);
      float lat = asin(clamp(w.y, -1.0, 1.0));
      float lon = atan(w.x, w.z) + uYaw;
      lon = mod(lon + 3.14159265, 6.28318531) - 3.14159265;
      vec2 uv = vec2(0.5 + lon / uSpan.x, 0.5 - lat / uSpan.y);
      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        gl_FragColor = vec4(uVoid, 1.0);
        return;
      }
      gl_FragColor = texture2D(uTex, uv);
    }`;

  function shader(src, type) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  function program(vs, fs, names) {
    const pr = gl.createProgram();
    gl.attachShader(pr, shader(vs, gl.VERTEX_SHADER));
    gl.attachShader(pr, shader(fs, gl.FRAGMENT_SHADER));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
    const o = { pr, a: {}, u: {} };
    for (const n of names) {
      if (n[0] === 'a') o.a[n] = gl.getAttribLocation(pr, n);
      else o.u[n] = gl.getUniformLocation(pr, n);
    }
    return o;
  }

  function init() {
    if (gl || broken) return gl;
    try {
      cv = document.createElement('canvas');
      cv.width = cv.height = 64;
      gl = cv.getContext('webgl', { alpha: false, antialias: true, depth: false, preserveDrawingBuffer: true });
      if (!gl) throw new Error('webgl недоступний');
      cv.addEventListener('webglcontextlost', e => {
        e.preventDefault();
        gl = null;
        progTile = progPano = vbo = null;
        tileTex.clear();
        imgTex.clear();
      });
      maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096;
      aniso = gl.getExtension('EXT_texture_filter_anisotropic');
      progTile = program(VS_TILE, FS_TILE, ['aPos', 'aUV', 'uProj', 'uTex']);
      progPano = program(VS_PANO, FS_PANO, ['aPos', 'uHalf', 'uF', 'uYaw', 'uPitch', 'uSpan', 'uVoid', 'uTex']);
      vbo = gl.createBuffer();
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    } catch (err) {
      console.warn('Геоколаж: WebGL недоступний —', err.message);
      broken = true;
      gl = null;
    }
    return gl;
  }

  const isPot = n => n > 0 && (n & (n - 1)) === 0;
  const potFloor = n => 2 ** Math.floor(Math.log2(n));

  function makeTexture(src, { mips = true } = {}) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    const pot = isPot(src.width || src.naturalWidth) && isPot(src.height || src.naturalHeight);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    if (mips && pot) {
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      if (aniso) gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, 4);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    return tex;
  }

  function tileTexture(key, img) {
    let t = tileTex.get(key);
    if (t) {
      tileTex.delete(key);
      tileTex.set(key, t);
      return t;
    }
    t = makeTexture(img);
    tileTex.set(key, t);
    if (tileTex.size > MAX_TILE_TEX) {
      const old = tileTex.keys().next().value;
      gl.deleteTexture(tileTex.get(old));
      tileTex.delete(old);
    }
    return t;
  }

  /** Панорамний знімок кладемо в текстуру зі степенем двійки — заради мипмапів і межі розміру. */
  function imgTexture(id, img, w, h) {
    let t = imgTex.get(id);
    if (t) return t.tex;
    const tw = Math.min(potFloor(w), maxTex, 4096);
    const th = Math.max(1, Math.min(potFloor(Math.round((tw * h) / w)) || 1, maxTex));
    let src = img;
    if (tw !== w || th !== h) {
      // Зменшуємо вдвічі покроково — так менше муару, ніж одним стрибком.
      let cw = w, ch = h, from = img;
      while (cw > tw * 2 || ch > th * 2) {
        cw = Math.max(tw, Math.round(cw / 2));
        ch = Math.max(th, Math.round(ch / 2));
        const step = document.createElement('canvas');
        step.width = cw;
        step.height = ch;
        const sx = step.getContext('2d');
        sx.imageSmoothingQuality = 'high';
        sx.drawImage(from, 0, 0, cw, ch);
        from = step;
      }
      const c = document.createElement('canvas');
      c.width = tw;
      c.height = th;
      const x = c.getContext('2d');
      x.imageSmoothingQuality = 'high';
      x.drawImage(from, 0, 0, tw, th);
      src = c;
    }
    const tex = makeTexture(src);
    imgTex.set(id, { tex });
    if (imgTex.size > MAX_IMG_TEX) {
      const old = imgTex.keys().next().value;
      gl.deleteTexture(imgTex.get(old).tex);
      imgTex.delete(old);
    }
    return tex;
  }

  function target(w, h, bg) {
    const W = Math.max(1, Math.round(w)), H = Math.max(1, Math.round(h));
    if (cv.width < W || cv.height < H) {
      cv.width = Math.max(cv.width, W);
      cv.height = Math.max(cv.height, H);
    }
    // Малюємо у верхню частину полотна: її рядок 0 і читає drawImage.
    gl.viewport(0, cv.height - H, W, H);
    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(0, cv.height - H, W, H);
    gl.clearColor(bg[0], bg[1], bg[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { W, H };
  }

  let cur = null;

  return {
    ok: () => !!init(),

    /** Починає кадр нахиленої карти. proj — [A, B, C, d] із render.js. */
    beginMap(w, h, k, proj, bg) {
      if (!init()) return false;
      cur = target(w * k, h * k, bg);
      gl.useProgram(progTile.pr);
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.enableVertexAttribArray(progTile.a.aPos);
      gl.enableVertexAttribArray(progTile.a.aUV);
      gl.vertexAttribPointer(progTile.a.aPos, 2, gl.FLOAT, false, 16, 0);
      gl.vertexAttribPointer(progTile.a.aUV, 2, gl.FLOAT, false, 16, 8);
      gl.uniform4f(progTile.u.uProj, proj[0], proj[1], proj[2], proj[3]);
      gl.uniform1i(progTile.u.uTex, 0);
      gl.activeTexture(gl.TEXTURE0);
      return true;
    },

    /**
     * Один тайл: чотири кути в координатах площини карти (x1, y1), за годинниковою з лівого верхнього.
     * uv — [u0, v0, u1, v1], коли беремо шматок батьківського тайла замість ненавантаженого.
     */
    tile(key, img, c, uv) {
      if (!gl || !cur) return;
      const [a0, b0, a1, b1] = uv || [0, 0, 1, 1];
      quad.set([c[0], c[1], a0, b0, c[2], c[3], a1, b0, c[6], c[7], a0, b1, c[4], c[5], a1, b1]);
      gl.bufferData(gl.ARRAY_BUFFER, quad, gl.DYNAMIC_DRAW);
      gl.bindTexture(gl.TEXTURE_2D, tileTexture(key, img));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },

    /** Панорама: увесь кадр одним квадом, напрямок рахує шейдер. */
    pano(w, h, k, id, img, iw, ih, view, span, bg) {
      if (!init()) return null;
      cur = target(w * k, h * k, bg);
      gl.useProgram(progPano.pr);
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      quad.set([-1, -1, 0, 0, 1, -1, 0, 0, -1, 1, 0, 0, 1, 1, 0, 0]);
      gl.bufferData(gl.ARRAY_BUFFER, quad, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(progPano.a.aPos);
      gl.vertexAttribPointer(progPano.a.aPos, 2, gl.FLOAT, false, 16, 0);
      gl.uniform2f(progPano.u.uHalf, w / 2, h / 2);
      gl.uniform1f(progPano.u.uF, view.f);
      gl.uniform1f(progPano.u.uYaw, view.yaw);
      gl.uniform1f(progPano.u.uPitch, view.pitch);
      gl.uniform2f(progPano.u.uSpan, span[0], span[1]);
      gl.uniform3f(progPano.u.uVoid, bg[0], bg[1], bg[2]);
      gl.uniform1i(progPano.u.uTex, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, imgTexture(id, img, iw, ih));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return this.finish();
    },

    /** Віддає полотно й розмір намальованої області для drawImage. */
    finish() {
      if (!gl || !cur) return null;
      const r = { cv, w: cur.W, h: cur.H };
      gl.disable(gl.SCISSOR_TEST);
      cur = null;
      return r;
    },

    /** Забути текстуру зображення (замінили фото в панелі). */
    forget(id) {
      const t = imgTex.get(id);
      if (t && gl) gl.deleteTexture(t.tex);
      imgTex.delete(id);
    },
  };
})();
