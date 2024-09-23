import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Comment } from './models/comment.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  searchUserByUsername(username: string): Observable<User> {
    return this.http
      .get<{ users: User[] }>(
        `${this.baseUrl}/users/filter?key=username&value=${username}`
      )
      .pipe(map((response) => response.users[0]));
  }

  getUserPosts(userId: number): Observable<Post[]> {
    return this.http
      .get<{ posts: Post[] }>(`${this.baseUrl}/posts/user/${userId}`)
      .pipe(map((response) => response.posts));
  }

  getCommentsForPost(postId: number): Observable<Comment[]> {
    return this.http
      .get<{ comments: Comment[] }>(
        `${this.baseUrl}/comments/post/${postId}`
      )
      .pipe(map((response) => response.comments));
  }
}
