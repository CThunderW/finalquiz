import React, { Component } from "react";
// `Component` is a named export. Unlike `React` which is
// a default export.

// To create a named export in one of our files we write

// export statement as follows:
// export class Component { ... }
// export const Component = ...

// class Component { ... }
// export { Component }
import ListingDetails from "./ListingDetails";
import BidList from "./BidList";
import { Listing } from "../requests";
import NewBid from "./NewBid";

// When passing props to a JSX rendered component,
// write them as HTML attributes where its values must
// be surrounded by {...} if their type is something other than a string.
class ListingShowPage extends Component {
  // When writing your own constructor for React components,
  // you must take `props` as an argument.
  constructor(props) {
    // You must also call the constructor of its super class, Component, with
    // `super`.
    super(props);

    this.state = {
      loading: true,
      listing: null
    };

    this.deleteListing = this.deleteListing.bind(this);
    this.deleteBid = this.deleteBid.bind(this);
  }

  componentDidMount() {
    // Components rendered by the <Route> component are passed
    // three props: history, location and match.

    // `match` holds property thats your URL's params.
    const id = this.props.match.params.id;
    Listing.one(id).then(({ data }) => {
      this.setState({
        listing: data,
        loading: false
      });
    });
  }

  deleteListing() {
    Listing.delete(this.props.match.params.id).then(() => {
      this.props.history.push(`/listings/`);
    });
  }

  deleteBid(bidId) {
    const {
      listing,
      listing: { bids }
    } = this.state;

    this.setState({
      listing: {
        ...listing,
        bids: bids.filter(b => b.id !== bidId)
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <main className="ListingShowPage">
          <h2>Loading...</h2>
        </main>
      );
    }

    if (!this.state.listing) {
      return (
        <main className="ListingShowPage">
          <h1>Listing doesn't exist!</h1>
        </main>
      );
    }
    return (
      <main className="ListingShowPage">
        <ListingDetails {...this.state.listing} />
        <button onClick={this.deleteListing}>Delete</button>
        <h2
          style={{
            fontWeight: "300",
            color: "darkgreen"
          }}>
          Bids
        </h2>
        {/* <BidList
          onBidDeleteClick={this.deleteBid}
          bids={this.state.listing.bids}
        /> */}
        <NewBid />
        {/* <BidList /> */}
      </main>
    );
  }
}
export default ListingShowPage;
