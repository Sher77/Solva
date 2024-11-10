import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setData } from '../../redux/slices/CardSlice';
import styles from './EditCardModal.module.scss';

interface EditCardModalProps {
  data: { [key: string]: any };
  properties: string[];
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const EditCardModal: React.FC<EditCardModalProps> = ({
  data,
  properties,
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  const closeOnOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && target.id === 'wrap') {
      closeModal();
    }
  };

  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = 'hidden';
      document.body.addEventListener('click', closeOnOutsideClick);

      properties.forEach((key) => {
        if (key in data) {
          setValue(key, data[key]);
        }
      });
    } else {
      document.body.style.overflowY = 'scroll';
    }

    return () => {
      document.body.removeEventListener('click', closeOnOutsideClick);
      document.body.style.overflowY = 'scroll';
    };
  }, [isModalOpen, data, properties, setValue]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitForm = (formData: { [key: string]: any }) => {
    dispatch(setData(formData));
    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.modalWrap} id="wrap">
      <div className={styles.modal}>
        <button onClick={closeModal} className={styles.closeBtn}>
          <svg
            height="20px"
            width="20px"
            viewBox="0 0 26 26"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25
		C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0
		L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467
		L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468
		c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467
		C19.033,16.725,19.033,17.138,18.78,17.394z"
              />
            </g>
          </svg>
        </button>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          {properties.map((item) => (
            <label className={styles.label} key={item}>
              <span>
                {item.slice(0, 1).toUpperCase()}
                {item.slice(1).split('_').join(' ')}
              </span>
              <input type="text" {...register(item)} className={styles.input} />
            </label>
          ))}
          <button type="submit" className={styles.saveBtn}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCardModal;
