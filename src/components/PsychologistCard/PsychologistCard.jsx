import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toggleFavorite } from '../../redux/favorites/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import ReadMoreBtn from '../ReadMoreBtn/ReadMoreBtn';
import Modal from '../Modal/Modal';
import icon from '../../../public/icons/icons.svg';
import css from './PsychologistCard.module.css';

export default function PsychologistCard({ psychologist }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = psychologist.id;
  const isFavorite = favorites.includes(id);

  const handleFavorite = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }
    dispatch(toggleFavorite(id));
  };

  return (
    <div className={css.cardWrapper}>
      <div className={css.photoWrapper}>
        <img
          className={css.doctorImg}
          src={psychologist.avatar_url}
          alt="photoOfDoctor"
        />
        <svg className={css.circleIcon} width={14} height={14}>
          <use href={`${icon}#circle`} />
        </svg>
      </div>

      <div className={css.fullInfoBox}>
        <div className={css.oneBox}>
          <div className={css.secondBox}>
            <p className={css.profText}>Psychologist</p>
            <p className={css.doctorName}>{psychologist.name}</p>

            <button
              className={`${css.heartBtn} ${isFavorite ? css.active : ''}`}
              onClick={handleFavorite}
            >
              <svg className={css.heartIcon} width={26} height={26}>
                <use href={`${icon}#heart`} />
              </svg>
            </button>
          </div>

          <div className={css.rateAndPriceWrapper}>
            <svg className={css.starIcon} width={16} height={16}>
              <use href={`${icon}#star`} />
            </svg>
            <p>Rating: {psychologist.rating}</p>
            <p>
              Price/1 hour:{' '}
              <span className={css.colorPrice}>
                {psychologist.price_per_hour}$
              </span>
            </p>
          </div>
        </div>

        <div className={css.mainInfoTextWrapper}>
          <div className={css.mainInfoTextFirstBox}>
            <div className={css.intoTextWrapper}>
              <p className={css.intoText}>
                <span className={css.infoGreyText}>Experience:</span>{' '}
                {psychologist.experience}
              </p>
            </div>
            <div className={css.intoTextWrapper}>
              <p className={css.intoText}>
                <span className={css.infoGreyText}>License:</span>{' '}
                {psychologist.license}
              </p>
            </div>
          </div>

          <div className={css.mainInfoTextSecondBox}>
            <div className={css.intoTextWrapper}>
              <p className={css.intoText}>
                <span className={css.infoGreyText}>Specialization:</span>{' '}
                {psychologist.specialization}
              </p>
            </div>
            <div className={css.intoTextWrapper}>
              <p className={css.intoText}>
                <span className={css.infoGreyText}>Initial consultation:</span>{' '}
                {psychologist.initial_consultation}
              </p>
            </div>
          </div>
        </div>

        <p className={css.description}>{psychologist.about}</p>
        <ReadMoreBtn
          reviews={psychologist.reviews}
          name={psychologist.name}
          photo={psychologist.avatar_url}
        />
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className={css.alert}>
            <p className={css.alertText}>
              Only authorized users can add favorites
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
