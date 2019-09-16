import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType } from './mime-type.validator';

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
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  @Output() addPost = new EventEmitter<Post>();

  constructor(private postService: PostsService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isCreate = false;
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.postService.getPost(this.id).subscribe((post) => {
          this.post = {
            id: post._id,
            title: post.title,
            content: post.content
          }
          this.isLoading = false;
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content
          })
        });
      } else {
        this.isCreate = true;
        this.id = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.isCreate) {
      // this.postService.addPost(this.enteredTitle, this.enteredContent);
      this.postService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
      console.log(this.form.value.image)
    } else {
      this.postService.updatePost(this.id, this.form.value.title, this.form.value.content);
    }
    this.form.reset();
  }

  imagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log(this.imagePreview);
    }
    reader.readAsDataURL(file);
  }

}
