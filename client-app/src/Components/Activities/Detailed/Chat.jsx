import React, {Component} from 'react';
import {Comment, Header, Segment} from "semantic-ui-react";
import ChatForm from "./ChatForm";
import {inject, observer} from "mobx-react";
import forms from '../../../Common/form/forms';
import formatDistance from 'date-fns/formatDistance';
import {Link} from "react-router-dom";

@inject('authStore', 'activityStore')
@observer
class Chat extends Component {
    
    sendComment = () => {
      this.props.activityStore.addComment(this.state.comment);
    };
    
    handleChange = (e) => {
        this.setState({comment: e.target.value})
    };

    componentDidMount = () => {
        this.props.activityStore.createHubConnection();
    };
    
    componentWillUnmount() {
        this.props.activityStore.stopHubConnection();
    }

    render() {
        const {activity: {comments}} = this.props;
        return (
            <div>
                <Segment textAlign="center" attached="top" inverted color="teal" style={{border: 'none'}}>
                    <Header>Chat about this event</Header>
                </Segment>

                <Segment attached>
                    <Comment.Group>
                        {comments && comments.map((comment, i) => (
                            <Comment key={i}>
                                <Comment.Avatar src={comment.author.image || '/assets/user.png'}/>
                                <Comment.Content>
                                    <Comment.Author as={Link} to={`/profile/${comment.author.username}`}>
                                        {comment.author.username}
                                    </Comment.Author>
                                    <Comment.Metadata>
                                        {formatDistance(comment.createdAt, new Date())} ago
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.body}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        ))}
                        <ChatForm form={forms.chatForm} />
                    </Comment.Group>
                </Segment>
            </div>
        )
    }
}

export default Chat;