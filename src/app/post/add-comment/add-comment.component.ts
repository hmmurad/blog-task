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
  comment: any;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private loc: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
    });

    this.auth.loggedUser$.subscribe((res) => {
      this.userId = res.id;
    });
  }

  addComment() {
    this.postService
      .addComment(this.body, this.postId, this.userId)
      .subscribe((res) => {
        this.comment = [{ ...res }];
        this.postService.comment$.next([{ ...res }]);
        this.router.navigate(['../'], {
          relativeTo: this.route,
        });
      });
  }

  cancel() {
    this.loc.back();
  }
}
