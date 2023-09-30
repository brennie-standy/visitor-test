import React, { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';


// {
//     "messages": [
//       {
//         "name": "one",
//         "time": "asdf",
//         "message": "adfasdfasdf"
//       }, 
//       {
//         "name": "two",
//         "time": "asdf",
//         "message": "adfasdfasdf"
//       },
//       {
//         "name": "three",
//         "time": "asdf",
//         "message": "adfasdfasdf"
//       }
//     ]
//   }


export default function LeaveMessage() {
    const inputRef = useRef(null);
    const [geo, setGeo] = useState(null);
    const [messageList, setMessageList] = useState(null);

    async function test() {
        const response = await fetch('https://geolocation-db.com/json/');
        const data = await response.json();
        setGeo(data)
    }

    async function test2(geo) {
        let tmp;
        const res1 = await fetch('https://api.npoint.io/7be51d13e9f1635ac805');
        const data = await res1.json()
        tmp = data.visitors;
        tmp.push(geo)
        await fetch('https://api.npoint.io/7be51d13e9f1635ac805', {method: "POST", body: JSON.stringify({"visitors": tmp})});
    }

    async function getMessages() {
        const response = await fetch('https://api.npoint.io/188113f2f9ceaeeea807');
        const data = await response.json();
        setMessageList(data.messages);
    }

    async function handleSendMessage() {
        const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
        const message = inputRef.current.value
        const send = {
            "name": randomName,
            "time": new Date(),
            "message": message
        }
        messageList.push(send)
        await fetch('https://api.npoint.io/188113f2f9ceaeeea807', {method: "POST", body: JSON.stringify({"messages": messageList})});
        getMessages()
        inputRef.current.value = ''
    }

    useEffect(() => {
        test()
        getMessages()
    }, [])

    useEffect(() => {
        if (geo) {
            test2(geo)
        }
    }, [geo])

    return (
        <div className="LeaveMessage">
            <div className="ChatBox">
                {messageList ? messageList.map((message, i) => (
                    <span key={i}>{'>'} <span className='make-me-green'>{message.name}</span>: {message.message}<br/></span>
                )) : "No messages to display"}
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Leave a message so I know this URL is getting attention!</Form.Label>
                    <Form.Control type="text" placeholder="Say something" ref={inputRef} />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleSendMessage}>Send</Button>
        </div>
    )

}
