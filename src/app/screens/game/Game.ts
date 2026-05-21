import { animate } from "motion";
import { Block, TBlock } from "./Block";
import type { GameScreen } from "./GameScreen";
import { Graphics, Sprite, Texture } from "pixi.js";
import { engine } from "../../getEngine";

export class Game {

  public screen!: GameScreen;
  private currentBlock!: Block;
  private background!: Graphics;
  private grid!: Sprite;

  public async show(screen: GameScreen): Promise<void> {
    this.screen = screen;
    this.background = new Graphics().rect(0, 0, 400, 800).fill(0xeeeeee);
    this.grid = new Sprite({ texture: Texture.from("grid.png"), scale: 1 });
    this.currentBlock = new TBlock();
    this.screen.gameContainer.addChild(this.background);
    this.screen.gameContainer.addChild(this.grid);
    this.screen.gameContainer.addChild(this.currentBlock);
    this.screen.resize(engine().navigation.width, engine().navigation.height);
  }

  public update(): void {
    
  }

  public resize(w: number, h: number): void {
    
  }
}
