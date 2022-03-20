import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FbDbResponse, Post } from '../interfaces'
import { map, Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(post: Post): Observable<Post> {
    return this.http.post<FbDbResponse>(`${environment.fbDbUrl}/posts.json`, post).pipe(
      map((res: FbDbResponse) => {
        return {
          ...post,
          id: res.name
        }
      })
    )
  }
}
