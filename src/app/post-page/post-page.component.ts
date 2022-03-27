import { Component, OnInit } from '@angular/core'
import { PostService } from '../shared/services/post.service'
import { Observable, of, switchMap } from 'rxjs'
import { Post } from '../shared/interfaces'
import { ActivatedRoute, ParamMap, Params } from '@angular/router'

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.fetchById(params['id'])
    }))
  }
}
