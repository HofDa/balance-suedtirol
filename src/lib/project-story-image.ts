/** Creates a downloadable Instagram Story card locally in the browser. */
export async function createProjectStoryImage({ title, description, image, callToAction }: {
  title: string;
  description: string;
  image: string;
  callToAction: string;
}): Promise<Blob> {
  const photo = new Image();
  photo.src = image;
  await photo.decode();
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle = "#f3f6ee";
  ctx.fillRect(0, 0, 1080, 1920);
  ctx.fillStyle = "#16523b";
  ctx.font = "bold 56px sans-serif";
  ctx.fillText("b*alance", 80, 180);

  const wrap = (text: string, y: number, lineHeight: number, maxLines: number) => {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width > 920 && line) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
    const visible = lines.slice(0, maxLines);
    if (lines.length > maxLines) {
      let last = visible[maxLines - 1];
      while (ctx.measureText(last + "…").width > 920) last = last.slice(0, -1);
      visible[maxLines - 1] = last + "…";
    }
    visible.forEach((textLine, index) => ctx.fillText(textLine, 80, y + index * lineHeight));
  };
  ctx.font = "bold 64px sans-serif";
  wrap(title, 300, 78, 3);

  const photoY = 540;
  const photoHeight = 760;
  // Fit the complete project photo so that the card preserves its framing.
  const scale = Math.min(920 / photo.naturalWidth, photoHeight / photo.naturalHeight);
  const width = photo.naturalWidth * scale;
  const height = photo.naturalHeight * scale;
  ctx.fillStyle = "#dde6d4";
  ctx.fillRect(80, photoY, 920, photoHeight);
  ctx.drawImage(photo, 80 + (920 - width) / 2, photoY + (photoHeight - height) / 2, width, height);

  ctx.fillStyle = "#20372c";
  ctx.font = "38px sans-serif";
  wrap(description, 1400, 54, 5);
  ctx.fillStyle = "#16523b";
  ctx.font = "bold 38px sans-serif";
  wrap(callToAction, 1780, 48, 2);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Image export failed")), "image/png"));
}
