import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { QuillModule } from 'ngx-quill'
import { ObsWithStatusPipe } from './pipes/obs-with-status.pipe'

@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot()],
  declarations: [ObsWithStatusPipe],
  exports: [HttpClientModule, QuillModule, ObsWithStatusPipe]
})

export class SharedModule {}
