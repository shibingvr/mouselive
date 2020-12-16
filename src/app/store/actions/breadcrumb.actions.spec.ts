import { Breadcrumb } from '../models/breadcrumb.model';
import { BreadcrumbActions, ClickBreadcrumbAction, SetBreadcrumbAction } from './breadcrumb.actions';

describe('BreadcrumbActions', () => {
    const breadcrumb: Breadcrumb = {
        title: '',
        onClick: undefined
    };

    it('should create SetBreadcrumbAction action', () => {
        const action = new SetBreadcrumbAction(breadcrumb);

        expect(action.type).toEqual(BreadcrumbActions.SET_BBR);
        expect(action.breadcrumb).toEqual(breadcrumb);
    });
    it('should create ClickBreadcrumbAction action', () => {
        const action = new ClickBreadcrumbAction();

        expect(action.type).toEqual(BreadcrumbActions.CLICK_BR);
    });

});
