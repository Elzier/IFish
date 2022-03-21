import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FbDbResponse, Post } from '../interfaces'
import { map, Observable, of, tap } from 'rxjs'
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

  fetchPosts():Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`).pipe(
      map((res: {[key: string]: any} | null) => {
        if (res === null) {
          return []
        }
        return Object.keys(res).map(key => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }))
      })
    )
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }
}
