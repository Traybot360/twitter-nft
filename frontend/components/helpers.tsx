/**
 * @param ctx is the canvas context
 * @param text is the text to draw
 * @param maxWidth is the width of the canvas
 * @returns an array of strings that fit in the canvas width individually
 */
export const getLines = (
  ctx: any,
  text: string,
  maxWidth: number
): string[] => {
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
};

/**
 * @param img is the ipfs url of an image (includes ipfs://)
 * @returns the url of the image that can be used as the image src
 */
export const getImgUrl = (img: string): string => {
  return `https://ipfs.io/ipfs/${img.substring(7, img.length)}`;
};

/**
 *
 * @param date is the date the tweet was tweeted
 * @returns a string containing the date in the format "DD/MM/YYYY"
 */
export const convertDate = (date: string): string => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};
