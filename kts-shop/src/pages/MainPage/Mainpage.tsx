import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import Input from '../../components/Input';
import MultiDropdown from '../../components/MultiDropdown';
import Loader from '../../components/Loader';
import Text from '../../components/Text';
import Button from '../../components/Button';
import ArrowDownIcon from '../../components/icons/ArrowDownIcon';
import '../../App.css';
import 'components/Button';
import 'components/Input'

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
}

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Получение данных из API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        setProducts(response.data.slice(0, 9)); // Загружаем только первые 9 продуктов
      } catch (error) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Рендеринг состояния загрузки
  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="main-page">
      <header className="main-page__header">
        <h1>HELLO55</h1>
      </header>

      <div className="main-page__top">
        <div className="main-page__controls">
            <Text tag="h1" view="title" className="page-title" weight="bold">
                Products
            </Text>
            <Text tag="p" view="p-20" className="page-description" color="secondary">
                We display products based on the latest products we have. If you want to see our old products please enter the name of the item.
            </Text>
        </div>

        {/* Компонент поиска */}
        <div className="main-page__search">
            <Input
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search product"
            />
            <Button>
                Find now
            </Button>
        </div>

        {/* Компонент фильтра */}
        <div className="main-page__filter">
            <MultiDropdown
            options={[{ key: '1', value: 'Furniture' }, { key: '2', value: 'Electronics' }]}
            value={[]}
            onChange={() => {}}
            getTitle={() => 'Filter'}
            />
        </div>
      </div>
    
      <div className="main-page__catalog">
        <Text tag="h1" view="title" className="page-title" weight="bold">
            Total Product
        </Text>

        <section className="product-grid">
            {products.map(product => (
            <Card
                key={product.id}
                image={product.images[0]}
                title={product.title}
                subtitle={`$${product.price}`}
                captionSlot={product.category.name}
                actionSlot={<Button className="add-to-cart-button">Add to Cart</Button>}
            />
            ))}
        </section>
      </div>
      {/* Пагинация будет добавлена позже */}
      <div className="main-page__pagination">
        <ArrowDownIcon className="left"></ArrowDownIcon>
        <div className="main-page__pagination_buttons">
            <Button className="active_page">1</Button>
            <Button className="active_page">2</Button>
            <Button className="active_page">3</Button>

        </div>
        <ArrowDownIcon className="right"></ArrowDownIcon>

      </div>
    </div>
  );
};

export default MainPage;
