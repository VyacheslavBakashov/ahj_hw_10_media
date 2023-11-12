import { validator } from '../utils';

test('Вывод ошибки пустого поля', () => {
  expect(validator('').error).toBe('Поле пустое, введите координаты!');
});

test('Вывод ошибки неправильных координат', () => {
  expect(validator('12').error).toBe('Введите правильные координаты!');
});

test('Возвращение правильных координат', () => {
  expect(validator('[-45.266, 176.023]')).toMatchObject({
    latitude: '-45.266',
    longitude: '176.023',
  });
});
