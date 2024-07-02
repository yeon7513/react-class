import rock from '../assets/rock.svg';
import scissor from '../assets/scissor.svg';
import paper from '../assets/paper.svg';

const IMAGES = {
  rock: rock,
  scissor: scissor,
  paper: paper,
};

function HandIcon({ rsp, className }) {
  const src = IMAGES[rsp];
  return <img className={className} src={src} alt="" />;
}

export default HandIcon;
