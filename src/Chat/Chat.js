import React, {Component} from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            shop: {},
            messages: [],
        };
    }

    componentDidMount() {
        const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
        const messages = this.state.messages.concat(defaultMessage);

        setTimeout(() => {
            this.setState({
                shop: shopData,
                messages,
            });
        }, 1000);
    }

    handleInput = (inputMessage) => {
        const inputMsg = {
            role: 'CUSTOMER',
            text: inputMessage
        }
        const newMsg = this.state.messages;
        newMsg.push(inputMsg);
        newMsg.push(this.getReplayForInput(inputMessage));
        this.setState({
            messages: newMsg,
        })
        console.info(this.state.messages);
    }
    getReplayForInput = (inputMessage) => {
        const replay = answersData.find( item => inputMessage.indexOf(item.tags) > -1);
        const defaultReplay = {
                "text": "抱歉，现在是机器客服，暂时无法回答您的问题。",
                "role": "ROBOT"
            };
        return replay === undefined? defaultReplay: replay;
            // return {
            //     "text": "抱歉，现在是机器客服，暂时无法回答您的问题。",
            //     "role": "ROBOT"
            // }

    }

        render()
        {
            const {shop, messages} = this.state;
            return (
                <main className="Chat">
                    <ChatHeader shop={shop}/>
                    <ChatBox messages={messages}/>
                    <ChatInput handleInput={this.handleInput}/>
                </main>
            );
        }
    }

    export
    default
    Chat;
