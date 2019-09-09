import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  private isCreate = true;
  private id: string;
  private post: Post;

  @Output() addPost = new EventEmitter<Post>();

  constructor(private postService: PostsService,
    public route: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isCreate = false;
        this.id = paramMap.get('id');
        this.postService.getPost(this.id).subscribe((post) => {
          this.enteredTitle = post.title;
          this.enteredContent = post.content;
        });
      } else {
        this.isCreate = true;
        this.id = null;
      }
    });
  }

  onSavePost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    if (this.isCreate) {
      // this.postService.addPost(this.enteredTitle, this.enteredContent);
      this.postService.addPost(postForm.value.title, postForm.value.content);
    } else {
      this.postService.updatePost(this.id, postForm.value.title, postForm.value.content);
    }
    postForm.resetForm();
    this.router.navigate(['/']);
  }

}
