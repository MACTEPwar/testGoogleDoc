import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Tab } from './tab';
import { Router } from '@angular/router';

@Injectable()
export class TabService {
  tabs: BehaviorSubject<Array<Tab>> = new BehaviorSubject<Array<Tab>>([
    // {
    //   id: '',
    //   name: 'Drive',
    //   route: ['drive'],
    //   queryParams: {
    //     path: 'root',
    //   },
    //   isClosable: false,
    //   isDistinctingOpen: false,
    //   isActive: false,
    // } as Tab,
    // {
    //   id: '',
    //   name: 'Templates',
    //   route: ['templates'],
    //   isClosable: false,
    //   isDistinctingOpen: false,
    //   isActive: false,
    // } as Tab,
    new Tab(['drive'], 'Диск')
      .changeOptions({
        isClosable: false,
      })
      .changeQueryParams({ path: 'root' }),
    new Tab(['templates'], 'Шаблони').changeOptions({
      isClosable: false,
    }),
  ]);
  constructor(private router: Router) {}

  openTab(tab: Tab): void {
    this.tabs.next([...this.tabs.getValue(), tab]);
    const tabs = this.tabs.getValue();
    this.selectTab(tabs.length - 1);
  }

  selectTab(index: number): void {
    const tabs = this.tabs.getValue();
    tabs.forEach((f) => {
      f.isActive = false;
    });
    tabs[index].isActive = true;
    this.router.navigate(tabs[index].route, {
      queryParams: tabs[index].queryParams ?? null,
    });
  }
}
