import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Params } from '@angular/router'
import { of, Subscription, switchMap } from 'rxjs'
import { PostService } from '../../shared/services/post.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Post } from '../../shared/interfaces'
import { AlertService } from '../shared/services/alert.service'
import { FormValidationHelperService } from '../../shared/services/formValidationHelper.service'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  loading = false
  post!: Post
  submitted = false
  editSub!: Subscription
  formService!: FormValidationHelperService

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const postId = params.get('id')
        if (postId) {
          this.loading = true
          return this.postService.fetchById(postId)
        }
        return of(null)
      })
    ).subscribe((post: Post | null) => {
      if (post) {
        this.post = post
        this.form = this.fb.group({
          title: [post.title, Validators.required],
          text: [post.text, Validators.required]
        })
        this.formService = new FormValidationHelperService(this.form)
      }
      this.loading = false
    })
  }

  editPost() {
    this.submitted = true
    this.editSub = this.postService.update({
      ...this. post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.submitted = false
      this.alertService.success('Post successfully updated!')
    })
  }

  ngOnDestroy() {
    if (this.editSub) this.editSub.unsubscribe()
  }
}
