import { Injectable, Optional, RendererFactory2, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class LinkService {

    constructor(
        private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document
    ) {
    }

    renderer = this.rendererFactory.createRenderer(this.document, {
      id: '-1',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {}
    });

    /**
     * Inject the State into the bottom of the <head>
     */
    addTag(tag: LinkDefinition, forceCreation?: boolean) {

        try {
            

            const link = this.renderer.createElement('link');
            const head = this.document.head;
            const selector = this._parseSelector(tag);

            if (head === null) {
                throw new Error('<head> not found within DOCUMENT.');
            }

            Object.keys(tag).forEach((prop: string) => {
                return this.renderer.setAttribute(link, prop, tag[prop]);
            });

            // [TODO]: get them to update the existing one (if it exists) ?
            this.renderer.appendChild(head, link);

        } catch (e) {
            console.error('Error within linkService : ', e);
        }
    }

    private _parseSelector(tag: LinkDefinition): string {
        // Possibly re-work this
        const attr: string = tag.rel ? 'rel' : 'hreflang';
        return `${attr}="${tag[attr]}"`;
    }

    removeTag(tag: LinkDefinition) {
      try {
    
          const selector = this._parseSelector(tag);
    
          const canonical = this.document.querySelector('link[' + selector + ']')
          const head = this.document.head;
    
          if (head === null) {
              throw new Error('<head> not found within DOCUMENT.');
          }
          if (!!canonical) {
              this.renderer.removeChild(head, canonical);
          }
      } catch (e) {
          console.error('Error within linkService : ', e);
      }
    }

    updateTag (tag: LinkDefinition) {
      this.removeTag(tag);
      this.addTag(tag);
    }
}

export declare type LinkDefinition = {
    charset?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
    type?: string;
} & {
        [prop: string]: string;
    };