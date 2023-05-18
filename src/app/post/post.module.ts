import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PostsComponent, PostDetailComponent, PostCommentComponent],
  imports: [CommonModule, RouterModule, HttpClientModule, NgxPaginationModule],
})
export class PostModule {}
