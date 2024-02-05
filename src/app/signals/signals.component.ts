import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgFor],
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css'
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);

  increment(){
    this.counter.update((oldValue) => oldValue+1);
    this.actions.update((oldValue)=> [...oldValue, 'Increment']);
  }

  decrement(){
    this.counter.set(this.counter()-1);
    this.actions.update((oldValue) => [...oldValue, 'Decrement']);
  }

}
