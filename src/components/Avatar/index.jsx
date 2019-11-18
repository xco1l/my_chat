import React, {Fragment} from 'react';
import Color from 'color'


import './Avatar.scss'


const Avatar = ({user}) => {
    const getAvatar = (user) => {
        if (user.avatar !== undefined)
            return (
                <div className="avatar">
                    <img src={user.avatar} alt={`Avatar ${user.fullname}`} />
                </div>)
        return (
            <div className="avatar avatar-noImage"
                style={{
                    backgroundImage: `linear-gradient(135deg, ${user.color}, ${Color(user.color).lighten(0.6)})`,
                    color: '#fff'
                }}
            >
                {( user.fullname && user.fullname[0]) || 'U'}
            </div>
        )
    }

    return (
        <Fragment>
            {getAvatar(user)}
        </Fragment>
        
    );
};

export default Avatar;