import { ElementRef, OnDestroy, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { colorTemplate } from '../../environments/color-skin';
import { Subscription } from 'rxjs/Subscription';

declare var jQuery;

export class WorkspaceBaseComponent implements OnDestroy {
    closeEvent = new EventEmitter();
    settingsEvent = new EventEmitter();
    @Output() onCloseClick = new EventEmitter();
    colorSkin = colorTemplate;
    subscription: Subscription;
    ratio: string;
    name: string;
    id:number;
    filterState:boolean = true;
    @Input() size: any;

    constructor(public _element: ElementRef) {
        
        
    }

    ngAfterViewInit() {
        var elem = jQuery(this._element.nativeElement);
        var size = this.size;
        elem.draggable({
            opacity: 0.35,
            containment: "body",
            revert: function() {
                if (elem.position().top + size.height > window.innerHeight && elem.position().left + size.width > window.innerWidth) {
                    elem.animate({top: window.innerHeight-size.height, left: window.innerWidth-size.width}, 200);
                } else if (elem.position().top + size.height > window.innerHeight) {
                    elem.animate({top: window.innerHeight-size.height}, 200);
                } else if (elem.position().left + size.width > window.innerWidth) {
                    elem.animate({left: window.innerWidth- size.width}, 200);
                }
            }
        });
    }

    onZoom(size) {
        this.size = size;
        var elem = jQuery(this._element.nativeElement);
        var size = this.size;
        elem.draggable({
            opacity: 0.35,
            containment: "body",
            revert: function() {
                if (elem.position().top + size.height > window.innerHeight && elem.position().left + size.width > window.innerWidth) {
                    elem.animate({top: window.innerHeight-size.height, left: window.innerWidth-size.width}, 200);
                } else if (elem.position().top + size.height > window.innerHeight) {
                    elem.animate({top: window.innerHeight-size.height}, 200);
                } else if (elem.position().left + size.width > window.innerWidth) {
                    elem.animate({left: window.innerWidth- size.width}, 200);
                }
            }
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    onOpenYesNo() {
        this.onCloseClick.emit();
    }

    onClose(event) {
        this.closeEvent.emit('event');
    }

    hideButtons() {
        jQuery('svg .settings').hide();
        jQuery('svg .trash').hide();
    }

    loadProperties(prop: any) {}
}