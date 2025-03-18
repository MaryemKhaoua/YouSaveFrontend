import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';
import { PostActions } from '../../store/posts/post.actions';
import { PostState, selectFilteredPosts } from '../../store/posts/post.reducer';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  // loading$: Observable<boolean>;
  // error$: Observable<string | null>;
  newPostContent: string = '';

  constructor(private store: Store) {
    this.posts$ = this.store.select(selectFilteredPosts);

  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.store.dispatch(PostActions.loadPosts());
  }

  savePost(): void {
    if (this.newPostContent.trim()) {
      const newPost: Post = {
        content: this.newPostContent
      };
      this.store.dispatch(PostActions.savePost({ post: newPost }));
      this.newPostContent = ''; 
    }
  }

  deletePost(id: number): void {
    this.store.dispatch(PostActions.deletePost({ id }));
  }
}