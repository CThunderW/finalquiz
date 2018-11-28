import React from "react";

const BidDetails = props => (
  <div className="BidDetails">
    <p>{props.body}</p>
    {/* <p>By {props.author.first_name}</p> */}
    <p>Created at: {props.created_at}</p>
    <button onClick={() => props.onDeleteClick(props.id)}>Delete</button>
  </div>
);

export default BidDetails;
