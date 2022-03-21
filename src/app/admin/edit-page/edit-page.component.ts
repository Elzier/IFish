import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router'
import { of, switchMap } from 'rxjs'
import { PostService } from '../../shared/services/post.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

class FormBuilde {
}

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form!: FormGroup
  loading = false

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const postId = params.get('id')
        if (postId) {
          this.loading = true
          return this.postService.fetchPost(postId)
        }
        return of(null)
      })
    ).subscribe((post) => {
      if (post) {
        this.form = this.fb.group({
          title: [post.title, Validators.required],
          text: [post.text, Validators.required]
        })
      }
      this.loading = false
    })
  }

}
