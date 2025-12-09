import { useState } from 'react';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import icon from '../../../public/icons/icons.svg';
import css from './ReadMoreBtn.module.css';

export default function ReadMoreBtn({ reviews, name, photo }) {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isReadMoreOpen, setReadMoreOpen] = useState(false);

  const toggleReadMore = () => {
    setReadMoreOpen(prev => !prev);
  };

  const getFirstLetter = name => name[0].toUpperCase();

  return (
    <>
      <button
        type="button"
        className={css.readMoreBtn}
        onClick={toggleReadMore}
      >
        {isReadMoreOpen ? 'Read less' : 'Read more'}
      </button>
      {isReadMoreOpen && (
        <>
          <ul className={css.reviews}>
            {Array.isArray(reviews) &&
              reviews.map((review, index) => (
                <li key={index}>
                  <div className={css.personBox}>
                    <div className={css.personReviewIcon}>
                      <p className={css.firstLetterOfReviewer}>
                        {getFirstLetter(review.reviewer)}
                      </p>
                    </div>
                    <div className={css.personInfo}>
                      <p>{review.reviewer}</p>
                      <div className={css.iconWrapper}>
                        <svg width={16} height={16}>
                          <use href={`${icon}#star`}></use>
                        </svg>
                        <p>{review.rating}</p>
                      </div>
                    </div>
                  </div>
                  <p className={css.reviewText}>{review.comment}</p>
                </li>
              ))}
          </ul>

          <button
            className={css.makeAppointmentBtn}
            type="button"
            onClick={() => setIsAppModalOpen(true)}
          >
            Make an appointment
          </button>

          {isAppModalOpen && (
            <MakeAppointment
              name={name}
              photo={photo}
              onClose={() => setIsAppModalOpen(false)}
            />
          )}
        </>
      )}
    </>
  );
}
