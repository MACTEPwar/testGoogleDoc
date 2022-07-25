import { Params } from '@angular/router';
import { generateGuidv4 } from '../../helpers/guid-helper';

export class Tab {
  id: string;
  name: string | null;
  icon?: string;
  iconType?: 'prime' | 'fontawesome' | 'path';
  route: string[];
  queryParams?: Params;
  isClosable: boolean;
  /** Открывать такой же роут в отдельном табе ?*/
  isDistinctingOpen: boolean;
  isActive: boolean;
  tabParams?: any;

  constructor(route: string[], name: string | null = null) {
    this.id = generateGuidv4();
    this.name = name;
    this.route = route;
    this.isClosable = true;
    this.isDistinctingOpen = false;
    this.isActive = false;
    this.queryParams = {
      id: this.id,
    };
  }

  //   changeIsClosable(value: boolean): this {
  //     this.isClosable = value;
  //     return this;
  //   }

  changeOptions(newValues: {
    [key in keyof ITab]: unknown;
  }): this {
    Object.assign(this, newValues);
    return this;
  }

  changeQueryParams(queryParams: any): this {
    Object.assign(this.queryParams ?? {}, queryParams);
    return this;
  }
}

export interface ITab {
  name?: string | null;
  icon?: string;
  iconType?: 'prime' | 'fontawesome' | 'path';
  route?: string[];
  isClosable?: boolean;
  /** Открывать такой же роут в отдельном табе ?*/
  isDistinctingOpen?: boolean;
  isActive?: boolean;
  tabParams?: any;
}
