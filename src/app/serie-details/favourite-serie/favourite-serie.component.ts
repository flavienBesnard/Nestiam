import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-favourite-serie',
  templateUrl: './favourite-serie.component.html',
  styleUrls: ['./favourite-serie.component.css']
})
export class FavouriteSerieComponent implements OnInit {
  display = false;
  favouriteSeries: any;
  serie;
  imageUrl: string = "https://image.tmdb.org/t/p/original";
  @ViewChild('0') img : ElementRef

  constructor(private movieService: MoviesService, public auth: AuthService) { }

  ngOnInit() {
    this.favouriteSeries = this.movieService.getFavouriteSerie();
    
  }

  setId() {
    if (this.serie.id) {
      return this.serie.id;
    }
    return this.serie.imdbID;
  }
  onRemove(id) {
    alert('Are you sure you want to want to remove this serie from your list?');
    this.movieService.removeFavouriteSerie(id);
    this.favouriteSeries = this.movieService.getFavouriteSerie();

  }

  getList() {
    if (this.favouriteSeries.length === 0) {
      return true;
    }
  }

  setImage(serie) {
    if (serie.poster_path) {
      return `${this.imageUrl}${serie.poster_path}`;
    }
    else {
      return serie.Poster;
    }
  }

  setDate(serie) {
    if (serie.first_air_date) {
      const date = serie.first_air_date.split("-");
      return date[0];
    }
  }
  getDisplay(index){
    var display = false;
    if( document.getElementById(index).getAttribute("alt") == 'undefined'){
      display = true;
    }
    else {
      display = false;
    }
    console.log("display =" + display);
    return display;
  }
}
