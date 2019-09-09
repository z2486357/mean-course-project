import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];

  constructor(private http: HttpClient) { }

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
            id: post._id
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

  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content,
    };
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post).subscribe(
      (responseData) => {
        console.log(responseData.message);
        post.id = responseData.postId;
        this.posts.push(post);
      }
    );
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
    };
    this.http.put("http://localhost:3000/api/posts/" + id, post).subscribe(
      (response) => {
        //console.log('update!');
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((post) => post.id === id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
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
