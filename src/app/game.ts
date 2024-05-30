import { Ball } from "./ball";
import { Player } from "./player";

export interface Game {
    player1: Player,
    player2: Player,
    ball: Ball
}