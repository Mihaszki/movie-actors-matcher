import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.scss']
})
export class ActorFormComponent implements OnInit {

  constructor(private actorsService: ActorsService) { }

  actorForm = new FormGroup({
    name: new FormControl(''),
  });

  typingTimer: any;
  actorsList: any = [];

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.actorForm.value);
  }

  searchActor() {
    this.actorsService.searchActor(this.actorForm.get('name')?.value)
    .subscribe((data) => {
      this.actorsList = data.results;
      console.log(this.actorsList);
    });
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
