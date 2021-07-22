export default function RandomPersonalStatus(selecedtMin = 0) {
  const min = selecedtMin > 3 ? 3 : selecedtMin;
  const max = 3;
  return Math.floor(Math.random() * (max - min)) + min;
}
