
module.exports = convert

/*
 * Any syntactically valid propositional formula φ must fall into
 * exactly one of the following 7 cases (that is, it is an instanceof
 * one of the 7 subclasses of Formula).
 *
 * @see https://www.cs.jhu.edu/~jason/tutorials/convert-to-CNF.html
 */

function convert(formula) {
  switch (formula.type) {
    case 'variable': return formula
    case 'conjunction': return convertConjunction(formula)
    case 'disjunction': return convertDisjunction(formula)
    case 'negation': return convertNegation(formula)
    case 'conditional': return convertConditional(formula)
    case 'biconditional': return convertBiconditional(formula)
    case 'xor': return convertXOR(formula)
    default:
      throw new Error(`Unknown formula type ${formula.type}.`)
  }
}

function convertConjunction(formula) {
  // CONVERT(P) must have the form P1 ^ P2 ^ ... ^ Pm, and
  // CONVERT(Q) must have the form Q1 ^ Q2 ^ ... ^ Qn,
  // where all the Pi and Qi are disjunctions of literals.
  // So return P1 ^ P2 ^ ... ^ Pm ^ Q1 ^ Q2 ^ ... ^ Qn.
}

function convertDisjunction(formula) {
  // CONVERT(P) must have the form P1 ^ P2 ^ ... ^ Pm, and
  // CONVERT(Q) must have the form Q1 ^ Q2 ^ ... ^ Qn,
  // where all the Pi and Qi are dijunctions of literals.
  // So we need a CNF formula equivalent to
  //    (P1 ^ P2 ^ ... ^ Pm) v (Q1 ^ Q2 ^ ... ^ Qn).
  // So return (P1 v Q1) ^ (P1 v Q2) ^ ... ^ (P1 v Qn)
  //         ^ (P2 v Q1) ^ (P2 v Q2) ^ ... ^ (P2 v Qn)
  //           ...
  //         ^ (Pm v Q1) ^ (Pm v Q2) ^ ... ^ (Pm v Qn)
}

function convertNegation(formula) {
  // If φ has the form ~(...), then:
  //   If φ has the form ~A for some variable A, then return φ.
  //   If φ has the form ~(~P), then return CONVERT(P).           // double negation
  //   If φ has the form ~(P ^ Q), then return CONVERT(~P v ~Q).  // de Morgan's Law
  //   If φ has the form ~(P v Q), then return CONVERT(~P ^ ~Q).  // de Morgan's Law
}

function convertConditional(formula) {
  // Return CONVERT(~P v Q).   // equivalent
  return convert({
    type: 'disjunction',
    base: {
      type: 'negation',
      formula: formula.base,
    },
    head: formula.head
  })
}

function convertBiconditional(formula) {
  // Return CONVERT((P ^ Q) v (~P ^ ~Q)).
  return convert({
    type: 'disjunction',
    base: {
      type: 'conjunction',
      base: formula.base,
      head: formula.head,
    },
    head: {
      type: 'conjunction',
      base: {
        type: 'negation',
        formula: formula.base,
      },
      head: {
        type: 'negation',
        formula: formula.head,
      },
    }
  })
}

function convertXOR(formula) {
  // CONVERT((P ^ ~Q) v (~P ^ Q)).
  return convert({
    type: 'disjunction',
    base: {
      type: 'conjunction',
      base: formula.base,
      head: {
        type: 'negation',
        formula: formula.head,
      },
    },
    head: {
      type: 'conjunction',
      base: {
        type: 'negation',
        formula: formula.base,
      },
      head: formula.head,
    }
  })
}
