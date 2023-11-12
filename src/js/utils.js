export function createElementFromHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild;
}

export function validator(value) {
  if (!value) {
    return { error: 'Поле пустое, введите координаты!' };
  }

  const splitValue = value.split(',');
  const isValidLat = /^\[?((-?[1-8]?[0-9])(\.\d+)?|(-?90(\.0+)?))$/.test(
    splitValue[0],
  );
  const isValidLon = /^\s?((-?((10)?|(1?[1-7]?))[0-9])(\.\d+)?|(-?180(\.0+)?))\]?$/
    .test(splitValue[1]);

  if (splitValue.length !== 2 || !isValidLat || !isValidLon) {
    return { error: 'Введите правильные координаты!' };
  }

  const latitude = splitValue[0].replace(/\[/g, '');
  const longitude = splitValue[1].replace(/\s|\]/g, '');

  return { latitude, longitude };
}
