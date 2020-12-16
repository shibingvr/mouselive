import { Action } from '@ngrx/store';
import { Breadcrumb } from '../models/breadcrumb.model';

export enum BreadcrumbActions {
    SET_BBR = '[BREADCRUMB] Set Breadcrumb',
    CLICK_BR = '[BREADCRUMB] Click Breadcrumb',
}

export class SetBreadcrumbAction implements Action {
    readonly type = BreadcrumbActions.SET_BBR;
    constructor(public breadcrumb: Breadcrumb) { }
}

export class ClickBreadcrumbAction implements Action {
    readonly type = BreadcrumbActions.CLICK_BR;

}

export type BreadcrumbAction = SetBreadcrumbAction | ClickBreadcrumbAction;

