import connector from './Connector';
import fetchMock from 'jest-fetch-mock';

describe('Connector', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('getProducts() should fetch products and return an array of products', async () => {
    const mockData = { products: [{ id: 1, title: 'product1', price: 10 }] };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const products = await connector.getProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
    });
  });

  test('getProduct() should fetch single product by id and return an object of product', async () => {
    const mockData = { id: 1, title: 'product1', price: 10 };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    const product = await connector.getProduct(1);
    expect(typeof product).toBe('object');
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
  });

  test('getProduct() should throw error when id not found', async () => {
    fetchMock.mockRejectOnce(new Error('No data'));
    await expect(connector.getProduct(0)).rejects.toThrow('No data');
  });
});
