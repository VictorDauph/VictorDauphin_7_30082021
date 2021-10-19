//Ce fichier sert à afficher un seul post sous forme de carte.
import {Card} from 'react-bootstrap'


function PostItem(props) {
    const upVotes = props.usersUpvotes.length
    const downVotes =  props.usersDownvotes.length
    const karma= upVotes - downVotes
    const user= "user@email"
    const commentsNumber= "666"
    console.log("post props", props)
    return (    
        <div className="raw my-3 mx-3">
                <Card className="col col-md-6 mx-auto bg-secondary">
                    <Card.Body>
                        <Card.Title className="text-primary cursor-pointer"> <h3>{props.title}</h3> </Card.Title>
                        <Card.Text className="text-light"> 
                            <p>Karma: {karma} 
                                <span className="mini"> 
                                    <span className="text-primary arrow cursor-pointer mx-1"> <i class="fas fa-thumbs-up"></i> </span> {upVotes} 
                                    <span className="text-primary cursor-pointer mx-1"> <i class="fas fa-thumbs-down"></i> </span> {downVotes} 
                                </span> 
                            </p>
                            <p className="mini">
                                crée le: {props.CreatedAt} par 
                                <span className="text-primary cursor-pointer">  {user} </span> 
                                Commentaires: {commentsNumber} 
                            </p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Img variant="top" src={`http://localhost:4000/images/${props.imageUrl}`} />
                </Card>
        </div>
    )
}
export default PostItem;

