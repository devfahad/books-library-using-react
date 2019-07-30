import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    text: ''
  };

  static propTypes = {
    searchBooks: PropTypes.func.isRequired,
    clearBooks: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.searchBooks(this.state.text);
    this.setState({ text: '' });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Books...'
            value={this.state.text}
            onChange={this.onChange}
            className='my-3'
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {this.props.showClear && (
          <button
            className='btn btn-success btn-block mt-3'
            onClick={this.props.clearBooks}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
