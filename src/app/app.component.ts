import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'blog-task';

  ngOnInit(): void {
    console.log(Math.floor(Math.random() * (10.0 - 1.0 + 1.0)) + 1.0);
  }
}
