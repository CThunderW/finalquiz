import React from "react";
import BidDetails from "./BidDetails";

const BidList = props => (
  <ul className="BidList">
    {props.bids.map(bid => (
      <li key={bid.id}>
        {/* <AnswerDetails
          author={answer.author}
          body={answer.body}
          created_at={answer.created_at}
        /> */}
        {/*
          Use ... to take all properties object
          and pass them props to a rendered React element.
          In the line below, we take all answer properties
          (i.e. id, author, body, created_at and updated_at)
          and we pass them as props of AnswerDetails.
        */}
        <BidDetails onDeleteClick={id => props.onBidDeleteClick(id)} {...bid} />
      </li>
    ))}
  </ul>
);
BidList.defaultProps = { bids: [] };
export default BidList;
