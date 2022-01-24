
# CNF.js

Convert propositional formula trees into [Conjunctive Normal Form](https://en.wikipedia.org/wiki/Conjunctive_normal_form) (CNF).

```js
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

## Equivalencies

Every propositional formula can be converted into an equivalent formula that is in CNF. This transformation is based on rules about [logical equivalences](https://en.wikipedia.org/wiki/Logical_equivalence): double negation elimination, De Morgan's laws, and the distributive law.

| Equivalency | Name |
|:---|:---|
| p∧⊤≡p<br/>p∨⊥≡p | Identity laws |
| p∨⊤≡⊤<br/>p∧⊥≡⊥ | Domination laws |
| p∨p≡p<br/>p∧p≡p | Idempotent or tautology laws |
| ¬(¬p)≡p | Double negation law |
| p∨q≡q∨p<br/>p∧q≡q∧p | Commutative laws |
| (p∨q)∨r≡p∨(q∨r)<br/>(p∧q)∧r≡p∧(q∧r) | Associative laws |
| p∨(q∧r)≡(p∨q)∧(p∨r)<br/>p∧(q∨r)≡(p∧q)∨(p∧r) | Distributive laws |
| ¬(p∧q)≡¬p∨¬q<br/>¬(p∨q)≡¬p∧¬q | De Morgan's laws |
| p∨(p∧q)≡p<br/>p∧(p∨q)≡p | Absorption laws |
| p∨¬p≡⊤<br/>p∧¬p≡⊥ | Negation laws |
