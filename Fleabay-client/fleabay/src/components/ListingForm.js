import React from "react";
import FormErrors from "./FormErrors/FormErrors";

const ListingForm = props => {
  const handleSubmit = event => {
    event.preventDefault();

    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    props.onSubmit({
      title: formData.get("title"),
      body: formData.get("body")
    });

    // currentTarget.reset();
  };

  return (
    <form className="ListingForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label> <br />
        <input name="title" id="title" />
        <FormErrors forField="title" errors={props.errors} />
      </div>
      <div>
        <label htmlFor="body">Body</label> <br />
        <textarea name="body" id="body" cols="60" rows="4" />
        <FormErrors forField="body" errors={props.errors} />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default ListingForm;
