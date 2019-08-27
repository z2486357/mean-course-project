import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: "First Post", content: "This is the first post's content"},
  //   {title: "2 Post", content: "This is the 2 post's content"},
  //   {title: "3 Post", content: "This is the 3 post's content"},
  // ];
  @Input() posts: any;
  constructor() { }

  ngOnInit() {
  }

}
