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
  actorsList: any[] = [];
  selectedPeople: any[] = [];

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.actorForm.value);
  }

  addActor(index: number) {
    if(!this.selectedPeople.includes(this.actorsList[index])) {
      this.selectedPeople.push(this.actorsList[index]);
      this.actorsList[index].selected = true;
    }
    console.log(this.selectedPeople);
  }

  removeActor(index: number) {
    const i = this.actorsList.indexOf(this.selectedPeople[index]);
    this.actorsList[i].selected = false;
    this.selectedPeople.splice(index, 1);
    console.log(this.selectedPeople);
  }

  searchActor() {
    this.actorsService.searchActor(this.actorForm.get('name')?.value)
    .subscribe((data) => {
      this.actorsList = [];
      for(const result of data.results) {
        this.actorsList.push({
          selected: false,
          id: result.id,
          name: result.name,
          profile_path: result.profile_path
        });
      }
    });
  }

  keyDown() {
    clearTimeout(this.typingTimer);
  }

  keyUp() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.searchActor();
    }, 100);
  }

}
