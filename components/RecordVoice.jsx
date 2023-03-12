import { shazam_axios_interceptor_client } from '@/utils/axios-interceptors'
import React, { useEffect, useRef, useState } from 'react'
import { RenderShazamData } from './RenderShazamData'

export const RecordVoice = () => {
    const [recordDisable, setRecordDisable] = useState(false)
    const [stopDisable, setStopDisable] = useState(true)
    const [recorder, setRecorder] = useState(null)
    const [shazamData, setShazamData] = useState(false)
    // const [loading, setLoading] = useState()

    let audioChunks = [];
    let rec;
    const ref = useRef()

    const lookForMatches = (blob) => {
        const data = new FormData()
        data.append("upload_file", blob)
        return shazam_axios_interceptor_client({ url: "/recognize", data: data, method: "post" })
    }

    const sendData = blob => {
        lookForMatches(blob).then(data => {
            console.log(data?.data?.result, data)
            setShazamData(data?.data?.result)
        }).catch(err => console.log("error occured....", err))
    }

    const streamHandler = (stream) => {
        rec = new MediaRecorder(stream)
        setRecorder(rec);

        rec.ondataavailable = evt => {
            audioChunks.push(evt.data)

            if (rec.state === "inactive") {
                processMedia();
            }
        }
    }

    const processMedia = () => {
        const blob = new Blob(audioChunks, { type: "audio/mp3" });
        ref.current.src = URL.createObjectURL(blob);
        ref.current.controls = true;
        ref.current.autoplay = true;
        sendData(blob);
    }

    const beginRecordingUserVoice = () => {
        recorder.ondataavailable = evt => {
            audioChunks.push(evt.data);
            if (recorder.state === "inactive") {
                processMedia();
            }
        }
    }

    const getAccessToUserMediaDevice = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => streamHandler(stream))
            .catch(err => console.log(err))
    }

    const onStart = () => {
        setRecordDisable(true);
        setStopDisable(false);
        audioChunks = [];
        recorder.start()

        beginRecordingUserVoice();
    }

    const onStop = () => {
        setRecordDisable(false);
        setStopDisable(true);
        audioChunks = [];
        recorder.stop()
    }

    useEffect(() => {
        getAccessToUserMediaDevice()
    }, [])

    return (
        <section className='flex flex-col items-center'>
            <h2 className='text-3xl'>Record Your Music By giving Access To Your Microphone and Hit Record :)</h2>
            <audio className='my-4' ref={ref} src=""></audio>
            <p className='flex gap-4 my-4'>
                <button className={`text-2xl w-2/4 p-4 text-teal-900 ${recordDisable ? "bg-blue-900" : "bg-slate-400"} rounded-lg hover:text-white`} onClick={onStart} disabled={recordDisable}>Record</button>
                <button className={`text-2xl w-3/4 p-4 text-red-900 ${stopDisable ? "bg-yellow-200" : "bg-zinc-400"} rounded-lg hover:text-slate-600`} onClick={onStop} disabled={stopDisable}>Stop</button>
            </p>

            <hr />

            {
                shazamData
                    ?
                    <>
                        <h2>Loading Detected Music Data</h2>
                        <hr />
                        <RenderShazamData data={shazamData} />
                    </>
                    : null
            }
        </section>
    )
}


const processRecordedAudioData = (blob) => {
    const reader = new FileReader()
    new Response(blob).text().then(text => console.log(text, "<<<<<WHATWHAT!!>>>>>>", text.toString())).catch(err => console.log("error....", err))
}