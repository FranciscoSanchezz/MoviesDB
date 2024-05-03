import httpInstance from "../httpInstance";

export const getRecommendedMovies = async (id: any) => {
    let res: any;
    const endpont = `${id}/recommendations?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
    await httpInstance
        .get(endpont)
        .then(response => {
            res = response.data;
        })
        .catch((err) => {
            res = err.response;
        });
    return res;
}