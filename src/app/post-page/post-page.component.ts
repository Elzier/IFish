import { Component, OnInit } from '@angular/core'
import { PostService } from '../shared/services/post.service'
import { Observable, of, switchMap } from 'rxjs'
import { Post } from '../shared/interfaces'
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post | null>
  post!: Post | null

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
      const postId = params.get('id')
        if (postId) {
        this.post$ = this.postService.fetchById(postId)
      }
      return of(null)
    }))
  }
}
