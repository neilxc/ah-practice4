import React, {Component} from 'react';
import {Comment, Header, Segment} from "semantic-ui-react";
import ChatForm from "./ChatForm";
import {inject, observer} from "mobx-react";
import forms from '../../../Common/form/forms';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@aspnet/signalr';
import formatDistance from 'date-fns/formatDistance';

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
        // const username = this.props.authStore.currentUser.username;
        this.props.activityStore.createHubConnection();
        // this.setState({hubConnection}, () => {
        //     this.state.hubConnection
        //         .start()
        //         .then(() => console.log('Connection started!'))
        //         .catch(err => console.log('Error while establishing connection : ', err));
        //    
        //     this.state.hubConnection.on('sendToAll', (comment) => {
        //         const comments = this.state.comments.concat(comment);
        //         this.setState({comments})
        //     })
        // })
    };

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
                                    <Comment.Author>
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