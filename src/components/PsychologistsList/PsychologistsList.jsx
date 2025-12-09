import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';

export default function PsychologistsList({ data }) {
  return (
    <>
      <ul>
        {data.map(psychologist => (
          <li key={psychologist.id}>
            <PsychologistCard psychologist={psychologist} />
          </li>
        ))}
      </ul>
    </>
  );
}
