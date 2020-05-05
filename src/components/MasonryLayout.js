import React from 'react';

const MasonryLayout = (props) => {
  const columnWrapper = {};
  const result = [];
  // create columns
  for (let i = 0; i < props.columns; i++) {
    columnWrapper[`column${i}`] = [];
  }
  // children into columns
  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % props.columns;
    columnWrapper[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${props.gap}em` }} key={i}>
        {props.children[i]}
      </div>
    );
  }
  // wrap children in each column with a div
  for (let i = 0; i < props.columns; i++) {
    result.push(
      <div
        key={`column${i}`}
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}em`,
          flex: 1,
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        width: 'calc(200px * 4 + 1.5em)',
        margin: 'auto',
      }}
    >
      {result}
    </div>
  );
};

export default MasonryLayout;
