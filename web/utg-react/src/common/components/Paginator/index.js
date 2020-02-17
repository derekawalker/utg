import React from "react";
import { Icon, Pagination } from "semantic-ui-react";

// Styled Components.
import { Wrapper } from "./styles";

const Paginator = props => (
  <Wrapper>
    <Pagination
      defaultActivePage={1}
      ellipsisItem={{
        content: <Icon name="ellipsis horizontal" />,
        icon: true
      }}
      firstItem={null}
      lastItem={null}
      prevItem={{ content: <Icon name="angle left" />, icon: true }}
      nextItem={{ content: <Icon name="angle right" />, icon: true }}
      totalPages={props.totalPages}
      onPageChange={props.onPageChange}
      siblingRange={1}
      boundaryRange={1}
    />
  </Wrapper>
);

export default Paginator;
