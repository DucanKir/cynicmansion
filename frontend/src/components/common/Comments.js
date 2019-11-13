import React from 'react'
import Auth from '../../lib/Auth'
import Comment from '../common/Comment'
import axios from 'axios'

class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      comments: [],
      formData: {
        content: ''
      }
    }
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }

  handleChangeContent(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleSubmit(e) {
   e.preventDefault()
   axios.post('/api/comments/', {...this.state.formData, user: Auth.currentUser()},
     {
       headers: { Authorization: `Bearer ${Auth.getToken()}` }
     })
     .then(res => this.setState({formData: { content: '' } }))
  }

  handleDeleteComment(e) {
    e.preventDefault()
    const commentId = +e.target.id
    axios.delete(`/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => {
        const index = this.state.recipe.comments.findIndex(comment => comment.id === commentId)
        const comments = [
          ...this.state.comments.slice(0, index),
          ...this.state.comments.slice(index+1)
        ]
        this.setState({ comments })
      })
  }

  render() {
    return (
      <div>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <textarea
                name="content"
                className="textarea"
                placeholder="Add a comment..."
                onChange={this.handleChangeContent}
                value={this.state.formData.content}
              />
            </div>
            <button className="button is-rounded is-primary">Submit</button>
          </form>
          <hr />
          <h2 className="subtitle">Comments</h2>
          {this.state.comments ? this.state.comments.map(comment =>
            <Comment
              key={comment.id}
              {...comment}
              handleDeleteComment={this.handleDeleteComment} />
          ) : <h1>No comments yet</h1>}
        </div>
      </div>
    )
  }
}

export default Navbar
