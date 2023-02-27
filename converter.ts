import fs from 'fs';

const converter = (filename: string) => {
  let cssFile = fs.readFileSync(filename, 'utf-8');
  const colors = cssFile.match(/#.*?;/g);

  colors?.forEach((colorString) => {
    const color = colorString.replace("#", '').replace(';', '');
    let hexadecimal = parseInt(color, 16);

    const output: number[] = [];

    while(hexadecimal > 0) {
      const colorNum = hexadecimal & 0xff // take only two bytes
      hexadecimal = hexadecimal >> 8; // move two bytes right
      output.push(colorNum)
    }

    const [blue, green, red] = output;
    cssFile = cssFile.replace(colorString, `rgb(${red} ${green} ${blue});`)
  })

  return cssFile;
}

export { converter }


