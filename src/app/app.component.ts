import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { Comment } from './models/comment.model';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username: string = '';
  user!: User;
  posts: PostWithComments[] = [];
  userNotFound: boolean = false;

  constructor(private apiService: ApiService) {}

  onSearch() {
    if (!this.username.trim()) {
      alert('Please enter a username');
      return;
    }
    this.userNotFound = false;
    this.posts = [];

    this.apiService
      .searchUserByUsername(this.username)
      .pipe(
        switchMap((user) => {
          if (user) {
            this.user = user;
            return this.apiService.getUserPosts(user.id);
          } else {
            throw new Error('User not found');
          }
        }),
        switchMap((posts) => {
          if (posts.length > 0) {
            const postsWithComments$ = posts.map((post) =>
              this.apiService.getCommentsForPost(post.id).pipe(
                map((comments) => ({
                  ...post,
                  comments,
                }))
              )
            );
            return forkJoin(postsWithComments$);
          } else {
            return [];
          }
        })
      )
      .subscribe({
        next: (postsWithComments: PostWithComments[]) => {
          this.posts = postsWithComments;
        },
        error: () => {
          this.user = undefined!;
          this.userNotFound = true;
        },
      });
  }
}

interface PostWithComments extends Post {
  comments: Comment[];
}
