import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { GameComponent } from './game/game.component';
import { Game } from './game';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, FooterComponent, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  game?: Game

  constructor(private gameService: GameService){}

  ngOnInit() {
    this.gameService.getGame().subscribe(game =>{
      this.game = game;
    })
  }

  goal(player: boolean) {
    this.gameService.goal(player ? 1 : 2);
  }

}
