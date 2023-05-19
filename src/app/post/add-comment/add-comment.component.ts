import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from '../post.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit {
  postId!: number;
  userId!: number;
  body!: string;
  comment = new Subject<any>();
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private loc: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.postId = params['id'];
    });

    this.auth.loggedUser$.subscribe((res) => {
      this.userId = res.id;
      console.log(this.userId);
    });
  }

  addComment() {
    this.postService
      .addComment(this.body, this.postId, this.userId)
      .subscribe((res) => {
        this.comment.next(res);
        this.router.navigate(['../'], {
          relativeTo: this.route,
          queryParams: { body: this.body },
        });
        console.log(res);
      });
  }

  cancel() {
    this.loc.back();
  }
}
