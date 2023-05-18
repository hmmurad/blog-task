import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './posts/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://dummyjson.com/posts?limit=150`);
  }

  getPostById(id: any): Observable<Post> {
    return this.http.get<Post>(`https://dummyjson.com/posts/${id}`);
  }

  getCommentsByPostId(id: number) {
    return this.http.get<any>(`https://dummyjson.com/posts/${id}/comments`);
  }
}
