customElements.define('kaleidoscope-canvas', class KaleidoscopeCanvas extends HTMLElement {
  static get observedAttributes() {
    return ['canvas-width', 'canvas-height', 'triangle-side', 'move-speed'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.canvas = document.createElement('canvas');
    this.shadowRoot.appendChild(this.canvas);
    this.baseImg = document.createElement('img');
    this.baseImg.style.display = 'none';
    this.baseImg.src = this.getAttribute('base-src') || '/base.jpg';
    this.baseRImg = document.createElement('img');
    this.baseRImg.style.display = 'none';
    this.baseRImg.src = this.getAttribute('base-r-src') || '/baseR.jpg';
    this.shadowRoot.appendChild(this.baseImg);
    this.shadowRoot.appendChild(this.baseRImg);
  }

  connectedCallback() {
    this.updateConfig();
    this.baseImg.onload = this.checkImagesLoaded;
    this.baseRImg.onload = this.checkImagesLoaded;
    this.loadedCount = 0;
  }

  attributeChangedCallback() {
    this.updateConfig();
  }

  updateConfig() {
    this.CONFIG = {
      canvasWidth: Number(this.getAttribute('canvas-width')) || 800,
      canvasHeight: Number(this.getAttribute('canvas-height')) || 400,
      triangleSide: Number(this.getAttribute('triangle-side')) || 150,
      moveSpeed: Number(this.getAttribute('move-speed')) || 1
    };
    this.canvas.width = this.CONFIG.canvasWidth;
    this.canvas.height = this.CONFIG.canvasHeight;
  }

  checkImagesLoaded = () => {
    this.loadedCount++;
    if (this.loadedCount === 2) this.onImagesLoaded();
  };

  onImagesLoaded() {
    const { triangleSide, moveSpeed } = this.CONFIG;
    const ctx = this.canvas.getContext('2d');
    const patDim = triangleSide;
    const SqrtOf3_4 = Math.sqrt(3) / 2;
    const height = SqrtOf3_4 * patDim;
    let offset = 0;
    const pat = ctx.createPattern(this.baseImg, "repeat");
    const patR = ctx.createPattern(this.baseRImg, "repeat");
    ctx.translate(-0.5 * patDim, 0);

    const drawKaleidoscope = (alternateMode) => {
      offset = (offset - moveSpeed) % 1024; // 使用配置的移动速度
      let i = 0;
      ctx.save();
      ctx.fillStyle = pat;
      ctx.translate(0, offset);
      while (i <= 3) {
        ctx.beginPath();
        ctx.moveTo(0, -offset);
        ctx.lineTo(patDim, -offset);
        ctx.lineTo(0.5 * patDim, height - offset);
        ctx.closePath();
        ctx.fill();
        if (i % 3 === 0) {
          ctx.translate(patDim, -offset);
          ctx.rotate(-120 * Math.PI / 180);
          ctx.translate(-patDim, offset);
        } else if (i % 3 === 1) {
          if (alternateMode) {
            ctx.rotate(120 * Math.PI / 180);
            ctx.translate(-3 * patDim, 0);
            ctx.rotate(-120 * Math.PI / 180);
          }
          ctx.translate(0.5 * patDim, height - offset);
          ctx.rotate(-120 * Math.PI / 180);
          ctx.translate(-0.5 * patDim, -height + offset);
        } else if (i % 3 === 2) {
          ctx.translate(0, -offset);
          ctx.rotate(-120 * Math.PI / 180);
          ctx.translate(0, offset);
        }
        i++;
      }
      ctx.restore();

      ctx.save();
      ctx.scale(-1, -1);
      ctx.fillStyle = patR;
      ctx.translate(
        (-i + (i % 3 === 0 ? 0.5 : i % 3 === 1 ? 1.5 : -0.5)) * patDim,
        -height + offset
      );
      ctx.translate(0, -offset);
      ctx.rotate(120 * Math.PI / 180);
      ctx.translate(0, offset);
      let j = 0;
      while (j < i + 1) {
        ctx.beginPath();
        if (j > 0 || !alternateMode) {
          ctx.moveTo(0, -offset);
          ctx.lineTo(patDim, -offset);
          ctx.lineTo(0.5 * patDim, height - offset);
          ctx.closePath();
          ctx.fill();
        }
        if (j % 3 === 1) {
          ctx.translate(patDim, -offset);
          ctx.rotate(-120 * Math.PI / 180);
          ctx.translate(-patDim, offset);
        } else if (j % 3 === 2) {
          ctx.translate(0.5 * patDim, height - offset);
          ctx.rotate(-120 * Math.PI / 180);
          ctx.translate(-0.5 * patDim, -height + offset);
        } else if (j % 3 === 0) {
          ctx.translate(0, -offset);
          ctx.rotate(-120 * Math.PI / 180);
          ctx.translate(0, offset);
        }
        j++;
      }
      ctx.restore();
    };

    const patternHeight = Math.floor(SqrtOf3_4 * patDim * 2);
    const tile = () => {
      const rowData = ctx.getImageData(0, 0, patDim * 3, patternHeight);
      for (let i = 0; patternHeight * i < this.CONFIG.canvasHeight + SqrtOf3_4 * patDim; i++) {
        for (let j = 0; j * patDim < this.CONFIG.canvasWidth + patDim; j += 3) {
          ctx.putImageData(rowData, j * patDim, i * patternHeight);
        }
      }
    };

    const animate = () => {
      drawKaleidoscope(false);
      ctx.translate(1.5 * patDim, height);
      drawKaleidoscope(true);
      ctx.translate(-1.5 * patDim, -height);
      tile();
      requestAnimationFrame(animate);
    };
    animate();
  }
}
);