import { Injectable } from '@angular/core';
import { multiply, add, min } from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class AffineTransformationService {

  constructor() { }

  _transformPoint(x, y, matrix, offset) {
    return add(
      multiply(
        [
          [matrix.a, matrix.b],
          [matrix.c, matrix.d],
        ],
        [
          x, y
        ]
      ),
      [
        offset.x, offset.y
      ]
    );
  };

  transform(triangle, matrix, offset):any {
    const TRANSFORMED_A = this._transformPoint(triangle.AX, triangle.AY, matrix, offset);
    const TRANSFORMED_B = this._transformPoint(triangle.BX, triangle.BY, matrix, offset);
    const TRANSFORMED_C = this._transformPoint(triangle.CX, triangle.CY, matrix, offset);
    return {
      AX: TRANSFORMED_A[0],
      AY: TRANSFORMED_A[1],
      BX: TRANSFORMED_B[0],
      BY: TRANSFORMED_B[1],
      CX: TRANSFORMED_C[0],
      CY: TRANSFORMED_C[1],
    }
  }

  frames(count, triangle, matrix, offset) {
    const transformation = {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      x: 0,
      y: 0,
    };

    const A_STEP = (matrix.a - 1) / count;
    const B_STEP = (matrix.b - 0) / count;
    const C_STEP = (matrix.c - 0) / count;
    const D_STEP = (matrix.d - 1) / count;
    const X_STEP = (offset.x - 0) / count;
    const Y_STEP = (offset.y - 0) / count;

    const frames = [];
    for (let i = 1; i < count; i++) {
      transformation.a += A_STEP;
      transformation.b += B_STEP;
      transformation.c += C_STEP;
      transformation.d += D_STEP;
      transformation.x += X_STEP;
      transformation.y += Y_STEP;
      frames.push(
        this.transform(
          triangle,
          transformation,
          {
            x: transformation.x,
            y: transformation.y,
          }
        )
      );
    }

    return frames;
  }

}
