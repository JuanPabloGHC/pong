import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from './game';
import { Player } from './player';
import { Ball } from './ball';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameSubject: BehaviorSubject<Game>;
  private game$: Observable<Game>;
  isGaming = true
  isPaused = false
  isRestarted = false

  constructor() {
    const player1: Player = {
      points: 0,
      x_position: -250,
      y_position: 300,
      y_direction: 0,
      width: 10,
      height: 100,
      color: '#ee82ee'
    }

    const player2: Player = {
      points: 0,
      x_position: 250,
      y_position: 300,
      y_direction: 0,
      width: 10,
      height: 100,
      color: "#ee82ee"
    }

    const ball: Ball = {
      x_position: 0,
      y_position: 200,
      size: 25,
      color: '#ee82ee'
    }

    const game: Game = {
      player1: player1,
      player2: player2,
      ball: ball
    }
    this.gameSubject = new BehaviorSubject(game)
    this.game$ = this.gameSubject.asObservable();
  }

  setState() {
    this.isPaused = !this.isPaused
  }

  movePlayer(player: number, position: number) {
    this.game$.subscribe(game => {
      if(player == 1)
        game.player1.y_position = position
      else
        game.player2.y_position = position
    })
  }

  goal(player: number) {
    
    this.game$.subscribe(game => {

      if(this.isGaming){
        this.isGaming = false
        if(player == 1){
          game.player1.points += 1
        }
        else{
          game.player2.points += 1
        }
      }
  
      this.restart()

    })
  }

  checkWall(top: number, bottom: number, player: number): boolean {
    
    let tempP: Player | undefined
    
    this.game$.subscribe(game => {
      player == 1 ? tempP = game.player1 : tempP = game.player2
    })

    if(tempP && 
      ((top >= (tempP.y_position - 100) && top < tempP.y_position) ||
      (bottom > (tempP.y_position - 100) && bottom <= tempP.y_position))
    ){
      return true
    }
    
    return false
  }

  reset() {
    this.isRestarted = true
    this.isPaused = true

    this.game$.subscribe(game => {
      game.player1.points = 0
      game.player1.y_direction = 0
      game.player1.y_position = 300

      game.player2.points = 0
      game.player2.y_direction = 0
      game.player2.y_position = 300

      game.ball.x_position = 0
      game.ball.y_position = 200
      
    })

    this.restart()
  }

  async restart() {
    await new Promise(f => setTimeout(f, 6));
    
    this.isPaused = false
    this.isRestarted = false
    this.isGaming = true
  }

  getGame(): Observable<Game> {
    return this.game$;
  }

}
