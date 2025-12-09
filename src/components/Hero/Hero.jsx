import { useNavigate } from 'react-router-dom';
import icon from '../../../public/icons/icons.svg';
import css from './Hero.module.css';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={css.heroSection}>
      <div className={css.textWrapper}>
        <h1 className={css.title}>
          The road to the <span className={css.colorTitle}>depths</span> of the
          human soul
        </h1>
        <p className={css.text}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <button
          className={css.button}
          onClick={() => navigate('/psychologists')}
        >
          <p className={css.btnText}> Get started</p>
          <svg className={css.btnIcon} width={18} height={18}>
            <use href={`${icon}#arrow`}></use>
          </svg>
        </button>
      </div>
      <div className={css.imgWrapper}>
        <div className={css.peopleBox}>
          <svg className={css.peopleIcon} width={20} height={20}>
            <use href={`${icon}#people`}></use>
          </svg>
        </div>
        <div className={css.questionBox}>
          <svg className={css.questionIcon} width={10} height={17}>
            <use href={`${icon}#question`}></use>
          </svg>
        </div>
        <img
          className={css.image}
          srcSet="/image.jpg 1x, /images/image@2x.jpg 2x"
          src="/images/heroImage.jpg"
          alt="psychologist"
        />
        <div className={css.block}>
          <div className={css.iconWrapper}>
            <svg className={css.blockIcon} width={30} height={30}>
              <use href={`${icon}#checkBox`}></use>
            </svg>
          </div>
          <div className={css.blockTextWrapper}>
            <p className={css.blockSmallText}>Experienced psychologists</p>
            <p className={css.blockBiggerText}>15,000</p>
          </div>
        </div>
      </div>
    </section>
  );
}
