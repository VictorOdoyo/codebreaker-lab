import { integer } from './validate.js';
export function* permutations(n) {
  integer(n, 2, 10, 'width');
  function* visit(p, used) {
    if (p.length === n) {
      yield p;
      return;
    }
    for (let i = 0; i < n; i++)
      if (!used.has(i)) {
        used.add(i);
        yield* visit([...p, i], used);
        used.delete(i);
      }
  }
  yield* visit([], new Set());
}
export function factorial(n) {
  integer(n, 0, 10);
  let v = 1;
  for (let i = 2; i <= n; i++) v *= i;
  return v;
}
