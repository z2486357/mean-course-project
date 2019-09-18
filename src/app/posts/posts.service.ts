import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];

  constructor(private http: HttpClient,
    private router: Router) { }

  getPosts() {
    return [...this.posts]; // copy
  }

  getPostsFromServer() {
    // get the data -> transform _id to id -> store to this.posts
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath:post.imagePath
          };
        });
      }))
      .subscribe((transformPostData) => {
        this.posts = transformPostData;
      }
      );
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>('http://localhost:3000/api/posts/' + id);
  }

  addPost(title: string, content: string, image:File) {
    const postData=new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image,title);
    this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData).subscribe(
      (responseData) => {
        const post:Post={
          id:responseData.post.id,
          title:title,
          content:content,
          imagePath:responseData.post.imagePath
        };
        //console.log(responseData.message);
        this.posts.push(post);
        this.router.navigate(['/']);
      }
    );
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
      imagePath:null
    };
    this.http.put("http://localhost:3000/api/posts/" + id, post).subscribe(
      (response) => {
        //console.log('update!');
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((post) => post.id === id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.router.navigate(['/']);
      }
    )

  }

  deletePost(id: string) {
    this.http.delete("http://localhost:3000/api/posts/" + id).subscribe(
      (response) => {
        // console.log("deleted!");
        // filter remain the object which is true
        // console.log(id);
        const updatedPosts = this.posts.filter((post) => post.id !== id);
        this.posts = updatedPosts;
      }
    )
  }
}
