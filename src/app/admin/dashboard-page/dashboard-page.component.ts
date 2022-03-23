import { Component, OnDestroy } from '@angular/core'
import { PostService } from '../../shared/services/post.service'
import { Subscription } from 'rxjs'
import { Post } from '../../shared/interfaces'
import { AlertService } from '../shared/services/alert.service'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnDestroy {
  pSub!: Subscription
  dpSub!: Subscription
  posts: Post[] = []
  searchStr = ''
  loading = false

  constructor(private postService: PostService, private alert: AlertService) {
    // this.loading = true
    // this.pSub = this.postService.fetchAll().subscribe((posts) => {
    //   this.posts = posts
    // })
  }

  ngOnInit() {
    this.loading = true
    this.pSub = this.postService.fetchAll().subscribe((posts: Post[] | null) => {
      if (posts) {
        this.posts = posts
      }
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) this.pSub.unsubscribe()
    if (this.dpSub) this.dpSub.unsubscribe()
  }

  delete(id: string) {
    this.dpSub = this.postService.delete(id).subscribe()
    this.posts = this.posts.filter(post => post.id !== id)
    this.alert.warning('Post has been deleted!')
  }
}
