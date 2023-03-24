const { getSession } = require("next-auth/react")

const handler = async (req, res) => {
    const session = await getSession({req})

    if(!session) {
        return res.status(401).json({msg: "un-authenticated user"})
    } else {
        return res.status(200).json({msg: "authenticated user", session})
    }
}

export default handler