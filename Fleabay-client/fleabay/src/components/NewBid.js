import React from "react";

const NewBid = () => (
  <div className="NewBid">
    <form action="/listings" method="post">
      <input type="text" name="bidAmount" placeholder="Bid Amount" />
      <button type="submit">Place your bid!</button>
    </form>
  </div>
);

export default NewBid;
