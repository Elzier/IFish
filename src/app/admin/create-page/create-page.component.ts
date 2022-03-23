import { Component, OnInit } from '@angular/core'
import { FormValidationHelperService } from '../../shared/services/formValidationHelper.service'
import { FormBuilder, Validators } from '@angular/forms'
import { Post } from '../../shared/interfaces'
import { PostService } from '../../shared/services/post.service'
import { AlertService } from '../shared/services/alert.service'

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {

  submitted = false
  formService: FormValidationHelperService

  form = this.fb.group({
    title: [null, [Validators.required]],
    text: [null, [Validators.required, Validators.minLength(20)]],
    author: [null, [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private alertService: AlertService
  )
  {
    this.formService = new FormValidationHelperService(this.form)
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    }
    this.submitted = true
    this.postService.create(post).subscribe(() => {
      this.form.reset()
      this.alertService.success('Post successfully added!')
      this.submitted = false
    })
  }
}
