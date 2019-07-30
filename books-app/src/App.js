import React, { Component } from 'react';
import axios from 'axios';
import {
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button
} from 'reactstrap';
import Navbar from './components/Navbar';
import Search from './components/Search';

class App extends Component {
  state = {
    books: [],
    newBookData: {
      title: '',
      author: '',
      pages: '',
      link: ''
    },
    editBookData: {
      id: '',
      title: '',
      author: '',
      pages: '',
      link: ''
    },
    newBookModal: false,
    editBookModal: false
  };

  // Checking the list
  componentWillMount() {
    this._refreshBooks();
  }
  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal
    });
  }

  // Search Books
  searchBooks = async text => {
    const res = await axios.get(`http://localhost:3000/books?q=${text}`);
    this.setState({ books: res.data });
  };

  // Clear Books from state
  clearBooks = () => this.setState({ books: [] });

  // Adding Books
  addBook() {
    axios
      .post('http://localhost:3000/books', this.state.newBookData)
      .then(response => {
        let { books } = this.state;

        books.push(response.data);

        this.setState({
          books,
          newBookModal: false,
          newBookData: {
            title: '',
            author: '',
            pages: '',
            link: ''
          }
        });
      });
  }

  // Updating Books
  updateBook() {
    let { title, author, pages, link } = this.state.editBookData;

    axios
      .put('http://localhost:3000/books/' + this.state.editBookData.id, {
        title,
        author,
        pages,
        link
      })
      .then(response => {
        this._refreshBooks();

        this.setState({
          editBookModal: false,
          editBookData: { id: '', title: '', author: '', pages: '', link: '' }
        });
      });
  }

  // Edit Book Btn
  editBook(id, title, author, pages, link) {
    this.setState({
      editBookData: { id, title, author, pages, link },
      editBookModal: !this.state.editBookModal
    });
  }

  // Delete Book Btn
  deleteBook(id) {
    axios.delete(`http://localhost:3000/books/${id}`).then(response => {
      this._refreshBooks();
    });
  }

  // Get the new Book-List after Delete
  _refreshBooks() {
    axios.get('http://localhost:3000/books').then(response => {
      this.setState({
        books: response.data
      });
    });
  }

  render() {
    let books = this.state.books.map(book => {
      return (
        <tr key={book.id}>
          {/*NOTE: Manually adding isbn in db.json file was time consuming, so I used book.id instead */}
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.pages}</td>
          <td>
            <a href={`${book.link}`} target='_blank'>
              Wikipedia
            </a>
          </td>
          <td>
            <Button
              color='success'
              size='sm'
              className='mr-2'
              onClick={this.editBook.bind(
                this,
                book.id,
                book.title,
                book.author,
                book.pages,
                book.link
              )}
            >
              Edit
            </Button>
            <Button
              color='danger'
              size='sm'
              onClick={this.deleteBook.bind(this, book.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Search
            searchBooks={this.searchBooks}
            clearBooks={this.clearBooks}
            showClear={this.state.books.length > 0 ? true : false}
          />

          <Button
            className='my-3 btn btn-outline-dark'
            color='light'
            onClick={this.toggleNewBookModal.bind(this)}
          >
            Add Book
          </Button>

          <Modal
            isOpen={this.state.newBookModal}
            toggle={this.toggleNewBookModal.bind(this)}
          >
            <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
              Add a new book
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for='title'>Title</Label>
                <Input
                  id='title'
                  value={this.state.newBookData.title}
                  onChange={e => {
                    let { newBookData } = this.state;

                    newBookData.title = e.target.value;

                    this.setState({ newBookData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for='author'>Author</Label>
                <Input
                  id='author'
                  value={this.state.newBookData.author}
                  onChange={e => {
                    let { newBookData } = this.state;

                    newBookData.author = e.target.value;

                    this.setState({ newBookData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for='pages'>Pages</Label>
                <Input
                  id='pages'
                  value={this.state.newBookData.pages}
                  onChange={e => {
                    let { newBookData } = this.state;

                    newBookData.pages = e.target.value;

                    this.setState({ newBookData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for='link'>Wikipedia Link</Label>
                <Input
                  id='link'
                  value={this.state.newBookData.link}
                  onChange={e => {
                    let { newBookData } = this.state;

                    newBookData.link = e.target.value;

                    this.setState({ newBookData });
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.addBook.bind(this)}>
                Add Book
              </Button>
              <Button
                color='secondary'
                onClick={this.toggleNewBookModal.bind(this)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Modal
            isOpen={this.state.editBookModal}
            toggle={this.toggleEditBookModal.bind(this)}
          >
            <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
              Edit a new book
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for='title'>Title</Label>
                <Input
                  id='title'
                  value={this.state.editBookData.title}
                  onChange={e => {
                    let { editBookData } = this.state;

                    editBookData.title = e.target.value;

                    this.setState({ editBookData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for='author'>Author</Label>
                <Input
                  id='author'
                  value={this.state.editBookData.author}
                  onChange={e => {
                    let { editBookData } = this.state;

                    editBookData.author = e.target.value;

                    this.setState({ editBookData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for='pages'>Pages</Label>
                <Input
                  id='pages'
                  value={this.state.editBookData.pages}
                  onChange={e => {
                    let { editBookData } = this.state;

                    editBookData.pages = e.target.value;

                    this.setState({ editBookData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for='link'>Wikipedia Link</Label>
                <Input
                  id='link'
                  value={this.state.editBookData.link}
                  onChange={e => {
                    let { editBookData } = this.state;

                    editBookData.link = e.target.value;

                    this.setState({ editBookData });
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.updateBook.bind(this)}>
                Update Book
              </Button>
              <Button
                color='secondary'
                onClick={this.toggleEditBookModal.bind(this)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Table className='table-bordered'>
            <thead className='thead-light'>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Pages</th>
                <th>More Info</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>{books}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
