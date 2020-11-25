import React, {Component} from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.message !== "") {
            this.props.handleInput(this.state.message)
            this.setState({
                message: ""
            })
        }

    }


    render() {
        return (
            <footer className="ChatInput">
                <input type="text" onChange={this.handleChange} value={this.state.message}/>
                <button onClick={this.handleSubmit} type="button">Send</button>
            </footer>
        );
    }
}

export default ChatInput;
