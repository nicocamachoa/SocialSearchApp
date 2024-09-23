import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent {
  @Input() posts: PostWithComments[] = [];
}

interface PostWithComments extends Post {
  comments: Comment[];
}
