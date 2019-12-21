import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  get isAuth() { return this.authService.getAuthStatus(); }
  postsPerPage = 10;
  currentPage = 1
  pageSizeOptions = [1, 2, 5, 10];
  isLoading = false;
  get totalPosts() { return this.postService.maxPosts; }
  get posts() { return this.postService.getPosts(); }
  get userId() { return this.authService.getUserId(); }

  constructor(private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPostsFromServer(this.postsPerPage, this.currentPage);
    this.isLoading = false;
  }

  ngOnDestroy() {
  }

  delete(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPostsFromServer(this.postsPerPage, this.currentPage);
    });
  }

  edit(id: string) {
    this.router.navigate(['edit/' + id]);
  }

  changePage(pageData: PageEvent) {
    //console.log(pageData)
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPostsFromServer(this.postsPerPage, this.currentPage);
    this.isLoading = false;
  }
}
