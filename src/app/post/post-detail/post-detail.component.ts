import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../posts/post.model';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  comments: any;
  addedComment: any;
  id: any;
  loggedUser!: User;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.loggedUser$.subscribe((res) => {
      this.loggedUser = res;
    });

    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
    });
    // this.route.queryParams.subscribe((param: Params) => {
    //   console.log(param);
    //   this.addedComment = param['body'];
    // });

    this.getPost(this.id);
    this.getComments(this.id);

    this.postService.comment$.subscribe((res) => {
      console.log(res);
      this.addedComment = res;
    });
  }

  getPost(id: number) {
    this.postService.getPostById(id).subscribe(
      (res: Post) => {
        this.post = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getComments(id: number) {
    this.postService.getCommentsByPostId(id).subscribe((res: any) => {
      // console.log(res.comments);
      this.comments = res.comments;
    });
  }
}
