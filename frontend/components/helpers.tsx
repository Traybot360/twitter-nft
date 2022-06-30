/**
 * @param ctx is the canvas context
 * @param text is the text to draw
 * @param maxWidth is the width of the canvas
 * @returns an array of strings that fit in the canvas width individually
 */
export function getLines(ctx: any, text: string, maxWidth: number) {
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
