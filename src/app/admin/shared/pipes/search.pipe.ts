import { Pipe, PipeTransform } from '@angular/core'
import { Post } from '../../../shared/interfaces'

@Pipe({name: 'searchPosts'})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], searchString: string): any {
    return posts.filter((post) => post.title.toLowerCase().includes(searchString.toLowerCase()))
  }
}
