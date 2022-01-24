
# CNF.js

Convert propositional formula trees into [Conjunctive Normal Form](https://en.wikipedia.org/wiki/Conjunctive_normal_form) (CNF).

```
const CNF = require('@lancejpollard/cnf.js')

CNF.convert()
```

## Data Structure

There are 2 main types, which are all subtypes of `formula`: `variable`, and `connective`. There are 3 types of `connective`: `negation`, `disjunction` and `conjunction`.

### Variable

Such as X.

```js
{
  type: 'variable',
  name: string,
  value: boolean,
}
```

### Negation

Such as ¬X.

```js
{
  type: 'negation',
  formula: formula
}
```

### Disjunction

Such as (A ∨ B).

```js
{
  type: 'disjunction',
  base: formula,
  head: formula,
}
```

### Conjunction

Such as (A ∧ B).

```js
{
  type: 'conjunction',
  base: formula,
  head: formula,
}
```
