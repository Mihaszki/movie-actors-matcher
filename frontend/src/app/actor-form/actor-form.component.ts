import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActorsService } from '../actors.service';
import { Router } from '@angular/router';
import { listAnimation } from '../animations';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.scss'],
  animations: [listAnimation]

})
export class ActorFormComponent implements OnInit {

  constructor(private actorsService: ActorsService, private router: Router) { }

  actorForm = new FormGroup({
    name: new FormControl(''),
  });

  typingTimer: any;
  actorsList: any[] = [];
  selectedPeople: any[] = [];

  ngOnInit(): void {
  }

  onSubmit() {
    let value = '';
    for(let i = 0; i < this.selectedPeople.length; i++) {
      value += this.selectedPeople[i].id;
      if(i < this.selectedPeople.length - 1) value += ',';
    }
    this.router.navigate(['movies', value]);
  }

  addActor(index: number) {
    const found = this.selectedPeople.some(el => el.id === this.actorsList[index].id);
    if(!found) {
      this.selectedPeople.push(this.actorsList[index]);
      this.actorsList[index].selected = true;
    }
    console.log(this.selectedPeople);
  }

  removeActor(index: number) {
    const actor = this.actorsList.filter(el => el.id === this.selectedPeople[index].id);
    if(actor.length > 0) {
      const i = this.actorsList.indexOf(actor[0]);
      this.actorsList[i].selected = false;
    }
    this.selectedPeople.splice(index, 1);
    console.log(this.selectedPeople);
  }

  searchActor() {
    this.actorsService.searchActor(this.actorForm.get('name')?.value)
    .subscribe((data) => {
      this.actorsList = [];
      for(const result of data.results) {
        const found = this.selectedPeople.some(el => el.id === result.id);
        this.actorsList.push({
          selected: found,
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
    }, 200);
  }

}
