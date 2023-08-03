import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <nav>
      <ul>
    
        <li><a class="fas fa-tasks" routerLink="/tasks">Tarefas</a></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent { }
