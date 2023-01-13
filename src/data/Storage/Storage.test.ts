import Storage from './Storage';

describe('Storage', () => {
  let storage: Storage;

  beforeEach(() => {
    storage = new Storage();
  });

  afterEach(() => {
    storage.clear();
  });

  test('saveValue() should save a value to local storage', () => {
    storage.saveValue('key', 'value');
    expect(localStorage.getItem('key')).toBe('value');
  });

  test('loadValue() should load a value from local storage', () => {
    localStorage.setItem('key', 'value');
    expect(storage.loadValue('key')).toBe('value');
  });

  test('clear() should clear all values from local storage', () => {
    localStorage.setItem('key1', 'value1');
    localStorage.setItem('key2', 'value2');
    storage.clear();
    expect(localStorage.length).toBe(0);
  });
});
