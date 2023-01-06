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

    try {
      const endUrl = `?limit=${limit.toString()}`;
      const responce = await fetch(`${this.url}${endUrl}`);

      if (!responce.ok) {
        throw new Error(`Sorry, but servet return status ${responce.status} error: ${responce.statusText}`);
      }
      const data = await responce.json();
      this.dataCards = data.products.map((el: ICard) => {
        if (el.brand.toUpperCase() === 'APPLE') {
          el.brand = 'Apple';
        }
        return el;
      });
    } catch (e) {
      console.log(e);
    }
    return this.dataCards;
  }

  async getProduct(id: number): Promise<ICard> {
    let result: ICard | undefined;
    if (this.dataCards.length) {
      result = this.dataCards.find((el) => el.id === id);
      if (result) {
        return result;
      }
    }
    const endUrl = `/${id.toString()}`;

    try {
      const responce = await fetch(`${this.url}${endUrl}`);
      if (!responce.ok) {
        throw new Error(`Sorry, but servet return status ${responce.status} error: ${responce.statusText}`);
      }
      const data: ICard = await responce.json();
      if (data.brand) {
        if (data.brand.toUpperCase() === 'APPLE') {
          data.brand = 'Apple';
        }
      }
      result = data;
    } catch (e) {
      console.log(e);
    }

    if (!result) {
      throw new Error('No data');
    }
    return result;
  }
}

const url = 'https://dummyjson.com/products';

const connector = new Connector(url);

export default connector;
