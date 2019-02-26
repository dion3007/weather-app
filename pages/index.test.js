const getWeather = require('./index');

  test('get weather seharusnya', async () => {
    await expect(getWeather()).resolves.toBe({});
  });
  
  test('Jika error', async () => {
    await expect(getWeather()).rejects.toThrow('Terjadi kesalahan pada saat memuat data');
  });