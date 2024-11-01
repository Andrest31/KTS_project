import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      {product ? (
        <>
          <h1>{product.title}</h1>
          <img src={product.images[0]} alt={product.title} style={{ width: '80%', maxWidth: '600px' }} /> {/* Увеличенный размер изображения */}
          <p>Цена: ${product.price}</p>
          <p>{product.description}</p>
        </>
      ) : (
        <p>Продукт не найден</p>
      )}
    </div>
  );
};

export default InfoPage;
