import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  @Output() addPost = new EventEmitter<Post>();

  constructor(private postService: PostsService) { }

  ngOnInit() {
  }

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return ;
    }
    // this.postService.addPost(this.enteredTitle, this.enteredContent);
    this.postService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }

}
