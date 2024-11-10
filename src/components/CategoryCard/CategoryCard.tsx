import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  title: string;
  bg: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, bg, link }) => {
  return (
    <div className={styles.card} style={{ background: bg }}>
      {title}
      <Link to={`/card/${link}`} className={styles.cardLink}></Link>
    </div>
  );
};

export default CategoryCard;
