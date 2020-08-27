import React from 'react'
import Auth from '../../lib/Auth'
import Comment from '../common/Comment'
import axios from 'axios'


(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://cynic-editor.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})()


class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      comments: [],
      formData: {content: ''},
      page: {url: 'http://cynic-editor.com/', identifier: 'main'}

    }
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }


  componentDidMount() {
    axios.get('/api/comments/')
      .then(res => this.setState({comments: res.data}))
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
    console.log(this.state.comments)
    return (
      <div>
        <div className="container">
          <div id="disqus_thread"></div>
        </div>
      </div>
    )
  }
}

export default Navbar
