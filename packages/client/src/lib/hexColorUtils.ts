const hexValues = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];
const HEX_COLOR_LENGTH = 6;

function generateRandomHexValue() {
  const randomIdx = Math.floor(Math.random() * hexValues.length);
  return hexValues[randomIdx];
}

export function generateRandomHexColor() {
  const hexColor = [];

  for (let idx = 0; idx < HEX_COLOR_LENGTH; idx++) {
    hexColor.push(generateRandomHexValue());
  }

  return `#${hexColor.join('')}`;
}
