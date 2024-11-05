import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaginationIcon from 'components/icons/ArrowSite/ArrowSite';
import Text from 'components/Text/Text';
import Card from 'components/Card';
import styles from './ProductPage.module.scss';
import { ProductI } from 'pages/MainPage/MainPage';
import Button from 'components/Button';
import { handleCardClick } from 'utils/navigationUtils';
import Loader from 'components/Loader';
import '../../styles/styles.scss';
import { motion } from 'framer-motion';

const ProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};
    const [catalogItems, setCatalogItems] = useState<ProductI[]>([]);
    const [suggestedItems, setSuggestedItems] = useState<ProductI[]>([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const atFirstImage = currentImage === 0;
    const atLastImage = currentImage === product.images.length - 1;

    useEffect(() => {
        const fetchCatalogItems = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://api.escuelajs.co/api/v1/products');
                setCatalogItems(response.data);
            } catch (error) {
                console.error("Ошибка загрузки каталога:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCatalogItems();
    }, []);

    const handleNextImage = () => {
        if (!atLastImage) {
            setCurrentImage(currentImage + 1);
        }
    };

    const handlePrevImage = () => {
        if (!atFirstImage) {
            setCurrentImage(currentImage - 1);
        }
    };

    useEffect(() => {
        if (catalogItems.length > 0) {
            const randomSuggestions = catalogItems
                .filter((item) => item.id !== product.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            setSuggestedItems(randomSuggestions);
        }
    }, [catalogItems, product]);

    if (isLoading) return (
        <main className="page">
            <div className='page__loader _container'>
                <Loader />
            </div>
        </main>
    );

    return (
        <main id="main" className="page">
            <div className={`${styles.page__details} _container`}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={styles['details__button-wrap']}
                >
                    <div className={styles.details__button_back} onClick={() => navigate('/')}>
                        <PaginationIcon />
                        <Text view="p-20">Назад</Text>
                    </div>
                </motion.div>

                <div className={styles.details__content}>
                    <div className={styles.details__layout}>
                        <div className={styles["details__image-carousel"]}>
                            <button
                                onClick={handlePrevImage}
                                className={`${styles['details__carousel-control']} ${styles['carousel-left']} ${atFirstImage ? styles['details__carousel-disabled'] : ''}`}
                                disabled={atFirstImage}
                            >
                                <PaginationIcon direction="left" strokeWidth='3' color="base" />
                            </button>

                            <motion.img
                                key={product.images[currentImage]} // добавляем ключ для анимации при смене изображения
                                src={product.images[currentImage]}
                                alt={product.title}
                                className={styles.details__image}
                                style={{ width: '50%', maxWidth: '400px' }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                            />

                            <button
                                onClick={handleNextImage}
                                className={`${styles['details__carousel-control']} ${styles['carousel-right']} ${atLastImage ? styles['details__carousel-disabled'] : ''}`}
                                disabled={atLastImage}
                            >
                                <PaginationIcon direction="right" strokeWidth='3' color="base" />
                            </button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={styles['details__info']}
                        >
                            <div className={styles.details__title}>
                                <Text view="title" weight="bold">
                                    {product.title}
                                </Text>
                                <Text view="p-20" color="secondary">
                                    {product.description}
                                </Text>
                            </div>
                            <div className={styles.details__cost}>
                                <Text view="title" className="page-title-price" weight="bold">
                                    ${product.price}
                                </Text>
                                <div className={styles.details__actions}>
                                    <Button width="135px" className={styles["buy-now-button"]}>Buy Now</Button>
                                    <Button className={styles["add-to-cart-button"]}>Add to Cart</Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={styles['details__related']}
                    >
                        <Text view="p-32" className={styles.details__related_heading} weight="bold">
                            Related Items
                        </Text>
                        <div className={`${styles.related_products} _cards`}>
                            {suggestedItems.map((item: ProductI) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Card
                                        image={item.images[0]}
                                        title={item.title}
                                        subtitle={item.description}
                                        captionSlot={item.category.name}
                                        contentSlot={`$${item.price}`}
                                        actionSlot={<Button>Add to Cart</Button>}
                                        className={styles.related_product_card}
                                        onClick={() => handleCardClick(item, catalogItems, navigate)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
