import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../models/movie';
import { DomSanitizer } from '@angular/platform-browser';
import { Serie, SingleSerie } from '../models/serie';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrls: ['./serie-details.component.css']
})
export class SerieDetailsComponent implements OnInit {

  favouriteSeries: Serie[];
  serie: SingleSerie;
  imageBaseUrl = 'https://image.tmdb.org/t/p/original';
  video: Video;

  constructor(private sanitizer: DomSanitizer, private movieService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const serieId: number = +this.route.snapshot.params.id;
    this.movieService.getSerie(serieId).subscribe(res => this.serie = res);
    this.movieService.getVideoSerie(serieId).subscribe(res => this.video = res);
  }
  getUrl(key){
    return 'https://www.youtube.com/watch?v=' + key;
  }
  
  getEmbedUrl(key){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + key + '?ecver=2')
  }
  
  checkLiked(serie) {
    this.favouriteSeries = this.movieService.getFavouriteSerie();
    const check = this.favouriteSeries.find(s => s.id === serie.id);
    if (check) {
      return true;
    } else {
      return false;
    }
  }
}