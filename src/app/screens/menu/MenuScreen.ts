import { FancyButton } from "@pixi/ui";
import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import type { Ticker } from "pixi.js";
import { Container } from "pixi.js";

import { engine } from "../../getEngine";
import { Button } from "../../ui/Button";
import { type GameMode, setMode } from "../../getMode";
import { GameScreen } from "../game/GameScreen";

/** Choose the game mode */
export class MenuScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ["main"]; // TODO: fix asset bundle stuff

  private buttonContainer: Container;
  private infiniteButton: FancyButton;
  private sprintButton: FancyButton;
  private perfectionButton: FancyButton;
  private learnButton: FancyButton;

  private gameModeButton(gameMode: GameMode) {
    const button = new Button({
      text: gameMode,
      width: 175,
      height: 110,
    });
    button.onPress.connect(() => {
      setMode(gameMode);
      engine().navigation.showScreen(GameScreen);
    });
    this.buttonContainer.addChild(button);
    return button;
  }

  constructor() {
    super();
    this.buttonContainer = new Container();
    this.infiniteButton = this.gameModeButton("infinite");
    this.sprintButton = this.gameModeButton("sprint");
    this.perfectionButton = this.gameModeButton("perfection");
    this.learnButton = this.gameModeButton("learn");
    this.addChild(this.buttonContainer);
  }

  /** Prepare the screen just before showing */
  public prepare() {}

  /** Update the screen */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: Ticker) {}

  /** Pause gameplay - automatically fired when a popup is presented */
  public async pause() {}

  /** Resume gameplay */
  public async resume() {}

  /** Fully reset */
  public reset() {}

  /** Resize the screen, fired whenever window size changes */
  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    const buttonWidth = 175; // TODO: make flexible
    const buttonHeight = 110;

    this.buttonContainer.x = centerX - (buttonWidth * 1.5);
    this.buttonContainer.y = centerY - (buttonHeight) * 0.5;
    this.infiniteButton.x = 0;
    this.infiniteButton.width = buttonWidth;
    this.sprintButton.x = buttonWidth;
    this.sprintButton.width = buttonWidth;
    this.learnButton.x = buttonWidth * 2;
    this.learnButton.width = buttonWidth;
    this.perfectionButton.x = buttonWidth * 3;
    this.perfectionButton.width = buttonWidth;
  }

  /** Show screen with animations */
  public async show(): Promise<void> {
    engine().audio.bgm.play("main/sounds/bgm-main.mp3", { volume: 0.5 });

    const elementsToAnimate = [
      this.infiniteButton,
      this.sprintButton,
      this.perfectionButton,
      this.learnButton,
    ];

    let finalPromise!: AnimationPlaybackControls;
    for (const element of elementsToAnimate) {
      element.alpha = 0;
      finalPromise = animate(
        element,
        { alpha: 1 },
        { duration: 0.3, delay: 0.75, ease: "backOut" },
      );
    }

    await finalPromise;
  }

  /** Hide screen with animations */
  public async hide() {}

  public blur() {}
}
