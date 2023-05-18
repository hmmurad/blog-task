import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../posts/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  comments: any;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      const id = +param['id'];
      this.getPost(id);
      this.getComments(id);
    });
  }

  getPost(id: number) {
    this.postService.getPostById(id).subscribe(
      (res) => {
        console.log(res);
        this.post = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getComments(id: number) {
    this.postService.getCommentsByPostId(id).subscribe((res: any) => {
      console.log(res.comments);
      this.comments = res.comments;
    });
  }
}
