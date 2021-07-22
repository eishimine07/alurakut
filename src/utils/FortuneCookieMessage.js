export default function FortuneCookieMessage() {
  const messages = [
    'Defeitos e virtudes são apenas dois lados da mesma moeda.',
    'Podemos escolher o que semear, mas somos obrigados a colher o que plantamos.',
    'Lamentar aquilo que não temos é desperdiçar aquilo que já possuímos.',
    'O riso é a menor distância entre duas pessoas.',
  ];
  const index = Math.floor(Math.random() * (messages.length - 1));
  return messages[index];
}