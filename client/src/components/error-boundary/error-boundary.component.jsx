import React from 'react';
import { 
    ErrorImageContainer, 
    ErrorImageOverlay, 
    ErrorImageText 
} from './error-boundary.styles';
 
class ErrorBoundary extends React.Component {
    constructor(){
        super();

        this.state = {
            hasErrored: false
        }
    }

    static getDrivedStateFromError(err) {
        // process the error
        console.log(err);
        return { hasErrored: true, err };
    }

    componentDidCatch(err, info) {
        console.error('Error Boundary Caught:', err, info);
    }

    render(){
        const { hasErrored, err } = this.state;
        if (hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl = 'https://i.imgur.com/yW2W9SC.png'/>
                    <ErrorImageText>{err === 'ChunkLoadError' ? 'This application has been updated, please refresh your browser to see the latest content.' : 'Sorry this page is broken'}</ErrorImageText>
                </ErrorImageOverlay>
            );
        }

        return this.props.children
    }
}
 
export default ErrorBoundary;