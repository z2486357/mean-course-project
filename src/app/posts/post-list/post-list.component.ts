import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  isLoading = false;
  get posts() { return this.postService.getPosts(); }
  constructor(private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPostsFromServer();
    this.isLoading = false;
  }

  delete(id: string) {
    this.postService.deletePost(id);
  }

  edit(id: string) {
    this.router.navigate(['edit/' + id]);
  }
}
