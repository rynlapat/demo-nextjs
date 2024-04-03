import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

const token = withApiAuthRequired(async (req, res) => {
  try {
    const { accessToken } = await getAccessToken(req, res);
    res.status(200).json({ message: "Protected route", accessToken });
    return res;
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
    console.error(error);
  }
});

export default token;
