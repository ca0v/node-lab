import { Calculator as BaseCalc, Dice } from "./Calculator";

export class Calculator extends BaseCalc {
  fromDice(d1: Dice): number {
    if (d1 === "") return 0;
    if (this.isNegative(d1)) return -this.fromDice(this.negate(d1));

    const tail = this.tail(d1);
    const heads = this.heads(d1);
    return tail.charCodeAt(0) - "♿".charCodeAt(0) + 6 * this.fromDice(heads);
  }

  sign(d1: Dice): "" | "-" {
    return this.isNegative(d1) ? "-" : "";
  }

  abs(d1: Dice): Dice {
    d1 = this.strip(d1);
    return this.isNegative(d1) ? d1.substring(1) : d1;
  }

  head(dice: Dice): Dice {
    return this.sign(dice) + this.abs(dice)[0];
  }

  tail(dice: Dice): Dice {
    return dice[dice.length - 1];
  }

  heads(dice: Dice): Dice {
    return dice.substring(0, dice.length - 1);
  }

  tails(dice: Dice): Dice {
    const [_, ...tails] = dice.split("");
    return tails.join("");
  }

  slow_add(d1: Dice, d2: Dice): Dice {
    return this.dice(this.fromDice(d1) + this.fromDice(d2));
  }

  add2(d1: Dice, d2: Dice): Dice {
    if ("♿" == d1) return d2;
    if ("♿" == d2) return d1;

    if ("" == d1) return d2;
    if ("" == d2) return d1;

    const tail1 = this.tail(d1);
    const tail2 = this.tail(d2);

    const columnOneSum = this.slow_add(tail1, tail2);
    const columnOnePlaceCarryOver = this.heads(columnOneSum);
    const columnOnePlaceValue = this.tail(columnOneSum);

    const heads1 = this.heads(d1);
    const heads2 = this.heads(d2);
    const columnTwoSum = this.add2(heads1, heads2);

    const result =
      this.slow_add(columnOnePlaceCarryOver, columnTwoSum) +
      columnOnePlaceValue;

    return this.stripZero(result);
  }
}
