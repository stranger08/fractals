import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamplesService {

  constructor() { }

  exact() {
      return {
        "matrix": {
            "a": 1,
            "b": 0,
            "c": 0,
            "d": 1
        },
        "offset": {
            "x": 0,
            "y": 0
        }
    };
  }

  tree() {
    return [
      {
          "matrix": {
              "a": 0.17500000000000004,
              "b": -0.525,
              "c": 0.3375,
              "d": 0.4375
          },
          "offset": {
              "x": -120,
              "y": 80
          }
      },
      {
          "matrix": {
              "a": 0.42500000000000004,
              "b": 0.375,
              "c": -0.25,
              "d": 0.35000000000000003
          },
          "offset": {
              "x": 100,
              "y": 70
          }
      },
      {
          "matrix": {
              "a": -0.6000000000000001,
              "b": 0,
              "c": 1.0408340855860843e-17,
              "d": 0.4875
          },
          "offset": {
              "x": 20,
              "y": -2.5
          }
      },
      {
          "matrix": {
              "a": -0.024999999999999994,
              "b": 0.0625,
              "c": -0.45,
              "d": -0.025
          },
          "offset": {
              "x": 14,
              "y": -150
          }
      },
      {
          "matrix": {
              "a": -0.05500000000000001,
              "b": -0.0575,
              "c": 0.4499999999999999,
              "d": -0.075
          },
          "offset": {
              "x": 30,
              "y": -150
          }
      }
    ]
  }
}
