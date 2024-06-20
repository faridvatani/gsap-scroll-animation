document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const blockRows = document.querySelectorAll('.blocks-row');
  blockRows.forEach((row) => {
    for (let i = 0; i < 1; i++) {
      const block = document.createElement('div');
      block.className = 'block';
      row.appendChild(block);
    }
  });

  const blockContainers = document.querySelectorAll('.blocks-container');
  blockContainers.forEach((container) => {
    const rows = container.querySelectorAll('.blocks-row');
    const numRows = rows.length;

    rows.forEach((row, rowIndex) => {
      let blocks = Array.from(row.querySelectorAll('.block'));
      let isTop = container.classList.contains('top');
      let randomizedOrder = gsap.utils.shuffle(blocks.map((_, index) => index));

      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          let progress = self.progress;
          let rowDelay = 0.3 * (numRows - rowIndex - 1);
          let adjustProgress = Math.max(0, Math.min(1, progress - rowDelay));

          updateBlocksOpacity(blocks, randomizedOrder, isTop, adjustProgress);
        },
      });
    });
  });

  function updateBlocksOpacity(blocks, order, isTop, progress) {
    blocks.forEach((block, index) => {
      let offset = order.indexOf(index) / blocks.length;
      let adjustProgress = (progress - offset) * blocks.length;
      let opacity = isTop
        ? 1 - Math.min(1, Math.max(0, adjustProgress))
        : Math.min(1, Math.max(0, adjustProgress));

      block.style.opacity = opacity;
    });
  }
});
