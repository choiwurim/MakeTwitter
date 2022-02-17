import React,{useState} from "react";
import {v4 as uuidv4} from "uuid";
import { dbService,storageService } from "../myBase";
import {
    addDoc,
    collection,
} from "firebase/firestore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

const NweetFactory=({userObj})=>{
    const [nweet,setNweet]=useState("");
    const [attachment,SetAttachment]=useState("");

    const onSubmit=async(event)=>{
        if(nweet===""){
            return;
        }
        event.preventDefault();
        let attachmentUrl="";
        if(attachment!==""){
            const fileRef=ref(storageService,`${userObj.uid}/${uuidv4()}`);
            await uploadString(fileRef,attachment,"data_url");
            attachmentUrl=await getDownloadURL(fileRef);
        }
        const nweetObj={
            text:nweet,
            createAt:Date.now(),
            creatorId:userObj.uid,
            attachmentUrl,
        };
        await addDoc(collection(dbService,"nweets"),nweetObj);
        setNweet("");
        SetAttachment("");
    };
    const onChange=(event)=>{
        const {
            target:{value},
        }=event;
        setNweet(value);
    }
    const onFileChange=(event)=>{
        const{
            target:{files},
        }=event;
        const theFile=files[0];
        const reader=new FileReader();
        reader.onloadend=(finishedEvent)=>{
            const {
                currentTarget:{result},
            }=finishedEvent;
            SetAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment=()=>SetAttachment("");
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput_container">
                <input className="factory_input" value={nweet} onChange={onChange} type="text" placeholder="What's on your mind" maxLength={100}/>
                <input type="submit" value={"&rarr;"} className="factoryInput_arrow"/>
            </div>
            <label htmlFor="attach-file" className="factoryInput_label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus}/>
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity:0}}/>
            {attachment && (
                <div className="factory_attachment">
                    <img src={attachment} style={{backgroundImage:attachment}}/>
                    <div className="factoryForm_clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
            )}
        </form>
    ) 
}
export default NweetFactory;