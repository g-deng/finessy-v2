import { Sprite, Texture } from "pixi.js";

export type BlockType = "o" | "i" | "t" | "s" | "z" | "j" | "l";

export type Direction = "N" | "S" | "E" | "W";

export abstract class Block extends Sprite {

  protected direction: Direction;
  protected row: number; // bottom edge, range from 1 -> 20 (B -> T)
  protected col: number; // left edge, range from 1 -> 10 (L -> R)

  // abstract moveLeft(): void;
  // abstract moveRight(): void;
  // abstract rotateCW(): void;
  // abstract rotateCCW(): void;

  // rotate180() {
  //   this.rotateCW();
  //   this.rotateCW();
  // }

  constructor(type : BlockType, row: number, col: number, direction: Direction) {
    const tex = type + "-piece.png";
    super({ texture: Texture.from(tex), scale: 1 });
    this.direction = direction;
    this.row = row;
    this.col = col;
  }

}

export class TBlock extends Block {
  constructor(row?: number, col?: number, direction?: Direction) {
    super("t", row ?? 19, col ?? 4, direction ?? "N");
  }
}