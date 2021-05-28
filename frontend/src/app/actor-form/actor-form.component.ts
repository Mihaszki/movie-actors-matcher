import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.scss']
})
export class ActorFormComponent implements OnInit {

  constructor() { }

  actorForm = new FormGroup({
    name: new FormControl(''),
  });

  typingTimer: any;

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.actorForm.value);
  }

  searchActor() {
    console.log(this.actorForm.get('name')?.value);
  }

  keyDown() {
    clearTimeout(this.typingTimer);
  }

  keyUp() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchActor();
    }, 1000);
  }

}
