import { Button, ListGroup } from "react-bootstrap";

const SingleComment = ({ comment }) => {
    const deleteComment = async (asin) => {
        try {
            let response = await fetch(
                "https://striveschool-api.herokuapp.com/api/comments/" + asin,
                {
                    method: "DELETE",
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNGM3YWZlMDMxZTAwMTliYTE5MmEiLCJpYXQiOjE3MDQ3MTg5NTAsImV4cCI6MTcwNTkyODU1MH0.z-ii0csj3UTWTwbvV9p6WiAV4k8b0x9FYVOUDGlb3fE",
                    },
                }
            );
            if (response.ok) {
                alert("Commento eliminato");
            } else {
                alert("Errore nella cancellazione");
            }
        } catch (err) {
            alert("Errore");
        }
    };

    return (
        <ListGroup.Item className="d-flex justify-content-between w-75 mb-2">
            {comment.comment}
            <Button
                variant="danger"
                
                onClick={() => deleteComment(comment._id)}
            >
                🗑
            </Button>
        </ListGroup.Item>
    );
};

export default SingleComment;
