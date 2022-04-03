import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { FbDbResponse, Post } from '../interfaces'
import { catchError, map, Observable, of, tap, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<FbDbResponse>(`${environment.fbDbUrl}/posts.json`, post).pipe(
      map((res: FbDbResponse) => {
        return {
          ...post,
          id: res.name
        }
      })
    )
  }

  fetchAll():Observable<Post[] | null> {
    return this.http.get<Post[] | null>(`${environment.fbDbUrl}/posts.json`).pipe(
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

  fetchById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`).pipe(
      map((res: Post) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        }
      }),
      catchError(() => {
        return throwError(() => "Post not found!")
      })
    )
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  update(post: Post): Observable<any> {
    return this.http.put(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }
}
