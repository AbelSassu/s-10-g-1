import React from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

class CommentArea extends React.Component {
    state = {
        comments: [],
        isLoading: true,
    isError: false,
    };

    componentDidMount = async () => {
        try {
            let response = await fetch(
                "https://striveschool-api.herokuapp.com/api/comments/" +
                    this.props.asin,
                {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNGM3YWZlMDMxZTAwMTliYTE5MmEiLCJpYXQiOjE3MDQ3MTg5NTAsImV4cCI6MTcwNTkyODU1MH0.z-ii0csj3UTWTwbvV9p6WiAV4k8b0x9FYVOUDGlb3fE",
                    },
                }
            );
            if (response.ok) {
                let comments = await response.json();
                console.log(
                    this.props.asin,
                    comments
                );
                this.setState({
                    comments: comments,
                    isLoading: false,
                    isError: false,
                    
                });
            } else {
                console.log("Errore");
                this.setState({ isLoading: false, isError: true });
            }
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false, isError: true });
        }
    };
    render() {
        return (
        <div>
            <AddComment asin={this.props.asin} />
            <CommentList commentsToShow={this.state.comments} />
        </div>
        )
    }
}
export default CommentArea;
