import React from 'react';
import axios from 'axios';
import AutoSuggest from 'react-autosuggest';

class Landing extends React.Component{
    state = {
        value: '',
        sets: [],
        suggestions: [],
    };

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.state.sets.filter(set =>
            set.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue = suggestion => suggestion.name;

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    renderSuggestion = suggestion => (
            suggestion.name
    );

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    componentDidMount() {
        axios.get('https://api.magicthegathering.io/v1/sets').then(res => this.setState({sets: res.data.sets}));
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    render() {
        const { suggestions, value } = this.state;

        const inputProps = {
            placeholder: 'Type a set',
            value,
            onChange: this.onChange
        };
    return(
        <>
            <AutoSuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        </>
    )}
};


export default Landing;
