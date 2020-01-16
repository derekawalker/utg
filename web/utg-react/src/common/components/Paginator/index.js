import React from "react";
import { Icon, Pagination } from "semantic-ui-react";

const Paginator = props => (
  <Pagination
    defaultActivePage={1}
    ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
    firstItem={null}
    lastItem={null}
    prevItem={{ content: <Icon name="angle left" />, icon: true }}
    nextItem={{ content: <Icon name="angle right" />, icon: true }}
    totalPages={props.totalPages}
    onPageChange={props.onPageChange}
    siblingRange={1}
    boundaryRange={1}
  />
);

export default Paginator;
