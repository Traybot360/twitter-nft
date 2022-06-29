import React, { useEffect, useRef } from "react";

/**
 * @param ctx is the canvas context
 * @param text is the text to draw
 * @param maxWidth is the width of the canvas
 * @returns an array of strings that fit in the canvas width individually
 */
function getLines(ctx: any, text: string, maxWidth: number) {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
    var word = words[i];
    var width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

type TwitterCardTypes = {
  quote: string;
  username: string;
  fullname: string;
  fontSize: number;
  lineSpacing: number;
  startPos: number;
  hAlign: number;
  textAlign: string;
};

const TwitterCard = ({
  quote,
  username,
  fullname,
  fontSize,
  lineSpacing,
  startPos,
  hAlign,
  textAlign,
}: TwitterCardTypes) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef && quote && (username || fullname)) {
      const canvas: any = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const textToDraw = `"${quote}" - ${fullname ? fullname : "@" + username}`;

      var grad = ctx.createLinearGradient(281, 0, 319, 200);

      grad.addColorStop(0, "rgba(238, 130, 238, 1)");
      grad.addColorStop(1, "rgba(0, 0, 255, 1)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 300, 300);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(0, 0, 300, 300);
      // ctx.beginPath();
      // ctx.rect(0, 0, 300, 300);
      // // ctx.fillStyle = "red";
      // ctx.fillStyle =
      //   "linear-gradient(90deg, rgba(238, 130, 238, 1) 0%, rgba(0, 0, 255, 1) 100%)";
      // ctx.fill();
      ctx.fillStyle = "#000000";
      ctx.textAlign = textAlign;

      ctx.font = `${fontSize}px Oleo Script Swash Caps`;

      const lines = getLines(ctx, textToDraw, 290);
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], hAlign, startPos + lineSpacing * i);
      }
    }
  }, [
    canvasRef,
    quote,
    username,
    fullname,
    fontSize,
    lineSpacing,
    startPos,
    hAlign,
    textAlign,
  ]);

  return <canvas ref={canvasRef} width={300} height={300} />;
};

export default TwitterCard;
