import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  frameUrl: string;

  constructor(private activateRoute: ActivatedRoute) {
    const id = activateRoute.snapshot.params['id'];
    this.frameUrl = `https://docs.google.com/document/d/${id}/edit`;
  }

  ngOnInit(): void {}

  afterLoadIframe(ev: any): void {
    const buttons = (
      ev.target as HTMLIFrameElement
    ).contentWindow//?.document.querySelectorAll('.docs-titlebar-buttons');
    console.log(buttons);
  }
}
