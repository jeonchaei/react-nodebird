import {Form, Input, Button } from 'antd';
import React, {useCallback, useRef, useEffect} from'react';
import {useDispatch, useSelector} from 'react-redux';
import { addPost } from '../reducers/post';

import useInput from '../hooks/useInput';

const PostForm = () => {
    const {imagePaths, addPostDone} = useSelector(state=> state.post);
    const dispatch = useDispatch();
    const [text, onChangeText, setText]=useInput('');
    
    useEffect(()=>{
        if(addPostDone){
            setText('');
        }
    },[addPostDone])//addPostDone 값이 업데이트 된 경우에만 해당 콜백 실행

    const onSubmit = useCallback(()=>{
        dispatch(addPost(text));
        setText(''); {/*짹짹을 누르면 textarea 비우기 위해서*/}
    },[text]);
    
    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    },[imageInput.current]);

    return (
        <Form style={{margin : '10px 0 20px'}}
        encType = "multipart/from-data" onFinish={onSubmit}>
            <Input.TextArea 
            value={text} 
            onChange={onChangeText} 
            maxLength={140} 
            placeholder="어떤 신기한 일이 있었나요?"/>
            <div>
                <input type="file" multiple hidden ref={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float :'right'}} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v)=>{
                    return (
                    <div key={v} style={{display : 'inline-block'}}>
                        <img src={v} style={{width : '200px'}} alt={v}/>
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                    )
                })}
            </div>
        </Form>
    )
};
export default PostForm;