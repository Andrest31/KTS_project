import React from 'react';
import styles from './Card.module.scss'; 

import Text from '../Text/Text';

export type NewCardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  heading: React.ReactNode;
  /** Описание карточки */
  description: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  sectionSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<NewCardProps> = ({
  className,
  image,
  captionSlot,
  heading,
  description,
  sectionSlot,
  onClick,
  actionSlot,
}) => (
  <div className={`${styles.container} ${className}`}>
    <img src={image} alt="card-thumbnail" className={styles.container__thumbnail} onClick={onClick} />

    <div className={styles.container__section}>
      <div className={styles.container__textBlock} onClick={onClick}>
        {captionSlot && <Text tag="p" color="secondary" view="p-14">{captionSlot}</Text>}
        {heading && <Text tag="p" data-testid="text" className={styles.container__heading} weight="bold" view="p-20">{heading}</Text>}
        {description && <Text tag="p" data-testid="text" className={styles.container__subtitle} color="secondary" view="p-16">{description}</Text>}
      </div>
      <div className={styles.container__controls}>
        {sectionSlot && <Text tag="p" weight="bold" view="p-18">{sectionSlot}</Text>}
        {actionSlot && <div>{actionSlot}</div>}
      </div>
    </div>
  </div>
);

export default Card;
