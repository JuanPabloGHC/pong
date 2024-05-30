import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '../game';
import { BallComponent } from '../ball/ball.component';
import { PaddleComponent } from '../paddle/paddle.component';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BallComponent, PaddleComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  @Input() game?: Game

  @Input() direction1: number = 0

  @Input() direction2: number = 0

  @Output() goalEvent = new EventEmitter<boolean>()

  gameMap: any

  isPaused: boolean

  constructor(private gameService: GameService){
    this.isPaused = false
  }

  ngOnInit() {
    this.gameMap = document.querySelector('.screen')
  }

  restart(){
    this.gameService.reset()
    this.isPaused = false
  }

  setState(){
    this.isPaused = !this.isPaused
    this.gameService.setState()
  }

  goal(player: boolean) {
    // true: player 1, false: player 2
    this.goalEvent.emit(player)
  }

  onKeyDown(event: KeyboardEvent) {
    switch(event.key){
      case 'w':
        this.game ? this.game.player1.y_direction = -1 : null
        break;
      
      case 's':
        this.game ? this.game.player1.y_direction = 1 : null
        break;

      case 'o':
        this.game ? this.game.player2.y_direction = -1 : null
        break;
      
      case 'l':
        this.game ? this.game.player2.y_direction = 1 : null
        break;
    }
  }

}
