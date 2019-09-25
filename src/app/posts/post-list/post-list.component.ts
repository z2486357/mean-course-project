import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postsPerPage=2;
  currentPage=1
  pageSizeOptions=[1,2,5,10];
  isLoading = false;
  get totalPosts() {return this.postService.maxPosts;}
  get posts() { return this.postService.getPosts(); }
  constructor(private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPostsFromServer(this.postsPerPage,this.currentPage);
    this.isLoading = false;
  }

  delete(id: string) {
    this.postService.deletePost(id).subscribe(()=>{
      this.postService.getPostsFromServer(this.postsPerPage,this.currentPage);
    });
  }

  edit(id: string) {
    this.router.navigate(['edit/' + id]);
  }

  changePage(pageData:PageEvent){
    //console.log(pageData)
    this.isLoading = true;
    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.postService.getPostsFromServer(this.postsPerPage,this.currentPage);
    this.isLoading = false;
  }
}
