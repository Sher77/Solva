import React from 'react';
import styles from './PlanetDetail.module.scss';

export interface PlanetProps {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
}

const PlanetDetail: React.FC<PlanetProps> = ({
  name,
  rotation_period,
  orbital_period,
  diameter,
  climate,
  gravity,
  terrain,
  population,
}) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <ul className={styles.cardList}>
        <li className={styles.cardItem}>Rotation period: {rotation_period}</li>
        <li className={styles.cardItem}>Orbital period: {orbital_period}</li>
        <li className={styles.cardItem}>Diameter: {diameter}</li>
        <li className={styles.cardItem}>Climate: {climate}</li>
        <li className={styles.cardItem}>Gravity: {gravity}</li>
        <li className={styles.cardItem}>Terrain: {terrain}</li>
        <li className={styles.cardItem}>Population: {population}</li>
      </ul>
    </div>
  );
};

export default PlanetDetail;
