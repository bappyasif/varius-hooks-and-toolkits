import { useEffect, useState } from "react"
import { translateContent, translateOptions } from "../../utils/rapodApiGoogleTranslate"

export const TranslateMealsDetails = ({ qStr }: { qStr: string }) => {
    const [translate, setTranslate] = useState<boolean>(false);
    const [translatedText, setTranslatedText] = useState<string>("")

    const beginTranslation = () => {
        translateContent().then(data => {
            // const formattedText = data.translatedText.split()
            if (data?.translatedText) {
                setTranslatedText(data.translatedText || "")
            }
            setTranslate(false);
        }).catch(err => console.log(err.message))
    }

    const configureOptions = () => {
        translateOptions.body = new URLSearchParams({
            // q: 'Hello, world!',
            q: qStr,
            target: 'bn',
            source: 'en'
        })

        setTranslate(true)
    }

    useEffect(() => {
        translate && beginTranslation()
    }, [translate])

    // useEffect(() => {
    //     configureOptions()
    // }, [])

    // const renderInstructions = () => {
    //     if (translatedText) {
    //         return translatedText.split("।").map((text, idx) => <li key={idx}>{text}</li>)
    //     } else {
    //         return qStr.split("*").map((text, idx) => <li key={idx}>{text}</li>)
    //     }
    // }


    const content = (
        <div className="flex flex-col items-center">
            <div className="flex gap-4">
                <h2 className="text-4xl">Instructions</h2>
                <button onClick={configureOptions}>Translate Me</button>
            </div>
            <p className="text-2xl w-5/6">{translatedText || qStr}</p>
            {/* <ul className="text-2xl w-5/6">{renderInstructions}</ul> */}
            {/* <ul className="text-2xl w-5/6">{renderInstructions()}</ul> */}
        </div>
    )

    // console.log(translatedText.split("।").length, qStr.split(".").join("[]"))
    // console.log(translatedText, "TRANSLKA", qStr.split(".").join("*"))

    return (
        <div>
            {/* <h2>TranslateMealsDetails - {translatedText}</h2> */}
            {/* <button onClick={configureOptions}>Translate Me</button> */}
            {content}
        </div>
    )
}
