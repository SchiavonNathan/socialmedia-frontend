import React from 'react';
import { WhatsappShareButton } from 'react-share';
import { Button } from 'react-bootstrap';

const ShareButton = ({ url, title}) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h5 className="mb-3">Compartilhar no WhatsApp:</h5>
            <WhatsappShareButton url={url} title={title}>
                <Button variant="success">WhatsApp</Button>
            </WhatsappShareButton>
        </div>
    );
};

export default ShareButton;