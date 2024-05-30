import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';
import { Ball } from '../ball';

@Component({
  selector: 'app-ball',
  standalone: true,
  imports: [],
  templateUrl: './ball.component.html',
  styleUrl: './ball.component.css'
})
export class BallComponent {
  
  @Output() goalEvent = new EventEmitter<boolean>();

  isGaming = true
  isGoal = false

  ball?: Ball

  me: any

  @Input() gameMap: any

  width = 25
  height = 25

  x_direction = 1
  y_direction = 1

  game_velocity = 6

  // -347 <-> 328
  x_position = 0
  // -75 <-> 600
  y_position = 200

  x_string = this.x_position.toString() + 'px'
  y_string = this.y_position.toString() + 'px'

  constructor(private gameService: GameService){ 
    this.gameService.getGame().subscribe(game => {
      this.ball = game.ball
    })
   }

  ngAfterViewInit() {
    this.me = document.querySelector('.ball')

    this.draw();
  }

  async draw() {
    while(this.isGaming && !this.gameService.isPaused && !this.gameService.isRestarted && !this.isGoal){
      this.isGaming = this.gameService.isGaming

      this.me.style.left = this.x_string
      this.me.style.top = this.y_string
      this.me.style.backgroundColor = this.ball?.color;
      this.me.style.width = this.ball?.size + 'px';
      this.me.style.height = this.ball?.size + 'px';

      // Hit player ?
      if((this.x_position >= 215 && this.x_position <= 215) || (this.x_position >= -270 && this.x_position <= -270 )) {
        if(this.gameService.checkWall((this.y_position - this.height), this.y_position, (this.x_position < 0 ? 1: 2)))
          this.x_direction *= -1
      }

      // GOAL ?
      if(this.x_position <= -347 || this.x_position >= 328) {
        this.x_direction *= -1;
        this.isGoal = true
        this.x_position > 0 ? this.goal(true) : this.goal(false);
      }
      // Top / Bottom Wall
      if(this.y_position <= -75 || this.y_position >= 600) {
        this.y_direction *= -1;
      }

      this.x_position += this.x_direction
      this.y_position += this.y_direction
  
      this.x_string = this.x_position.toString() + 'px'
      this.y_string = this.y_position.toString() + 'px'

      await new Promise(f => setTimeout(f, this.game_velocity));
    }

    if(this.isGoal || this.gameService.isRestarted)
      this.restart()

    while(this.gameService.isPaused){
      await new Promise(f => setTimeout(f, 1));
      if(this.gameService.isRestarted)
        this.restart()
    }

    this.draw()
  }

  async restart() {
    if(this.ball){
      this.x_position = this.ball.x_position
      this.y_position = this.ball.y_position
    }

    this.x_direction = 1
    this.y_direction = 1

    while(!this.gameService.isGaming){
      await new Promise(f => setTimeout(f, 2));
    }
    this.isGaming = this.gameService.isGaming
    this.isGoal = false
  }

  goal(player: boolean) {
    // true: player 1, false: player 2
    this.goalEvent.emit(player);
  }

}
