import { shazam_song_recognizer_client } from '@/utils/axios-interceptors'
import { useQuery } from '@tanstack/react-query'
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
    // rec = new MediaRecorder(stream)

    const lookForMatches = (blob) => {
        const data = new FormData()
        data.append("upload_file", blob)
        return shazam_song_recognizer_client({ url: "/recognize", data: data, method: "post" })
    }

    // const {data} = useQuery({
    //     queryKey: ["detect", "music"],
    //     queryFn: voiceData && lookForMatches
    // })

    // console.log(data?.data)

    const sendData = blob => {
        console.log(blob);
        // setVoiceData(blob)

        // https://www.shazam.com/snippets/email-share/654321100?lang=en&country=US
        lookForMatches(blob).then(data => {
            console.log(data?.data?.results, data, data.result, data?.data?.result)
            setShazamData(data?.data?.result)
        }).catch(err => console.log("error occured....", err))

        // const data = new FormData()
        // data.append("upload_file", blob)

        // shazam_song_recognizer_client({url:"/recognize", data: data, method: "post"})
        // .then(data => console.log(data)).catch(err => console.log(err, "HERE!!"))
        // processRecordedAudioData(blob)
    }

    const streamHandler = (stream) => {
        rec = new MediaRecorder(stream)
        setRecorder(rec);

        rec.ondataavailable = evt => {
            // const audioChunks = []
            audioChunks.push(evt.data)

            if (rec.state === "inactive") {
                // const blob = new Blob(audioChunks, { type: "audio/mp3" })
                // recordedAudio.src = URL.createObjectURL(blob)
                // recordedAudio.controls = true;
                // recordedAudio.autoplay = true;
                // ref.current.src = URL.createObjectURL(blob)
                // ref.current.controls = true
                // ref.current.autoplay = true
                // sendData(blob);

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
        // rec.start()
        recorder.start()

        beginRecordingUserVoice();
    }

    const onStop = () => {
        setRecordDisable(false);
        setStopDisable(true);
        audioChunks = [];
        // rec.stop()
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
            {/* <div
                style={{
                    backgroundImage: "url(https://is3-ssl.mzstatic.com/image/thumb/Music116/v4/a2/57/0f/a2570f86-97a9-81f7-995a-a067cc604cce/198009113934.png/400x400cc.jpg)",
                    width: 450,
                    height: 440
                }}
            >
                <a href="https://www.shazam.com/snippets/email-share/654321100?lang=en&country=US">Found This On Shazam!! Have A Listen :)</a>
            </div> */}
            {/* <iframe src="https://www.shazam.com/snippets/email-share/654321100?lang=en&country=US" frameborder="0" height={360}></iframe> */}
        </section>
    )
}


const processRecordedAudioData = (blob) => {
    const reader = new FileReader()
    new Response(blob).text().then(text => console.log(text, "<<<<<WHATWHAT!!>>>>>>", text.toString())).catch(err => console.log("error....", err))

    // reader.addEventListener("loadend", () => {})
    // const buffer = reader.readAsArrayBuffer(blob)
    // console.log(buffer)


    // const buffer = reader.readAsDataURL(blob)
    // console.log(buffer?.toString(), buffer)


    // const audioCtx = new (window.AudioContext || window.webkitAudioContext) ();
    // const audioCtx = new (window.AudioContext) ();
    // let source;

    // source = audioCtx.createBufferSource();
    // audioCtx.decodeAudioData(blob).then(buffer => {
    //     source.buffer = buffer;
    // }).catch(err => console.log(err, "audio decoding has failed...."))
}