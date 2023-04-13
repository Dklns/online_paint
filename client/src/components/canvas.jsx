import { observer } from 'mobx-react-lite';
import '../styles/canvas.scss'
import { useEffect, useRef, useState } from 'react';
import canvasState from '../store/canvasState';
import {Modal, Button} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import axios from 'axios';

const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();
    const [modal,setModal] = useState(true);
    const params = useParams();

    useEffect(() => {
        let ctx = canvasRef.current.getContext('2d')
        canvasState.setCanvas(canvasRef.current);
        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(res => {
                const img = new Image();
                img.src = res.data;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
        if(canvasState.username) {
            const socket = new WebSocket("ws://localhost:5000/");
            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id);
            console.log(params);
            console.log(toolState.tool);
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = event => {
                let msg = JSON.parse(event.data)
                switch(msg.method) {
                    case "connection": {
                        console.log(`欢迎使用本绘画板, ${msg.username}`);
                        break;
                    }
                    case "draw": {
                        console.log('start handleDraw');
                        handleDraw(msg);
                        break;
                    }
                }
            }
        }
    }, [canvasState.username])

    function handleMouseDown() {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
        axios.post(`http://localhost:5000/image?id=${canvasState.sessionId}`, {
            img: canvasRef.current.toDataURL()
        }).then(res => console.log(res.data))
    }

    function handleConnect() {
        canvasState.setUsername(usernameRef.current.value);
        setModal(false);
    }

    function handleDraw(msg) {
        const figure = msg.figure;
        const ctx = canvasRef.current.getContext('2d');
        console.log(msg);
        switch(figure.type) {
            case 'brush': {
                Brush.draw(ctx, figure.x, figure.y);
                break;
            }
            case 'rect': {
                console.log('start draw rect');
                Rect.staticDraw(ctx,figure.x, figure.y, figure.width, figure.height, figure.color);
                break;
            }
            case 'finish': {
                ctx.beginPath();
                break;
            }
        }
    }

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header >
                    <Modal.Title>请输入您的姓名</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleConnect()}>
                        进入
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas ref={canvasRef} 
                onMouseDown={() => handleMouseDown()}
                width={600} height={400}  
            />
        </div>
    )
})

export default Canvas;