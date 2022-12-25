import ICard from '../../components/constants/interfaces/ICard';

class Connector {
  private dataCards: ICard[] = [];
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  async getProducts(limit = 100): Promise<ICard[]> {
    if (this.dataCards.length && this.dataCards.length === limit) {
      return this.dataCards;
    }
    const endUrl = `?limit=${limit.toString()}`;
    const responce = await fetch(`${this.url}${endUrl}`);
    const data = await responce.json();
    this.dataCards = data.products;
    return this.dataCards;
  }

  async getProduct(id: number): Promise<ICard> {
    if (this.dataCards.length) {
      const result = this.dataCards.find((el) => el.id === id);
      if (result) {
        return result;
      }
    }
    const endUrl = `/${id.toString()}`;
    const responce = await fetch(`${this.url}${endUrl}`);
    const data = await responce.json();
    return data;
  }
}

const url = 'https://dummyjson.com/products';

const connector = new Connector(url);

export default connector;
