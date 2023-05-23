import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HOST_URL } from '../util';

export interface IPageMetadata {
  title: string;
  // image will be added later
  description: string;
  author: string;
  keywords: string[];
  type: string;
}

const defaultMetadata: IPageMetadata = {
  title: 'Didivu | Tech & Life',
  description: 'Tech & life blog',
  author: 'stormie',
  keywords: ['Didivu', 'Switch to tech', 'Tech & life'],
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
      const pageMetadata: IPageMetadata = {...defaultMetadata, ...metadata};
      const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);
  
      this.metaTagService.addTags([
       ...metatags,
       { property: 'og:url', content: `${HOST_URL}${this.router.url}`},
       { name: 'robots', content: index ? 'index, follow' : 'noindex' },
       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
       { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      ]);
  
      this.titleService.setTitle(pageMetadata.title);
    }
  
    private generateMetaDefinitions(metadata: IPageMetadata): MetaDefinition[] {
      return [
        { name: 'title', content: metadata.title },
        { property: 'og:title', content: metadata.title },  
        { name: 'description', content: metadata.description },
        { property: 'og:description', content: metadata.description },  
        { name: 'author', content: metadata.author },
        { property: 'og:author', content: metadata.author },  
        { name: 'keywords', content: metadata.keywords.join(', ') },  
        { property: 'og:type', content: metadata.type },
      ];
    }


}
