import { Component, OnInit } from '@angular/core'
import { PostService } from '../shared/services/post.service'
import { Post } from '../shared/interfaces'
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post!: Post | null

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const postId = params.get('id')
      if (postId) {
       this.postService.fetchById(postId).subscribe((post) => {
         this.post = post
       })
      }
    })
  }
}
