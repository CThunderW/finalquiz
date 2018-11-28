import React, { Component } from "react";
import ListingForm from "./ListingForm";
import { Listing } from "../requests";

class ListingNewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    this.createListing = this.createListing.bind(this);
  }

  createListing(params) {
    Listing.create(params).then(listing => {
      if (listing.errors) {
        this.setState({ errors: listing.errors });
      } else {
        this.props.history.push(`/listings/${listing.data.id}`);
      }
    });
  }

  render() {
    return (
      <main className="QuestionNewPage">
        <h1>New Listing</h1>
        <ListingForm errors={this.state.errors} onSubmit={this.createListing} />
      </main>
    );
  }
}

export default ListingNewPage;
