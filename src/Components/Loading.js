import React from 'react';
import { Icon } from 'react-icons-kit';
import { spinner2 } from 'react-icons-kit/icomoon';
import '../styles/loading.scss';

const Loading = () => {
    return (
        <div className="loading">
            <div className="flex-center flex-column">
                <Icon icon={spinner2} size={25} className="spin" />
            </div>
        </div>
    );
};

export default Loading;
