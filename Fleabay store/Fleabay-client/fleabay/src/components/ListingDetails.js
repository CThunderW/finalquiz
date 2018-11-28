// In any file where we write JSX tags, we must import React
// because those tags will be translated into React.createElement(...)
// calls which as you can tell use React.
import React from "react";

// A React Component is a function that returns a React element.
// A React element is the object returned by the function
// React.createElement(...). The object is minimal version of a
// a DOM node containing the bare minimum properties.

// Your React components must be written as PascalCase. That is capitalized
// camelCase. Otherwise, React will treat it as an HTML tag and not render your
// component.

// To execute a JavaScript expression inside of JSX, you
// must write between {...}. The express must return a string
// or a React element or an array of React elements.
const ListingDetails = props => (
  <div className="ListingDetails">
    <h2
      style={{
        color: "maroon",
        fontWeight: "300"
      }}>
      {props.title}
    </h2>
    <p>{props.body}</p>
    <p>
      <small>Seen {props.view_count} time(s)</small>•
      <small>Created {props.created_at}</small>•
      <small>Last edited {props.updated_at}</small>
    </p>
  </div>
);

export default ListingDetails;
