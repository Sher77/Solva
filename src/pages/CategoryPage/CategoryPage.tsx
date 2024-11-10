import React from 'react';
import styles from './CategoryPage.module.scss';

import { useParams, Link } from 'react-router-dom';

const swapiUrl = import.meta.env.VITE_SWAPI_URL;

const CategoryPage = () => {
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [startPage, setStartPage] = React.useState<number>(1);
  const [endPage, setEndPage] = React.useState<number>(1);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<any[]>([]);
  const { type } = useParams<{ type: string }>();

  const baseUrl = `${swapiUrl}${type}?page=${page}`;

  React.useEffect(() => {
    setIsLoading(true);

    fetch(baseUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data.results || []);
        setTotalPages(Math.ceil(data.count / 10));
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, [baseUrl]);

  React.useEffect(() => {
    if (page === 1) {
      setStartPage(1);
      setEndPage(Math.min(totalPages, 3));
    } else if (page === totalPages) {
      setStartPage(Math.max(1, totalPages - 2));
      setEndPage(totalPages);
    } else {
      setStartPage(page - 1);
      setEndPage(page + 1);
    }
  }, [page, totalPages]);

  return (
    <section className={styles.card}>
      <header>
        <h1 className={styles.title}>{type}</h1>
      </header>
      <main>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Name:</td>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        className={styles.cardLink}
                        to={`/card/${type}/${index + 1}`}
                      >
                        {item.name}
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No data</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </main>
      <footer>
        <div className={styles.pagination}>
          {isLoading || data.length === 0 ? (
            ''
          ) : (
            <nav className={styles.paginationNav}>
              <button
                className={`${
                  page == 1
                    ? `${styles.paginationBtn} ${styles.inactive}`
                    : `${styles.paginationBtn}`
                }`}
                onClick={() => (page > 1 ? setPage((prev) => prev - 1) : null)}
              >
                Prev
              </button>
              {[...Array(endPage - startPage + 1)].map((_, i) => {
                const pageNum = startPage + i;

                return (
                  <li
                    key={pageNum}
                    className={
                      pageNum === page
                        ? `${styles.paginationBtn} ${styles.active}`
                        : `${styles.paginationBtn}`
                    }
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </li>
                );
              })}
              <button
                className={`${
                  page == totalPages
                    ? `${styles.paginationBtn} ${styles.inactive}`
                    : `${styles.paginationBtn}`
                }`}
                onClick={() =>
                  page !== totalPages ? setPage((prev) => prev + 1) : null
                }
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </footer>
    </section>
  );
};

export default CategoryPage;
