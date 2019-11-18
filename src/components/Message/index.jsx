import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import distanceInWordsToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru'



import waveSvg from 'assets/img/wave.svg'
import playSvg from 'assets/img/play.svg'
import pauseSvg from 'assets/img/pause.svg'
import './Message.scss'
import { IconReaded, Avatar } from 'components'

const Message = ({
    text = '',
    date = '',
    user = {},
    className,
    isMe = false,
    isReaded = false,
    attachments = [],
    isTyping = false,
    audio = '',
    ...other
}) => {
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState('00:00')
    const [progress, setProgress] = useState('0%')
    const audioElem = useRef(null)

    const sec2time = timeInSeconds => {
        const pad = function (num, size) { return ('000' + num).slice(size * -1); },
            time = parseFloat(timeInSeconds).toFixed(3),
            minutes = Math.floor(time / 60) % 60,
            seconds = Math.floor(time - minutes * 60)

        return pad(minutes, 2) + ':' + pad(seconds, 2)
    }

    useEffect(() => {
        if (audio) {
            audioElem.current.addEventListener(
                'playing', () => {
                    setPlaying(true)
                }
            )
            audioElem.current.addEventListener(
                'ended', () => {
                    setPlaying(false)
                    setProgress('0%')
                    setCurrentTime(sec2time(audioElem.current.duration))
                }
            )
            audioElem.current.addEventListener(
                'pause', () => {
                    setPlaying(false)
                }
            )
            audioElem.current.addEventListener(
                'timeupdate', () => {
                    setProgress(`${audioElem.current.currentTime / audioElem.current.duration * 100}%`)
                    setCurrentTime(
                        `${sec2time(audioElem.current.currentTime)}/${sec2time(audioElem.current.duration)}`
                    )

                }
            )
            audioElem.current.addEventListener(
                'loadedmetadata', () => {
                    setCurrentTime(sec2time(audioElem.current.duration))
                }

            )
        }
    }, [audio])




    const togglePlay = () => {
        if (!playing)
            audioElem.current.play()
        else
            audioElem.current.pause()
    }

    return (
        <div className={classNames("message__wrap", {
            'message__wrap_isMe': isMe,
        })}>
            <div className={classNames("message", {
                'message_isTyping': isTyping,
                'message_isImage': attachments.length === 1 && !text,
                'message_isAudio': audio
            })} >
                <div className="message__content">
                    {(audio || text || isTyping) &&
                        <div className="message__bubble-wrap">
                            <div className="message__bubble">
                                {text && <p className="message__text">{text}</p>}
                                {isTyping && <div className='message__typing'>
                                    <span />
                                    <span />
                                    <span />
                                </div>}
                                {audio && (
                                    <div className='message__audio'>
                                        <audio ref={audioElem} src={audio} preload='auto' />
                                        <div className="message__audio-progress" style={{
                                            width: `${progress}`,
                                        }}></div>
                                        <div className="message__audio-info">
                                            <div className="message__audio-btn">
                                                <button onClick={togglePlay}>
                                                    {playing ? (
                                                        <img src={pauseSvg} alt='Pause svg' />
                                                    ) : (
                                                            <img src={playSvg} alt='Play svg' />
                                                        )}
                                                </button>
                                            </div>
                                            <div className="message__audio-wave">
                                                <img src={waveSvg} alt="Wave svg" />
                                            </div>
                                            <span className='message__audio-duration'>
                                                {currentTime}
                                            </span>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    }

                    {attachments && (
                        <div className="message__attachments">
                            {attachments.map((item, index, arr) => (
                                <div className="message__attachments-item">
                                    <img src={item.src} alt={item.filename} key={index} />
                                </div>
                            ))}
                        </div>
                    )}
                    {date && (<span className="message__date">{distanceInWordsToNow(date, { addSuffix: true, locale: ruLocale })}</span>)}
                    {isMe && <IconReaded isReaded={false} />}
                    <div className="message__avatar-wrap">
                        <Avatar user={user} />
                    </div>

                </div>

            </div>
        </div>
    )
};

Message.defaultProps = {
    user: {}
}

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.instanceOf(Date) || PropTypes.string,
    user: PropTypes.object,
    attachments: PropTypes.array,
    isTyping: PropTypes.bool,
    audio: PropTypes.string
}

export default Message;