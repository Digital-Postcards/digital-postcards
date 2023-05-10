function PostcardInformation(props) {
    return (
      <div className="postcard-information">
        <p>Number: {props.databaseEntry.id}</p>
        <p>Date: </p>
        <p>Postmarked: {props.databaseEntry.data.postmarked}</p>
        <p>Place: {props.databaseEntry.data.location}</p>
        <p>Company: Unknown</p>
        <p>Information about Company: n/a</p>
        <p>
          Tags:{" "}
          {props.databaseEntry.data.tagData
            .reduce(
              (acc, x, i, arr) =>
                i !== arr.length - 1 ? acc + x + ", " : acc + x,
              " "
            )
            .toUpperCase()}
        </p>

        <div style={{ flexDirection: "row" }}>
          <button className="flip-button" onClick={props.flipFunction}>
            Flip
          </button>
        </div>
      </div>
    );
  }

export default PostcardInformation;