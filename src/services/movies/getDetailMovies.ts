import httpInstance from "../httpInstance";

export const getDetailMovies = async (id: any) => {
    let res: any;
    const endpont = `${id}?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
    await httpInstance
        .get(endpont)
        .then(response => {
            res = response.data;
            console.log(res, "res");
        })
        .catch((err) => {
            res = err.response;
        });
    return res;
}