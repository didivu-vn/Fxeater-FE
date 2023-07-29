import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HOST_URL } from '../util';

export interface IPageMetadata {
  title?: string;
  // image will be added later
  description?: string;
  author?: string;
  keywords?: string[];
  type?: string;
}

const defaultMetadata: IPageMetadata = {
  title: 'FXeater | First saw, first try',
  description: 'We are trying to expose real good Expert Advisors and Indicator from Japan trader to the world.',
  keywords: ['FX', 'Expert Advisors', 'Indicator'],
  type: 'website',
}

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

    constructor(private metaTagService: Meta,
      private titleService: Title,
      private router: Router
    ) {}

    public updateMetadata(metadata: Partial<IPageMetadata>, index: boolean = true): void {
      const pageMetadata: IPageMetadata = {...metadata};
      const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);
  
      this.metaTagService.addTags([
       ...metatags,
       { property: 'og:url', content: `${HOST_URL}${this.router.url}`},
       { name: 'robots', content: index ? 'index, follow' : 'noindex' },
       { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      ]);
  
      this.titleService.setTitle(pageMetadata.title || '');
    }
  
    private generateMetaDefinitions(metadata: IPageMetadata): MetaDefinition[] {
      return [
        { name: 'title', content: metadata.title || defaultMetadata.title || '' },
        { property: 'og:title', content: metadata.title || defaultMetadata.title || '' },  
        { name: 'description', content: metadata.description || defaultMetadata.description || ''},
        { property: 'og:description', content: metadata.description || defaultMetadata.description || '' },  
        { name: 'author', content: metadata.author || '' },
        { property: 'og:author', content: metadata.author || '' },  
        { name: 'keywords', content: metadata.keywords?.join(', ') || defaultMetadata.keywords?.join(', ') || '' },  
        { property: 'og:type', content: metadata.type || defaultMetadata.type || ''},
      ];
    }
}
