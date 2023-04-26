function PostcardInformation(props) {
    return (
      <div className="information">
        <div style={{ flexDirection: "row" }}>
          <button className="postcardButton" onClick={props.flipFunction}>
            Flip
          </button>
        </div>
  
        <h3>Number: {props.databaseEntry.id}</h3>
        <h3>Date: </h3>
        <h3>Postmarked: {props.databaseEntry.data.postmarked}</h3>
        <h3>Place: {props.databaseEntry.data.location}</h3>
        <h3>Company: Unknown</h3>
        <h3>Information about Company: n/a</h3>
        <h3>
          Tags:{" "}
          {props.databaseEntry.data.tagData
            .reduce(
              (acc, x, i, arr) =>
                i !== arr.length - 1 ? acc + x + ", " : acc + x,
              " "
            )
            .toUpperCase()}
        </h3>
      </div>
    );
  }

export default PostcardInformation;