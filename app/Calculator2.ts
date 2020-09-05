import { Calculator as BaseCalc, Dice } from "./Calculator";

export class Calculator extends BaseCalc {
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

  private slow_add(d1: Dice, d2: Dice): Dice {
    if ("♿" == d1) return d2;
    if ("♿" == d2) return d1;

    if (this.isNegative(d1))
      return this.negate(this.slow_add(this.negate(d1), this.negate(d2)));

    return this.slow_add(this.decrement(d1), this.increment(d2));
  }

  add2(d1: Dice, d2: Dice): Dice {
    if ("♿" == d1) return d2;
    if ("♿" == d2) return d1;

    const tail1 = this.tail(d1);
    const tail2 = this.tail(d2);

    const columnOneSum = this.slow_add(tail1, tail2);
    const columnOnePlaceCarryOver = this.heads(columnOneSum);
    const columnOnePlaceValue = this.tail(columnOneSum);

    const heads1 = this.heads(d1);
    const heads2 = this.heads(d2);
    const columnTwoSum = this.add(heads1, heads2);
    return (
      this.slow_add(columnOnePlaceCarryOver, columnTwoSum) + columnOnePlaceValue
    );
  }
}
