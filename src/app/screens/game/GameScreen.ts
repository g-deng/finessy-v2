import { FancyButton } from "@pixi/ui";
import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import type { Ticker } from "pixi.js";
import { Container } from "pixi.js";

import { engine } from "../../getEngine";
import { PausePopup } from "../../popups/PausePopup";
import { SettingsPopup } from "../../popups/SettingsPopup";
import { Button } from "../../ui/Button";

import { MenuScreen } from "../menu/MenuScreen";
import { Label } from "../../ui/Label";
import { getMode } from "../../getMode";
import { Game } from "./Game";

/** The screen that holds the app */
export class GameScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ["main"]; // TODO: fix asset bundle stuff

  public gameContainer: Container;
  private modeLabel: Label;
  private game: Game;
  private pauseButton: FancyButton;
  private settingsButton: FancyButton;
  private backButton: FancyButton;
  private paused = false;

  constructor() {
    super();

    this.modeLabel = new Label({
      text: `game mode: ${getMode()}`,
      style: {
          fill: 0xffffff,
          align: "center",
          fontSize: 36,
      },
    });
    this.addChild(this.modeLabel);

    const buttonAnimations = {
      hover: {
        props: {
          scale: { x: 1.1, y: 1.1 },
        },
        duration: 100,
      },
      pressed: {
        props: {
          scale: { x: 0.9, y: 0.9 },
        },
        duration: 100,
      },
    };
    this.pauseButton = new FancyButton({
      defaultView: "icon-pause.png",
      anchor: 0.5,
      animations: buttonAnimations,
    });
    this.pauseButton.onPress.connect(() =>
      engine().navigation.presentPopup(PausePopup),
    );
    this.addChild(this.pauseButton);

    this.settingsButton = new FancyButton({
      defaultView: "icon-settings.png",
      anchor: 0.5,
      animations: buttonAnimations,
    });
    this.settingsButton.onPress.connect(() =>
      engine().navigation.presentPopup(SettingsPopup),
    );
    this.addChild(this.settingsButton);
    this.backButton = new Button({
      text: "Back",
      width: 175,
      height: 110,
    });
    this.backButton.onPress.connect(() =>
      engine().navigation.showScreen(MenuScreen),
    );
    this.addChild(this.backButton);

    this.game = new Game();
    this.gameContainer = new Container();
    this.addChild(this.gameContainer);
  }

  /** Prepare the screen just before showing */
  public prepare() {}

  /** Update the screen */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: Ticker) {
    if (this.paused) return;
    this.game.update();
  }

  /** Pause gameplay - automatically fired when a popup is presented */
  public async pause() {
    this.gameContainer.interactiveChildren = false;
    this.paused = true;
  }

  /** Resume gameplay */
  public async resume() {
    this.gameContainer.interactiveChildren = true;
    this.paused = false;
  }

  /** Fully reset */
  public reset() {}

  /** Resize the screen, fired whenever window size changes */
  public resize(width: number, height: number) {
    console.log(`Resizing to width ${width} and height ${height}`);
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.gameContainer.x = centerX;
    this.gameContainer.y = centerY;
    this.gameContainer.pivot.set(this.gameContainer.width * 0.5, this.gameContainer.height * 0.5);
    // console.log(this.gameContainer.x, this.gameContainer.y);
    // console.log(this.gameContainer.width, this.gameContainer.height);
    // console.log(this.gameContainer.pivot.x, this.gameContainer.pivot.y);
    this.pauseButton.x = 30;
    this.pauseButton.y = 30;
    this.settingsButton.x = width - 30;
    this.settingsButton.y = 30;
    this.backButton.x = centerX;
    this.backButton.y = height - 60;
    this.modeLabel.x = centerX;
    this.modeLabel.y = 30;
    this.game.resize(width, height);
  }

  /** Show screen with animations */
  public async show(): Promise<void> {
    engine().audio.bgm.play("main/sounds/bgm-main.mp3", { volume: 0.5 });

    const elementsToAnimate = [
      this.pauseButton,
      this.settingsButton,
      this.backButton,
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
    this.game.show(this);
  }

  /** Hide screen with animations */
  public async hide() {}

  /** Auto pause the app when window go out of focus */
  public blur() {
    if (!engine().navigation.currentPopup) {
      engine().navigation.presentPopup(PausePopup);
    }
  }
}
