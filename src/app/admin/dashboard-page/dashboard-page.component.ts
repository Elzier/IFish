import { Component, OnDestroy, OnInit } from '@angular/core'
import { PostService } from '../../shared/services/post.service'
import { Subscription } from 'rxjs'
import { Post } from '../../shared/interfaces'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnDestroy {
  pSub: Subscription
  dpSub!: Subscription
  posts: Post[] = []
  searchStr = ''

  constructor(private postService: PostService) {
    this.pSub = this.postService.fetchPosts().subscribe((posts) => {
      this.posts = posts
    })
  }

  ngOnInit() {
    // this.pSub = this.postService.fetchPosts().subscribe((posts) => {
    //   this.posts = posts
    // })
  }

  ngOnDestroy(): void {
    if (this.pSub) this.pSub.unsubscribe()
    if (this.dpSub) this.dpSub.unsubscribe()
  }

  delete(id: string) {
    this.dpSub = this.postService.deletePost(id).subscribe()
    this.posts = this.posts.filter(post => post.id !== id)
  }
}
