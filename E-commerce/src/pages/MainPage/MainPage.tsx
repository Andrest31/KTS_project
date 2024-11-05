import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from 'components/Loader';
import Text from 'components/Text/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import ArrowSiteIcon from 'components/icons/ArrowSite/ArrowSite';
import { useNavigate } from 'react-router-dom';
import { handleCardClick } from 'utils/navigationUtils';
import styles from './MainPage.module.scss';
import '../../styles/styles.scss';

export interface ProductI {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: { name: string };
}

// Анимационные параметры
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardHover = { scale: 1.05 };

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 9;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: { offset: (page - 1) * productsPerPage, limit: productsPerPage },
      });
      setProducts(response.data);
      const totalResponse = await axios.get('https://api.escuelajs.co/api/v1/products', { params: { limit: 0 } });
      setTotalProducts(totalResponse.data.length);
    } catch (error) {
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= 3) {
        range.push(1, 2, 3, '...', totalPages);
      } else if (currentPage < totalPages - 2) {
        range.push(1, '...', currentPage, '...', totalPages);
      } else {
        range.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      }
    }
    return range;
  };

  if (loading) return (
    <main className='page'>
      <div className='page__loader _container'>
        <Loader />
      </div>
    </main>
  );
  if (error) return <div className={styles['error-message']}>{error}</div>;

  return (
    <main id="main" className='page'>
      <div className={`${styles['page__main-block']} _container`}>
        <motion.div className={styles['products__content']} variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div className={styles['products__header']} variants={fadeIn}>
            <div className={styles['products__title']}>
              <Text view="title">Products</Text>
            </div>
            <div className={styles['products__description']}>
              <Text view="p-20" color="secondary">
                We display products based on the latest products we have. If you want to see our old products, please enter the name of the item.
              </Text>
            </div>
          </motion.div>

          <div className={styles['products__controls']}>
            <div className={styles['products__search']}>
              <div className={styles['products__search-column--left']}>
                <Input value={searchValue} onChange={setSearchValue} placeholder="Search product" />
              </div>
              <Button width='137px' className={styles['products__search-column--right']}>Find now</Button>
            </div>
            <div className={styles['products__filter']}>
              <MultiDropdown
                options={[{ key: '1', value: 'Furniture' }, { key: '2', value: 'Electronics' }]}
                value={[]}
                onChange={() => {}}
                getTitle={() => 'Filter'}
              />
            </div>
          </div>

          <motion.div className={styles['products__body']} variants={staggerContainer}>
            <motion.div className={styles['products__subtitle']} variants={fadeIn}>
              <Text view="p-32" className="page-title" weight="bold">Total Products</Text>
              <Text view="p-20" color="accent" weight="bold">{totalProducts}</Text>
            </motion.div>

            <section className={`${styles['products__cards']} _cards`}>
              {products.map((product) => (
                <motion.div className={styles['products__column']} key={product.id} whileHover={cardHover} variants={fadeIn}>
                  <Card
                    image={product.images[0] || 'C:/Users/Andresh/Desktop/KTS_project/E-commerce/src/components/_YSmr95v57I.jpg'} // Замените на реальный URL изображения по умолчанию
                    title={product.title}
                    subtitle={product.description}
                    captionSlot={product.category.name}
                    contentSlot={`$${product.price}`}
                    actionSlot={<Button>Add to Cart</Button>}
                    className={styles['products__card']}
                    onClick={() => handleCardClick(product, products, navigate)}
                  />
                </motion.div>
              ))}
            </section>
          </motion.div>
          
          <div className={styles['products__pagination']}>
            <div onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}>
              <ArrowSiteIcon color={currentPage > 1 ? 'primary' : 'secondary'} />
            </div>
            <div className={styles['products__pagination-buttons']}>
              {getPaginationRange().map((page, index) => (
                <Button
                  key={index}
                  width={38}
                  height={42}
                  className={`${styles['pagination-button']} ${page === currentPage ? styles['active-page'] : ''}`}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <div onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}>
              <ArrowSiteIcon direction="right" color={currentPage + 1 <= totalPages ? 'primary' : 'secondary'} />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default MainPage;
