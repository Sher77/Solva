import styles from './Main.module.scss';
import { cards } from '../../utils/cards';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

const Main = () => {
  return (
    <section className={styles.main}>
      <main>
        {cards.map((i) => (
          <div key={i.card}>
            <CategoryCard bg={i.background} link={i.link} title={i.card} />
          </div>
        ))}
      </main>
    </section>
  );
};

export default Main;
