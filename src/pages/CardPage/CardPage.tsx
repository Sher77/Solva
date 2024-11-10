import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setData, setType, setId } from '../../redux/slices/CardSlice';
import styles from './CardPage.module.scss';
import CharacterDetail, {
  CharacterProps,
} from '../../components/CharacterDetail/CharacterDetail';
import PlanetDetail, {
  PlanetProps,
} from '../../components/PlanetDetail/PlanetDetail';
import StarshipDetail, {
  StarshipProps,
} from '../../components/StarshipDetail/StarshipDetail';

import EditCardModal from '../../components/EditCardModal/EditCardModal';

const characterProperties: (keyof CharacterProps)[] = [
  'name',
  'height',
  'mass',
  'hair_color',
  'skin_color',
  'eye_color',
  'birth_year',
  'gender',
];

const planetProperties: (keyof PlanetProps)[] = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'population',
];

const starshipProperties: (keyof StarshipProps)[] = [
  'name',
  'model',
  'manufacturer',
  'cost_in_credits',
  'max_atmosphering_speed',
  'passengers',
  'hyperdrive_rating',
  'MGLT',
];

const swapiUrl = import.meta.env.VITE_SWAPI_URL;

const CardPage = () => {
  const dispatch = useDispatch();
  const { type, id } = useParams<{
    type: 'people' | 'planets' | 'starships';
    id: string;
  }>();

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const data = useSelector((state: RootState) => state.card.data);
  const reduxType = useSelector((state: RootState) => state.card.type);
  const reduxId = useSelector((state: RootState) => state.card.id);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (type && id && (reduxType !== type || reduxId !== id)) {
      setLoading(true);
      const cardUrl = `${swapiUrl}${type}/${id}`;

      axios
        .get(cardUrl)
        .then((res) => {
          dispatch(setData(res.data));
          dispatch(setType(type));
          dispatch(setId(id));
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [type, id, reduxType, reduxId, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data found</p>;
  }

  const properties =
    type === 'people'
      ? characterProperties
      : type === 'planets'
      ? planetProperties
      : starshipProperties;

  return (
    <section className={styles.cardPage}>
      <main>
        <div className={styles.card}>
          <button
            className={styles.editBtn}
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            Edit
          </button>
          {type === 'people' && (
            <CharacterDetail {...(data as CharacterProps)} />
          )}
          {type === 'planets' && <PlanetDetail {...(data as PlanetProps)} />}
          {type === 'starships' && (
            <StarshipDetail {...(data as StarshipProps)} />
          )}
        </div>
        {isModalOpen && (
          <EditCardModal
            data={data}
            properties={properties as string[]}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </main>
    </section>
  );
};

export default CardPage;
