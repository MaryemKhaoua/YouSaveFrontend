// posts.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostActions } from '../../store/posts/post.actions';
import { AuthService } from '../../services/auth.service';
import { selectFilteredPosts } from '../../store/posts/post.reducer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import Swal from 'sweetalert2';
import { format } from 'date-fns'; // Import the format function

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  newPostContent: string = '';
  profilePictureUrl =
    'https://cdn2.iconfinder.com/data/icons/circle-avatars-1/128/050_girl_avatar_profile_woman_suit_student_officer-512.png';
  loggedInUser: string | null = null;
  editingPost: Post | null = null;

  constructor(private store: Store, private authService: AuthService) {
    this.posts$ = this.store.select(selectFilteredPosts);
  }

  ngOnInit(): void {
    this.loadPosts();
    this.loggedInUser = this.authService.getUserName();
  }

  loadPosts(): void {
    this.store.dispatch(PostActions.loadPosts());
  }

  savePost(): void {
    if (this.newPostContent.trim()) {
      const newPost: Post = {
        id: this.editingPost ? this.editingPost.id : Date.now(),
        content: this.newPostContent,
        createdBy: this.loggedInUser || 'Unknown',
        profilePicture: this.profilePictureUrl,
        createdAt: new Date(),
      };
      console.log('Creating/Updating post:', newPost); 
      if (this.editingPost) {
        this.store.dispatch(PostActions.updatePost({ post: newPost }));
      } else {
        this.store.dispatch(PostActions.savePost({ post: newPost }));
      }
      this.newPostContent = '';
      this.editingPost = null;
    }
  }

  editPost(post: Post): void {
    this.editingPost = post;
    this.newPostContent = post.content;
  }

  deletePost(id: number | undefined): void {
    if (id !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this post!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(PostActions.deletePost({ id }));
          Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your post is safe :)', 'error');
        }
      });
    } else {
      console.error('Post ID is undefined');
    }
  }

  cancelEdit(): void {
    this.editingPost = null;
    this.newPostContent = '';
  }

  formatDate(date: Date | undefined): string {
    return date ? format(date, 'MMMM d, yyyy h:mm a') : 'Unknown date';
  }
}