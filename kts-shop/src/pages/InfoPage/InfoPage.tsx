import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const InfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="info-page">
      <header className="main-page__header">
        <h1>HELLO55</h1>
      </header>
      <div className="Infopage__content">
        {product ? (
          <div className="product-detail">
            <img src={product.images[0]} alt={product.title} className="product-detail__image" />
            <div className="product-detail__info">
              <h1>{product.title}</h1>
              <p>Цена: ${product.price}</p>
              <p>{product.description}</p>
            </div>
          </div>
        ) : (
          <p>Продукт не найден</p>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
