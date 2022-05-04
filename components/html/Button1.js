// Components
import Text from "components/html/Text1";

export default function Button({ title, onClick, disabled, className: cls }) {
  const className = `primary-button-color text-white w-full h-[7rem] text-[1.6rem] leading-[2rem] italic uppercase rounded-[1.2rem] font-[900] pointer flex items-center justify-center shadow-[0_4px_4px_#CB3156] ${cls}`;

  return (
    <button disabled={disabled} onClick={onClick}>
      <Text title={title} className={className} />
    </button>
  );
}
