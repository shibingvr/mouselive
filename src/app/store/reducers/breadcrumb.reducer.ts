import { BreadcrumbAction, BreadcrumbActions } from '../actions/breadcrumb.actions';
import { Breadcrumb } from '../models/breadcrumb.model';

const initialState: Breadcrumb = {
   title: '',
   onClick : undefined
};

export function BreadcrumbReducer(
    state: Breadcrumb = initialState,
    action: BreadcrumbAction
): any {
    switch (action.type) {
        case BreadcrumbActions.SET_BBR:
            return {
                ...state,
                title: action.breadcrumb.title,
                onClick: action.breadcrumb.onClick
            };
            break;

        case BreadcrumbActions.CLICK_BR:
            if (state.onClick) {
                state.onClick();
            }
            break;

        default:
            return state;
            break;
    }
}
