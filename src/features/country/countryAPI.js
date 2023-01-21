// An async request for data
export function fetchData(url) {
    let data = []
    let error = null

    return new Promise((resolve) =>
        fetch(url)
          .then(response => response.json())
          .then(res => {
            res.length ? data = res : error = res.message
            resolve ({data,error})
          })
    );
}
