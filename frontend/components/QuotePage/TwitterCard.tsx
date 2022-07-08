import React, { useEffect } from "react";
import { getLines } from "../helpers";

type TwitterCardTypes = {
  quote: string;
  username: string;
  fullname?: string;
  fontSize: number;
  lineSpacing: number;
  startPos: number;
  hAlign: number;
  textAlign: string;
  canvasRef: any;
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
  canvasRef,
}: TwitterCardTypes) => {
  useEffect(() => {
    if (canvasRef && quote && (username || fullname)) {
      const canvas: any = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const textToDraw = `"${quote}" - ${fullname ? fullname : "@" + username}`;

      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, 300, 300);

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = textAlign;

      ctx.font = `${fontSize}px Inter`;

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
