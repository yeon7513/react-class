function random(n) {
  return Math.ceil(Math.random() * n);
}

export function generateRandomRsp() {
  const num = random(3);
  if (num === 1) {
    return 'rock';
  } else if (num === 2) {
    return 'scissor';
  } else {
    return 'paper';
  }
}

const WINS = {
  rock: 'scissor',
  scissor: 'paper',
  paper: 'rock',
};

export function compareRsp(a, b) {
  // 승리 ==> 1, 패배 ==> -1, 무승부 ==> 0
  if (WINS[a] === b) return 1;
  if (WINS[b] === a) return -1;
  return 0;
}
