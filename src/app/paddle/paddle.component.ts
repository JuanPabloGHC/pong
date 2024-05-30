import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Player } from '../player';

@Component({
  selector: 'app-paddle',
  standalone: true,
  imports: [],
  templateUrl: './paddle.component.html',
  styleUrl: './paddle.component.css'
})
export class PaddleComponent {

  @Input() gameMap: any

  @Input() playerNo?: number

  player?: Player

  me: any

  @Input() x_position = 0
  y_position = 300

  x_string = this.x_position.toString() + 'px'
  y_string = this.y_position.toString() + 'px'

  constructor(private gameService: GameService){ 
    this.gameService.getGame().subscribe(game => {
      this.playerNo == 1 ? this.player = game.player1 : this.player = game.player2
    })
  }

  ngAfterViewInit() {
    
    this.playerNo == 1 ?
    this.me = document.querySelector('.paddle1')
    :
    this.me = document.querySelector('.paddle2')

    this.draw()
  }

  async draw() {
    while(!this.gameService.isPaused && !this.gameService.isRestarted){

      this.gameService.getGame().subscribe(game => {
        this.playerNo == 1 ? this.player = game.player1 : this.player = game.player2
      })
      let direction = this.player ? this.player.y_direction : 0

      if(this.y_position > 0 && this.y_position < 600)
        this.y_position += direction
      else{
        if((this.y_position <= 0 && direction == 1) || (this.y_position >= 600 && direction == -1))
          this.y_position += direction
      }
      this.x_string = this.x_position.toString() + 'px'
      this.y_string = this.y_position.toString() + 'px'

      this.me.style.left = this.x_string
      this.me.style.top = this.y_string
      this.me.style.backgroundColor = this.player?.color
      this.me.style.width = this.player?.width + 'px'
      this.me.style.height = this.player?.height + 'px'

      if(this.playerNo)
        this.gameService.movePlayer(this.playerNo, this.y_position)
      
      await new Promise(f => setTimeout(f, 1));
    } 

    while(this.gameService.isPaused){
      await new Promise(f => setTimeout(f, 2));
      if(this.gameService.isRestarted && this.player)
        this.y_position = this.player.y_position
    }

    this.draw()

  }

}
