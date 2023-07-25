import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <div className="w-full flex flex-col items-center gap-y-4">
            <RenderNavs />
            <LanguageSelection />
        </div>
    )
}

const LanguageSelection = () => {

    const languages = [
        { value: '', text: "Options" },
        { value: 'en', text: "English" },
        { value: 'ku', text: "Kurdish" },
        { value: 'bn', text: "Bengali" },
        { value: 'nl', text: "Dutch" }
    ]

    // It is a hook imported from 'react-i18next'
    const { t } = useTranslation();
 
    const [lang, setLang] = useState('');
 
    // This function put query that helps to
    // change the language
    const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
        setLang(e.target.value);
        let loc = "http://localhost:5173/";
        window.location.replace(loc + "?lng=" + e.target.value);
    }

    // console.log(t, "!!!!!!!")
 
    return (
        <div className="flex gap-4">
            {/* <h1>{t('welcome')}</h1> */}

            <label className="text-2xl">{t('Choose')}</label>
            <select className="text-2xl bg-slate-600" value={lang} onChange={handleChange}>
                {languages.map(item => {
                    return (<option key={item.value}
                        value={item.value}>{item.text}</option>);
                })}
            </select>
        </div>
    );
}

const RenderNavs = () => {
    const {t} = useTranslation()
    return (
        <div className="flex gap-x-16 justify-center text-4xl px-4">
            <Link to={"/"}>{t("Home")}</Link>
            <Link to={"/cuisines"}>{t('Cuisines')}</Link>
            <Link to={"/categories"}>{t("Categories")}</Link>
            <Link to={"/ingredients"}>{t("Ingredients")}</Link>
            <Link to={"/popularMeals"}>{t("Popular Meals")}</Link>
        </div>
    )
}
