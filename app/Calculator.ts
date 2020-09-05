type Dice = string;

export class Calculator {
  mult(d1: Dice, d2: Dice) {
    if ("♿" == d1) return "♿";
    if ("♿" == d2) return "♿";
    let answer = d2;
    let i = 5;
    while (d1 !== "⚀" && i--) {
      d1 = this.decrement(d1);
      answer = this.add(d2, answer);
    }
    return answer;
  }

  add(d1: Dice, d2: Dice): Dice {
    if ("♿" == d1) return d2;
    if ("♿" == d2) return d1;

    if (this.isNegative(d1))
      return this.negate(this.add(this.negate(d1), this.negate(d2)));

    return this.add(this.decrement(d1), this.increment(d2));
  }

  subtract(d1: Dice, d2: Dice): Dice {
    return this.add(d1, this.negate(d2));
  }

  strip(value: Dice) {
    if (value == "-♿") return "♿";
    return value.substring(0, 2) === "--" ? value.substring(2) : value;
  }

  negate(value: Dice) {
    value = this.strip(value);
    if (value == "♿") return "♿";
    if (value[0] == "-") return value.substring(1);
    return "-" + value;
  }

  isNegative(value: Dice) {
    return this.strip(value)[0] == "-";
  }

  stripZero(value: Dice) {
    if (value[0] == "♿") return value.substring(1);
    return value;
  }

  asCode(tail: Dice) {
    return tail.charCodeAt(0) - "♿".charCodeAt(0);
  }

  increment(value: Dice): Dice {
    if (value == "♿") return "⚀";
    if (value == "") return "⚀";
    if (value[0] == "-")
      return this.strip("-" + this.decrement(value.substring(1)));
    const head = value.substring(0, value.length - 1);
    const tail = value.substring(value.length - 1) as Dice;
    if (tail == "⚅") return this.increment(head) + "⚀";
    return head + this.dice(1 + this.asCode(tail));
  }

  decrement(value: Dice): Dice {
    if (value == "⚀") return "♿";
    if (value == "") return "-⚀";
    if (value == "♿") return "-⚀";
    if (value[0] == "-")
      return this.strip("-" + this.increment(value.substring(1)));

    const head = value.substring(0, value.length - 1);
    const tail = value.substring(value.length - 1);
    if (tail == "⚀") return this.stripZero(this.decrement(head)) + "⚅";
    return head + this.dice(this.asCode(tail) - 1);
  }

  dice(value: number): Dice {
    if (0 == value) return "♿";
    const ones = 1 + ((value - 1) % 6);
    const six = (value - ones) / 6;
    return (six ? this.dice(six) : "") + String.fromCharCode(ones + 9855);
  }

  stringToDice(name: string): Dice {
    return name
      .split("")
      .map((l) => 1 + l.charCodeAt(0) - "A".charCodeAt(0))
      .map((l) => this.dice(l))
      .join(".");
  }
}
