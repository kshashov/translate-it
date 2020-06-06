import React from "react";
import * as ReactUltimatePagination from "react-ultimate-pagination";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

function Page(props) {
    return (
        <PaginationItem disabled={props.disabled} active={props.isActive}>
            <PaginationLink  href="#" onClick={props.onClick}>{props.value}</PaginationLink>
        </PaginationItem>
    );
}

function Ellipsis(props) {
    return <PaginationItem disabled={props.disabled}><PaginationLink  href="#">...</PaginationLink></PaginationItem>
}

function FirstPageLink(props) {
    return <PaginationItem disabled={props.disabled}><PaginationLink first /></PaginationItem>
}

function PreviousPageLink(props) {
    return <PaginationItem disabled={props.disabled}><PaginationLink previous /></PaginationItem>
}

function NextPageLink(props) {
    return <PaginationItem disabled={props.disabled}><PaginationLink next /></PaginationItem>
}

function LastPageLink(props) {
    return <PaginationItem disabled={props.disabled}><PaginationLink first /></PaginationItem>
}

function Wrapper(props) {
    return <Pagination listClassName="justify-content-center">{props.children}</Pagination>
}

const itemTypeToComponent = {
    'PAGE': Page,
    'ELLIPSIS': Ellipsis,
    'FIRST_PAGE_LINK': FirstPageLink,
    'PREVIOUS_PAGE_LINK': PreviousPageLink,
    'NEXT_PAGE_LINK': NextPageLink,
    'LAST_PAGE_LINK': LastPageLink
};

const UltimatePagination = ReactUltimatePagination.createUltimatePagination({
    itemTypeToComponent: itemTypeToComponent,
    WrapperComponent: Wrapper
});

export default UltimatePagination;