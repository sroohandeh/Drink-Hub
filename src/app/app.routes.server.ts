import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'drinks', renderMode: RenderMode.Server },
  { path: 'drinks/:id', renderMode: RenderMode.Server },

  {
    path: '**',
    renderMode: RenderMode.Client,
  },

  // { path: 'notifications', renderMode: RenderMode.Prerender },
];
