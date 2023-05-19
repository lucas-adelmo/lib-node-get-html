export default async function checkList(list){
    const urls = getURLS(list)
    const status = await checkStatus(urls)
    return list.map((value,i) => ({
        ...value,
        status:status[i]
    }))
}

function getURLS(list){
    const urls = list.map((obj)=>{
        return Object.values(obj).join()
    })

    return urls
}

async function checkStatus(urls){
    const promises = urls.map(async (url) => {
        try{
            const res = await fetch(url)
            return res.status
        }catch(error){
            return manageError(error)
        }
    })
    return Promise.all(promises)
}

function manageError(error){
    if(error.code === 'ENOTFOUND'){
        return `Error fetching ${error.hostname}`
    } else{
        return error
    }
}