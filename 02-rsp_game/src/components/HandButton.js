import HandIcon from './HandIcon';
import '../css/handButton.css';

function HandButton({ rsp, select }) {
  return (
    <button onClick={() => select(rsp)}>
      <HandIcon rsp={rsp} />
    </button>
  );
}

export default HandButton;
