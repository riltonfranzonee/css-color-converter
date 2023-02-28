import fs from 'fs';

const converter = (filename: string): string => {
  let cssFile = fs.readFileSync(filename, 'utf-8');
  const colors = cssFile.match(/#.*?;/g); // find all colors

  colors?.forEach((hexString) => {
    let color = hexString.replace("#", '').replace(';', '');
    const digits = color.length;
    if(digits === 3 || digits === 4) color = color.split("").map(item => item.repeat(2)).join("");
    let hexadecimal = parseInt(color, 16);
    const output: number[] = [];
    for(let i = 0; i < color.length / 2; i++) {
      const colorNum = hexadecimal & 0xff // take only one byte
      hexadecimal = hexadecimal >> 8; // move one byte to the right
      output.push(colorNum);
    }
    const [red = 0, green = 0, blue = 0, alpha] = output.reverse();
    const rgbString = alpha !== undefined ? `rgba(${red} ${green} ${blue} ${alpha / 256});` : `rgb(${red} ${green} ${blue});`;
    cssFile = cssFile.replace(hexString, rgbString)
  })

  return cssFile;
}

export { converter }


