import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // ⬅️ IMPORTANTE!
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideAnimations() // ⬅️ ESSENCIAL PARA O MAT-SELECT FUNCIONAR
  ]
}).catch(err => console.error(err));
