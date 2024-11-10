import React from 'react';
import styles from './CharacterDetail.module.scss';

export interface CharacterProps {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const CharacterDetail: React.FC<CharacterProps> = ({
  name,
  height,
  mass,
  hair_color,
  skin_color,
  eye_color,
  birth_year,
  gender,
}) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <ul className={styles.cardList}>
        <li className={styles.cardItem}>Height: {height}</li>
        <li className={styles.cardItem}>Mass: {mass}</li>
        <li className={styles.cardItem}>Hair color: {hair_color}</li>
        <li className={styles.cardItem}>Skin color: {skin_color}</li>
        <li className={styles.cardItem}>Eye color: {eye_color}</li>
        <li className={styles.cardItem}>Birth year: {birth_year}</li>
        <li className={styles.cardItem}>Gender: {gender}</li>
      </ul>
    </div>
  );
};

export default CharacterDetail;
