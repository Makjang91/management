import React from 'react';
import {post} from 'axios';

class CustomerAdd extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            brithday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('brithday', this.state.brithday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-date'
            }
        }
        return post(url, formData, config);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            brithday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        
    }
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }
    handleValueChange = (e) => {
        let nextState = {};
        
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>Add client</h1>
                Profile image: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                Name: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                Brithday: <input type="text" name="brithday" value={this.state.brithday} onChange={this.handleValueChange}/><br/>
                Gender: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                Job: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">add</button>
            </form>
        )
    }
}

export default CustomerAdd;