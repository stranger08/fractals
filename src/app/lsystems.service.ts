import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LSystemsService {

  constructor() { }

  rules(reproduction) {
    const rule_set = reproduction.split(',');

    return rule_set.map(raw_rule => {
      const rule_details = raw_rule.split(':');
      return {
        in: rule_details[0],
        out: rule_details[1],
      }
    });
  }

  produce(axiom, reproduction, iteration) {

    if (iteration <= 0) {
      return axiom;
    }

    let retVal = '';
    let rules = this.rules(reproduction);
    console.log(rules);

    for (let c of axiom) {
      const rule = rules.find(r => r.in == c);
      if (rule) {
        retVal = retVal + rule.out;
      } else {
        retVal = retVal + c;
      }
    }

    return  this.produce(retVal, reproduction, iteration - 1);;
  }

  koch() {
    return {
        axiom: 'F',
        iterations: 0,
        formula: "F:F+F--F+F",
        angle: 60,
        length: "1300",
        ratio: "0.333",
        x: "100",
        y: "500",
    }
  }

  snowflake() {
    return {
        axiom: '+F--F--F',
        iterations: 0,
        formula: "F:F+F--F+F",
        angle: 60,
        length: "200",
        ratio: "0.4",
        x: "700",
        y: "400",
    }
  }

  quadratic() {
    return {
        axiom: 'F+F+F+F',
        iterations: 0,
        formula: "F:F+F-F-FF+F+F-F",
        angle: 90,
        length: "200",
        ratio: "0.3",
        x: "700",
        y: "500",
    }
  }
  
  cantor() {
    return {
      axiom: 'F',
      iterations: 0,
      formula: "F:FIF,I:III",
      angle: 0,
      length: "1300",
      ratio: "1/3",
      x: "200",
      y: "500",
    }
  }
}
