import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Serie } from '../models/serie';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SerieListComponent implements OnInit {
  seriesArray: any;
  imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  constructor(private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    const resolvedData: Serie[] = this.route.snapshot.data.resolvedSeries;
    this.seriesArray = resolvedData;
  }

}