import React from 'react';

export function SearchInput(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function SearchBtn(props) {
  return (
    <button
      {...props}
      style={{ float: 'left', marginBottom: 9 }}
      className="btn btn-success"
    >
      {props.children}
    </button>
  );
}
