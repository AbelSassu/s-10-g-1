import { Component } from 'react'
import CommentsList from './CommentsList'
import AddComment from './AddComment'

class CommentArea extends Component {
  state = {
    comments: [],
  }

  // lo commento perchè all'avvio non ci sarà mai più bisogno di invocare getComments!
  // lo devo fare ora OGNI VOLTA che cambio il libro selezionato...
  // componentDidMount = () => {
  //   // viene eseguito una volta sola, all'avvio del componente!
  //   // ora faremo la fetch per recuperare i commenti
  //   if (this.props.bookId) {
  //     this.getComments()
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    // dobbiamo riconoscere ogni cambio di asin selezionato
    if (prevProps.bookId !== this.props.bookId) {
      // è cambiato il bookId, quindi il libro selezionato!
      // qua facciamo la fetch
      this.getComments()
    }
  }

  aggiornaCommenti = () => {
    this.getComments()
  }

  getComments = () => {
    fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
            this.props.bookId,
        {
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNGM3YWZlMDMxZTAwMTliYTE5MmEiLCJpYXQiOjE3MDQ3MTg5NTAsImV4cCI6MTcwNTkyODU1MH0.z-ii0csj3UTWTwbvV9p6WiAV4k8b0x9FYVOUDGlb3fE",
            },
        }
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("errore nel recupero dei commenti");
            }
        })
        .then((arrayOfComments) => {
            console.log(arrayOfComments);
            this.setState({
                comments: arrayOfComments,
            });
        })
        .catch((err) => {
            console.log("error", err);
        });
  }

  render() {
    return (
      <div>
        <div>
          <CommentsList reviews={this.state.comments} />
        </div>
        <div>
          <AddComment bookId={this.props.bookId} aggiornaCommenti={this.aggiornaCommenti} />
        </div>
      </div>
    )
  }
}

export default CommentArea
