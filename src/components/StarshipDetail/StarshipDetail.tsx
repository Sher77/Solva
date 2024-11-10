import React from 'react';
import styles from './SharshipDetail.module.scss';

export interface StarshipProps {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  max_atmosphering_speed: string;
  passengers: string;
  hyperdrive_rating: string;
  MGLT: string;
}

const StarshipDetail: React.FC<StarshipProps> = ({
  name,
  model,
  manufacturer,
  cost_in_credits,
  max_atmosphering_speed,
  passengers,
  hyperdrive_rating,
  MGLT,
}) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <ul className={styles.cardList}>
        <li className={styles.cardItem}>Model: {model}</li>
        <li className={styles.cardItem}>Manufacturer: {manufacturer}</li>
        <li className={styles.cardItem}>Cost: {cost_in_credits}</li>
        <li className={styles.cardItem}>Max speed: {max_atmosphering_speed}</li>
        <li className={styles.cardItem}>Passengers: {passengers}</li>
        <li className={styles.cardItem}>Rating: {hyperdrive_rating}</li>
        <li className={styles.cardItem}>MGLT: {MGLT}</li>
      </ul>
    </div>
  );
};

export default StarshipDetail;
