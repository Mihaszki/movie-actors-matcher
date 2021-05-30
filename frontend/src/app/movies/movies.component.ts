import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private actorsService: ActorsService) { }

  actors_ids: string = '';
  moviesList: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actors_ids = params['id'];
      this.searchForMovies();
    });
  }

  searchForMovies() {
    this.actorsService.searchMovies(this.actors_ids)
    .subscribe((data) => {
      this.moviesList = [];
      for(const result of data.results) {
        this.moviesList.push({
          original_title: result.original_title,
          overview: result.overview,
          poster_path: result.poster_path,
          release_date: result.release_date,
          vote_average: result.vote_average,
          vote_count: result.vote_count,
        });
      }
    });
  }

}
